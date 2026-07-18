# Star Carpet — новый интернет-магазин ковров

Современный storefront на Next.js с полным импортом каталога с [star-carpet.ru](https://www.star-carpet.ru/).

## Стек

- Next.js App Router + TypeScript + Tailwind CSS 4
- Framer Motion (hero parallax, gallery, hover)
- Zustand (корзина, избранное, сравнение, примерка)
- Данные: YML-фид `https://www.star-carpet.ru/yml.xml` → `src/data/*.json`

## Запуск

```bash
npm install
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000).

## Обновление каталога

```bash
npm run import:fetch
```

Импортирует ~3800+ товаров, категории, коллекции и фильтры.

## Страницы

| URL | Описание |
|---|---|
| `/` | Главная: герой, сценарии, коллекции, популярные/новинки |
| `/katalog` | Каталог с фильтрами и сортировкой |
| `/katalog/[slug]` | Карточка товара (URL как на текущем сайте) |
| `/primerka-kovrov` | Примерка в Москве |
| `/dostavka-i-oplata` | Доставка и оплата |
| `/optovikam` | B2B / опт |
| `/o-kompanii` | О компании |
| `/stati` | Блог (статьи с действующего сайта) |
| `/cart`, `/favorite`, `/compare` | Корзина и списки |

SEO: сохранены ключевые пути (`/katalog/...`, сервисные страницы) + redirects со старых разделов на фильтры каталога.
