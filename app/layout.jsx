import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
});

export const metadata = {
  title: "Celestique | Timeless Jewelry",
  description: "A celestial touch for timeless moments.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${jost.variable} font-sans antialiased bg-celestique-cream text-celestique-dark`}
      >
        {children}
      </body>
    </html>
  );
}
