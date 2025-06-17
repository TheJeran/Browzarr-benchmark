import type { Metadata } from "next";
import { ThemeProvider } from 'next-themes'
import { Navbar, Footer, Overlays} from "@/components/ui";
import "./globals.css";

export const metadata: Metadata = {
  title: "Browzarr",
  description: "A browser-based visualization toolkit for exploring and analyzing Zarr data stores",
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
        {children}
      </ThemeProvider>
      </body>
    </html>
  );
}
