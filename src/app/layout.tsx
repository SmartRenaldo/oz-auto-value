import { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "OzAutoValue - Australian Used Car Valuation Expert",
  description:
    "Get a free and precise market value estimation for your used car, based on Australian market data",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-[#050010] text-white min-h-screen flex flex-col relative`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
