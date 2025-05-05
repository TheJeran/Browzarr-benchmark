import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import { Navbar, Footer, Overlays} from "@/components/ui";

import "./globals.css";

export const metadata: Metadata = {
  title: "vi-zarr-stores",
  description: "A browser based visualization toolkit for Zarr Stores",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="antialiased">
      <ThemeProvider defaultTheme="system">
        <Overlays />
        <Navbar />
        {children}
        <Footer />
      </ThemeProvider>
      </body>
    </html>
  );
}
