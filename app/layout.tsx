import type { Metadata } from "next";
import { IBM_Plex_Sans, Crimson_Text } from "next/font/google";
import "./globals.css";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-ibm-plex-sans",
  display: "swap",
});

const crimsonText = Crimson_Text({
  weight: ["400", "600"],
  subsets: ["latin"],
  variable: "--font-crimson",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Remember — Mindful presence, one breath at a time",
  description:
    "A serene space for meditation and wellness. Return to the present.",
  openGraph: {
    title: "Remember",
    description: "Mindful presence, one breath at a time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} ${crimsonText.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
