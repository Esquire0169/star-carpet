import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

const siteUrl =
  process.env.GITHUB_PAGES === "true"
    ? "https://esquire0169.github.io/star-carpet"
    : "https://www.star-carpet.ru";

export const metadata: Metadata = {
  title: {
    default: "Star Carpet — ковры со всего мира",
    template: "%s · Star Carpet",
  },
  description:
    "Интернет-магазин ковров Star Carpet: каталог из Турции, Ирана, Бельгии, Египта и России. Примерка в Москве, доставка по РФ, опт для дизайнеров и гостиниц.",
  metadataBase: new URL(siteUrl),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
