#!/usr/bin/env python3
"""Import Star-Carpet YML feed into structured JSON for the Next.js storefront."""

from __future__ import annotations

import html
import json
import re
import xml.etree.ElementTree as ET
from collections import Counter, defaultdict
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
RAW = ROOT / "data" / "raw" / "yml.xml"
OUT_DIR = ROOT / "src" / "data"

NATURAL = {
    "шерсть",
    "шелк",
    "хлопок",
    "бамбук",
    "джут",
    "овчина",
    "мутон",
    "кожа",
    "тенсель",
    "вискоза",
}
SYNTHETIC = {
    "полипропилен",
    "акрил",
    "полиэстер",
    "микрополистер",
    "полиамид",
    "хит-сет",
    "синтетика",
    "фризе",
    "шенилл",
    "пвх",
    "микрофибра",
}


def text(el: ET.Element | None) -> str:
    if el is None or el.text is None:
        return ""
    return html.unescape(el.text.strip())


def cdata_or_text(el: ET.Element | None) -> str:
    if el is None:
        return ""
    value = "".join(el.itertext()).strip()
    return html.unescape(value)


def slug_from_url(url: str) -> str:
    path = unquote(urlparse(url).path).rstrip("/")
    slug = path.split("/")[-1]
    return slug or "product"


def split_multi(value: str) -> list[str]:
    if not value:
        return []
    parts = re.split(r"[,;/|]", value)
    return [p.strip() for p in parts if p.strip()]


def infer_tags(params: dict[str, str], categories: list[str], name: str) -> list[str]:
    tags: list[str] = []
    blob = " ".join([name, *categories, *params.values()]).lower()
    material = params.get("Материал", "").lower()
    production = params.get("Способ производства", "").lower()
    style = params.get("Стиль", "").lower()

    if any(k in material for k in SYNTHETIC) or "антиаллерг" in blob:
        tags.append("антиаллергенный")
    if "детск" in blob:
        tags.append("детский")
    if any(k in material for k in NATURAL) or "эколог" in blob:
        tags.append("экологичный")
    if "животн" in blob or "для питомц" in blob:
        tags.append("для животных")
    if "ручн" in production or "ручной" in blob:
        tags.append("ручная работа")
    if "шегги" in blob or "длинн" in blob:
        tags.append("длинный ворс")
    if "дорожк" in blob:
        tags.append("дорожка")
    return sorted(set(tags))


def infer_rooms(categories: list[str], name: str, style: str) -> list[str]:
    blob = " ".join([name, style, *categories]).lower()
    rooms: list[str] = []
    mapping = {
        "гостиную": "gostinaya",
        "гостиная": "gostinaya",
        "спальн": "spalnya",
        "детск": "detskaya",
        "офис": "ofis",
        "прихож": "koridor",
        "коридор": "koridor",
        "дорожк": "koridor",
        "кухн": "kuhnya",
    }
    for needle, room in mapping.items():
        if needle in blob:
            rooms.append(room)
    if not rooms:
        if "классическ" in blob or "современ" in blob or "модерн" in blob:
            rooms.append("gostinaya")
    return sorted(set(rooms))


def collection_from(params: dict[str, str], name: str) -> str:
    col = params.get("Коллекция", "").strip()
    if col:
        return col
    # e.g. "Ковер ISFAHAN 29048A ..."
    m = re.search(r"\b([A-ZА-Я]{3,}(?:\s+[A-ZА-Я0-9]{2,})?)\b", name)
    return m.group(1).title() if m else ""


def parse_size_hint(name: str, params: dict[str, str]) -> str:
    for key in ("Размер", "Размеры", "Габариты"):
        if params.get(key):
            return params[key]
    m = re.search(r"(\d+[.,]?\d*)\s*[xх×]\s*(\d+[.,]?\d*)", name, re.I)
    if m:
        return f"{m.group(1)} x {m.group(2)}"
    return ""


def main() -> None:
    if not RAW.exists():
        raise SystemExit(f"Missing YML feed at {RAW}")

    tree = ET.parse(RAW)
    root = tree.getroot()
    shop = root.find("shop")
    if shop is None:
        raise SystemExit("Invalid YML: no shop node")

    categories: dict[str, str] = {}
    for cat in shop.find("categories") or []:
        cid = cat.attrib.get("id", "")
        categories[cid] = (cat.text or "").strip()

    products: list[dict] = []
    collections: Counter[str] = Counter()
    countries: Counter[str] = Counter()
    materials: Counter[str] = Counter()
    colors: Counter[str] = Counter()

    for offer in shop.find("offers") or []:
        url = cdata_or_text(offer.find("url"))
        slug = slug_from_url(url)
        name = cdata_or_text(offer.find("name")) or slug
        price = float(text(offer.find("price")) or 0)
        old_price_raw = text(offer.find("oldprice"))
        old_price = float(old_price_raw) if old_price_raw else None
        pictures = [cdata_or_text(p) for p in offer.findall("picture") if cdata_or_text(p)]
        description = cdata_or_text(offer.find("description"))
        category_id = text(offer.find("categoryId"))
        category_name = categories.get(category_id, "")
        available = offer.attrib.get("available", "true") == "true"
        sku = offer.attrib.get("id", slug)

        params: dict[str, str] = {}
        for param in offer.findall("param"):
            pname = param.attrib.get("name", "").strip()
            if pname:
                params[pname] = (param.text or "").strip()

        # Expand category membership via keyword heuristics on category tree labels
        cat_labels = [category_name] if category_name else []
        material = params.get("Материал", "")
        country = params.get("Страна", "")
        form = params.get("Форма", "")
        style = params.get("Стиль", "")
        pile = params.get("Высота ворса", "")
        density = params.get("Плотность", "") or params.get("Плотность ворса", "")
        color = params.get("Цвет", "")
        manufacturer = params.get("Производитель", "")
        collection = collection_from(params, name)

        # Infer color from category names if missing
        if not color:
            for cid, cname in categories.items():
                low = cname.lower()
                if "ковр" in low and any(
                    c in low
                    for c in (
                        "бежев",
                        "бел",
                        "сер",
                        "син",
                        "зел",
                        "коричн",
                        "красн",
                        "бордов",
                        "черн",
                        "роз",
                        "желт",
                        "фиолет",
                    )
                ):
                    # Only attach if product name hints color
                    pass

        tags = infer_tags(params, cat_labels, name)
        rooms = infer_rooms(cat_labels, name, style)
        size = parse_size_hint(name, params)

        material_kind = "mixed"
        mat_l = material.lower()
        if any(k in mat_l for k in NATURAL) and not any(k in mat_l for k in SYNTHETIC):
            material_kind = "natural"
        elif any(k in mat_l for k in SYNTHETIC) and not any(k in mat_l for k in NATURAL):
            material_kind = "synthetic"

        discount = None
        if old_price and old_price > price > 0:
            discount = round((1 - price / old_price) * 100)

        product = {
            "id": sku,
            "sku": sku,
            "slug": slug,
            "name": name,
            "url": url,
            "price": price,
            "oldPrice": old_price,
            "discount": discount,
            "currency": "RUB",
            "available": available,
            "images": pictures,
            "image": pictures[0] if pictures else "",
            "description": description,
            "categoryId": category_id,
            "category": category_name,
            "collection": collection,
            "manufacturer": manufacturer,
            "country": country,
            "material": material,
            "materialKind": material_kind,
            "form": form,
            "style": style,
            "pileHeight": pile,
            "density": density,
            "color": color,
            "size": size,
            "production": params.get("Способ производства", ""),
            "pileComposition": params.get("Состав ворса", ""),
            "params": params,
            "tags": tags,
            "rooms": rooms,
            "isNew": "новин" in category_name.lower() or "новин" in name.lower(),
            "isPopular": False,
            "searchText": " ".join(
                filter(
                    None,
                    [
                        name,
                        sku,
                        collection,
                        manufacturer,
                        country,
                        material,
                        form,
                        style,
                        color,
                        category_name,
                        *tags,
                    ],
                )
            ).lower(),
        }
        products.append(product)

        if collection:
            collections[collection] += 1
        if country:
            countries[country] += 1
        for m in split_multi(material) or ([material] if material else []):
            materials[m] += 1
        if color:
            colors[color] += 1

    # Mark popular: top 5% cheapest available in bestsellers heuristic —
    # prefer products with discounts and mid prices as "popular"
    scored = sorted(
        products,
        key=lambda p: (
            0 if p["discount"] else 1,
            -p["price"] if 2000 <= p["price"] <= 25000 else 0,
            p["price"],
        ),
    )
    popular_ids = {p["id"] for p in scored[: max(24, len(products) // 40)]}
    for p in products:
        p["isPopular"] = p["id"] in popular_ids
        # also treat first image collections ISFAHAN/CASTOR/VELAR/AMANA as popular-ish
        if any(x in (p["collection"] or "").upper() for x in ("ISFAHAN", "CASTOR", "VELAR", "AMANA")):
            p["isPopular"] = True

    # Enrich isNew from newest slugs containing year-ish patterns is weak;
    # use discount-free recent naming: Laksheri / Vizion from homepage
    for p in products:
        n = p["name"].lower()
        if any(x in n for x in ("лакшери", "визион", "новин")):
            p["isNew"] = True

    # Attach color category labels based on name + params loosely
    color_map = {
        "бежев": "Бежевый",
        "бел": "Белый",
        "сер": "Серый",
        "син": "Синий",
        "голуб": "Голубой",
        "зел": "Зеленый",
        "коричн": "Коричневый",
        "красн": "Красный",
        "бордов": "Бордовый",
        "черн": "Черный",
        "роз": "Розовый",
        "желт": "Желтый",
        "фиолет": "Фиолетовый",
        "оранж": "Оранжевый",
        "крем": "Кремовый",
        "золот": "Золотой",
        "серебр": "Серебряный",
    }
    for p in products:
        if p["color"]:
            continue
        blob = f"{p['name']} {p['params'].get('Цвет', '')}".lower()
        for needle, label in color_map.items():
            if needle in blob:
                p["color"] = label
                colors[label] += 1
                break

    # Build category list for UI
    category_list = [
        {"id": cid, "name": name, "slug": re.sub(r"\s+", "-", name.lower())}
        for cid, name in sorted(categories.items(), key=lambda x: int(x[0]) if x[0].isdigit() else 0)
    ]

    collection_list = [
        {
            "name": name,
            "slug": re.sub(r"[^a-z0-9а-яё]+", "-", name.lower()).strip("-"),
            "count": count,
            "image": next((p["image"] for p in products if p["collection"] == name and p["image"]), ""),
            "description": f"Коллекция {name}: {count} моделей в наличии",
        }
        for name, count in collections.most_common(40)
        if count >= 3 and name
    ]

    filters = {
        "materials": [m for m, _ in materials.most_common(40)],
        "countries": [c for c, _ in countries.most_common(30)],
        "colors": [c for c, _ in colors.most_common(30)],
        "forms": sorted({p["form"] for p in products if p["form"]}),
        "styles": sorted({s for p in products for s in split_multi(p["style"])}),
        "pileHeights": sorted({p["pileHeight"] for p in products if p["pileHeight"]}),
        "tags": sorted({t for p in products for t in p["tags"]}),
        "rooms": [
            {"id": "gostinaya", "label": "Для гостиной"},
            {"id": "spalnya", "label": "Для спальни"},
            {"id": "detskaya", "label": "Для детской"},
            {"id": "ofis", "label": "Для офиса"},
            {"id": "koridor", "label": "Для коридора"},
            {"id": "kuhnya", "label": "Для кухни"},
        ],
        "priceRange": {
            "min": int(min((p["price"] for p in products if p["price"] > 0), default=0)),
            "max": int(max((p["price"] for p in products), default=0)),
        },
    }

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # Lightweight index for catalog
    index = [
        {
            "id": p["id"],
            "sku": p["sku"],
            "slug": p["slug"],
            "name": p["name"],
            "price": p["price"],
            "oldPrice": p["oldPrice"],
            "discount": p["discount"],
            "image": p["image"],
            "available": p["available"],
            "collection": p["collection"],
            "country": p["country"],
            "material": p["material"],
            "materialKind": p["materialKind"],
            "form": p["form"],
            "style": p["style"],
            "pileHeight": p["pileHeight"],
            "density": p["density"],
            "color": p["color"],
            "size": p["size"],
            "tags": p["tags"],
            "rooms": p["rooms"],
            "isNew": p["isNew"],
            "isPopular": p["isPopular"],
            "searchText": p["searchText"],
            "category": p["category"],
            "categoryId": p["categoryId"],
        }
        for p in products
    ]

    (OUT_DIR / "products.json").write_text(
        json.dumps(products, ensure_ascii=False), encoding="utf-8"
    )
    (OUT_DIR / "products-index.json").write_text(
        json.dumps(index, ensure_ascii=False), encoding="utf-8"
    )
    (OUT_DIR / "categories.json").write_text(
        json.dumps(category_list, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (OUT_DIR / "collections.json").write_text(
        json.dumps(collection_list, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (OUT_DIR / "filters.json").write_text(
        json.dumps(filters, ensure_ascii=False, indent=2), encoding="utf-8"
    )
    (OUT_DIR / "meta.json").write_text(
        json.dumps(
            {
                "source": "https://www.star-carpet.ru/yml.xml",
                "importedAt": __import__("datetime").datetime.now().isoformat(timespec="seconds"),
                "productCount": len(products),
                "categoryCount": len(category_list),
                "collectionCount": len(collection_list),
            },
            ensure_ascii=False,
            indent=2,
        ),
        encoding="utf-8",
    )

    # Split products by slug for faster PDP lookups (optional map)
    by_slug = {p["slug"]: p["id"] for p in products}
    (OUT_DIR / "slug-map.json").write_text(
        json.dumps(by_slug, ensure_ascii=False), encoding="utf-8"
    )

    print(f"Imported {len(products)} products, {len(category_list)} categories, {len(collection_list)} collections")


if __name__ == "__main__":
    main()
