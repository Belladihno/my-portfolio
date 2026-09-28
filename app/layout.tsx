import type { Metadata } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "../styles/globals.css";
import Nav from "../components/Nav";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bellanzo.vercel.app"),
  title: "Bellanzo — Backend Engineer",
  description:
    "Adeyemi Abimbola (Bellanzo), backend engineer in Lagos. NestJS, TypeScript, PostgreSQL, ASP.NET Core.",
  openGraph: {
    title: "Bellanzo — Backend Engineer",
    description:
      "Backend engineer building reliable APIs and delivery systems.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="bg-bg font-sans text-text">
        <Nav />
        <main>{children}</main>
        <footer className="w-full border-t border-border bg-bg">
          <div className="mx-auto flex max-w-site flex-col justify-between gap-4 px-6 py-8 md:flex-row md:items-center">
            <div className="flex items-center gap-2 font-mono text-[11px] text-muted">
              <span className="inline-block h-1.5 w-1.5 bg-accent" />
              <span>Available for backend roles and freelance contracts.</span>
            </div>
            <div className="font-mono text-[11px] tracking-wider text-muted md:text-right">
              © 2026 Adeyemi Abimbola
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
