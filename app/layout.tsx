import type { Metadata, Viewport } from "next";
import { DM_Serif_Display, Manrope, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const display = DM_Serif_Display({
  subsets: ["latin"],
  variable: "--font-display",
  weight: "400",
});

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

const hindi = Noto_Sans_Devanagari({
  subsets: ["devanagari"],
  variable: "--font-hi",
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Samaj Saathi",
  description: "A calmer, clearer matrimonial experience for Indian families.",
  appleWebApp: { capable: true, title: "Samaj Saathi", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#6d322c",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${sans.variable} ${hindi.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
