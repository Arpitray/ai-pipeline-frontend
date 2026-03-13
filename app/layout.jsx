import { Bodoni_Moda, Jost } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../components/auth/AuthProvider";
import { getAuthUser } from "../lib/supabase/queries";

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

export default async function RootLayout({ children }) {
  // Fetched once here — React.cache() deduplicates any subsequent getAuthUser()
  // calls made by nested server components in the same render pass.
  const initialUser = await getAuthUser();

  return (
    <html lang="en">
      <body
        className={`${bodoni.variable} ${jost.variable} font-sans antialiased bg-celestique-cream text-celestique-dark`}
      >
        <AuthProvider initialUser={initialUser}>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

