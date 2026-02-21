"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { GoogleButton } from "../ui/GoogleButton";
import { signUp, signInWithGoogle } from "../../lib/actions/auth";

const ROLES = [
  {
    value: "wholesaler",
    label: "Wholesaler",
    hint: "I upload & sell jewellery",
    icon: "🏪",
  },
  {
    value: "retailer",
    label: "Retailer",
    hint: "I browse & source jewellery",
    icon: "🛍️",
  },
];

export function SignUpForm() {
  const [error, setError]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [role, setRole]     = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    if (!role) {
      setError("Please select a role before continuing.");
      return;
    }
    setError(null);
    setLoading(true);
    const fd = new FormData(e.target);
    fd.set("role", role); // inject selected role
    const result = await signUp(fd);
    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  async function handleGoogle() {
    setError(null);
    const result = await signInWithGoogle();
    if (result?.error) setError(result.error);
  }

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

      {/* ── Role selector ── */}
      <div className="space-y-2">
        <p className="text-sm font-medium text-stone-700">I am a…</p>
        <div className="grid grid-cols-2 gap-3">
          {ROLES.map((r) => {
            const isSelected = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`
                  flex flex-col items-center gap-1.5 py-4 px-3 rounded-xl border-2 transition-all text-center
                  ${isSelected
                    ? "border-amber-500 bg-amber-50 shadow-sm"
                    : "border-stone-200 bg-white hover:border-stone-300"}
                `}
              >
                <span className="text-2xl">{r.icon}</span>
                <span className={`text-sm font-semibold ${isSelected ? "text-amber-800" : "text-stone-700"}`}>
                  {r.label}
                </span>
                <span className="text-[11px] text-stone-400">{r.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Credentials ── */}
      <div className="space-y-4">
        <Input
          id="email"
          name="email"
          label="Your email"
          type="email"
          placeholder="Enter your email"
          required
        />
        <Input
          id="password"
          name="password"
          label="Password"
          type="password"
          placeholder="Create a password"
          required
        />
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Creating account…" : "Sign Up"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">OR</span>
        </div>
      </div>

      <GoogleButton onClick={handleGoogle} text="Sign up with Google" />
      <p className="text-xs text-stone-400 text-center -mt-2">
        You&apos;ll choose your role after Google sign-up.
      </p>

      <p className="mt-4 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href="/signin" className="font-semibold text-orange-500 hover:text-orange-600">
          LOGIN
        </Link>
      </p>
    </form>
  );
}
