import { createClient } from "../../lib/supabase/server";
import { redirect } from "next/navigation";
import { SelectRoleForm } from "../../components/auth/SelectRoleForm";

export const metadata = {
  title: "Choose Your Role — Jeweller",
  description: "Tell us whether you're a wholesaler or a retailer to personalise your experience.",
};

export default async function SelectRolePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/signin");

  // If role already set, route to appropriate destination
  const existingRole = user.user_metadata?.role;
  if (existingRole === "wholesaler") redirect("/dashboard/add-product");
  if (existingRole === "retailer") redirect("/");

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-stone-50 via-amber-50/20 to-stone-100 px-4">
      <div className="w-full max-w-md">

        {/* Decorative gem icon */}
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-amber-400 to-amber-600 flex items-center justify-center shadow-xl shadow-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M6.5 2h11l4 6-9.5 14L2.5 8l4-6z" />
            </svg>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl shadow-stone-200/60 border border-stone-100 overflow-hidden">
          <div className="bg-linear-to-b from-stone-50 to-white border-b border-stone-100 px-8 py-8 text-center">
            <h1 className="font-serif text-2xl font-semibold text-stone-900">
              How will you use Jeweller?
            </h1>
            <p className="text-stone-500 text-sm mt-2 leading-relaxed">
              Select your role so we can tailor your experience.<br />
              <span className="text-stone-400 text-xs">This cannot be changed later.</span>
            </p>
          </div>

          <div className="p-8">
            <SelectRoleForm />
          </div>
        </div>

        <p className="text-center text-xs text-stone-400 mt-6">
          Signed in as <span className="font-medium text-stone-500">{user.email}</span>
        </p>
      </div>
    </div>
  );
}
