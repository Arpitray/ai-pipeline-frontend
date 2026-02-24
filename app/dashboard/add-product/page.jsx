import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AddProductForm } from "../../../components/product/AddProductForm";
import { SignOutButton } from "../../../components/auth/SignOutButton";

export const metadata = { title: "Add Product — Celestique" };

export default async function AddProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  return (
    <div className="min-h-screen bg-celestique-cream relative">
      
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-celestique-dark/10 bg-celestique-cream/80 backdrop-blur-xl px-12 py-8">
        <div className="flex items-center gap-10">
          <Link href="/dashboard/my-uploads" className="font-serif text-3xl italic tracking-tighter hover:text-[#FF1E1E] transition-colors">Celestique.</Link>
          <div className="h-4 w-px bg-celestique-dark/20"></div>
          <div className="text-[10px] uppercase tracking-[0.4em] font-bold text-[#FF1E1E]">
             REVE STUDIO
          </div>
        </div>
        <div className="flex items-center gap-8">
           <Link
             href="/dashboard/my-uploads"
             className="text-[10px] uppercase tracking-[0.3em] font-bold text-celestique-dark/60 hover:text-celestique-dark transition-all duration-300"
           >
             Archive
           </Link>
           <span className="text-[9px] uppercase tracking-[0.2em] text-[#FF1E1E] font-bold border-l border-celestique-dark/10 pl-8 hidden lg:block">
              {user.email}
           </span>
           <SignOutButton />
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-12 md:py-20">
        <AddProductForm />
      </main>
    </div>
  );
}
