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
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-celestique-taupe bg-celestique-cream/90 backdrop-blur-md px-8 py-6">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-celestique-dark/60 hover:text-celestique-dark transition-colors"
          >
            <span className="text-lg leading-none">&larr;</span>
            Back to Dashboard
          </Link>
        </div>
        <div className="flex items-center gap-6">
           <span className="text-[10px] uppercase tracking-[0.2em] text-celestique-dark/60 border-r border-celestique-taupe pr-6 hidden sm:block">
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
