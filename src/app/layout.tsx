import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { WalletProvider } from "@/components/wallet-provider";
import "./globals.css";

const display = Cormorant_Garamond({ subsets: ["latin"], variable: "--font-display", weight: ["500", "600", "700"] });
const sans = DM_Sans({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "CookieQuest — Find the Crumb",
  description: "A daily on-chain scavenger hunt on Cookie Chain.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body><WalletProvider><SiteHeader />{children}<footer>CookieQuest · Built for Cookie Chain</footer></WalletProvider></body>
    </html>
  );
}
