import { createClient } from "../../../lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AddProductForm } from "../../../components/product/AddProductForm";
import { SignOutButton } from "../../../components/auth/SignOutButton";

export const metadata = { title: "Add Product — Jeweller" };

export default async function AddProductPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  return (
    <div className="min-h-screen bg-white">
      {/* Top bar */}
      <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-100 bg-white px-6 py-3">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to home
        </Link>
        <SignOutButton />
      </header>

      {/* Content */}
      <main className="mx-auto max-w-lg px-6 py-10">
        {/* Heading */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-serif font-semibold text-gray-900">Add Product</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add basic details so retailers understand the product clearly
          </p>
        </div>

        <AddProductForm />
      </main>
    </div>
  );
}
