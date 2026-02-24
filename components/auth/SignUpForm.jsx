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
    <form className="mt-12 space-y-8" onSubmit={handleSubmit}>

      {/* ── Role selector ── */}
      <div className="space-y-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-celestique-dark/60">I am a…</p>
        <div className="grid grid-cols-2 gap-4">
          {ROLES.map((r) => {
            const isSelected = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`
                  flex flex-col items-center gap-2 py-6 px-4 border transition-all text-center
                  ${isSelected
                    ? "border-celestique-dark bg-celestique-taupe/20"
                    : "border-celestique-taupe bg-transparent hover:border-celestique-dark"}
                `}
              >
                <span className="text-2xl opacity-80">{r.icon}</span>
                <span className={`text-[10px] uppercase tracking-[0.2em] ${isSelected ? "text-celestique-dark" : "text-celestique-dark/80"}`}>
                  {r.label}
                </span>
                <span className="text-[9px] uppercase tracking-[0.1em] text-celestique-dark/40">{r.hint}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Credentials ── */}
      <div className="space-y-6">
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
        <p className="text-[10px] uppercase tracking-[0.1em] text-red-600 bg-red-50 border border-red-200 px-4 py-3">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Creating account…" : "Sign Up"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-celestique-taupe" />
        </div>
        <div className="relative flex justify-center text-[10px] uppercase tracking-[0.2em]">
          <span className="bg-celestique-cream px-4 text-celestique-dark/40">OR</span>
        </div>
      </div>

      <GoogleButton onClick={handleGoogle} text="Sign up with Google" />
      <p className="text-[9px] uppercase tracking-[0.1em] text-celestique-dark/40 text-center -mt-4">
        You&apos;ll choose your role after Google sign-up.
      </p>

      <p className="mt-8 text-center text-[10px] uppercase tracking-[0.2em] text-celestique-dark/60">
        Already have an account?{" "}
        <Link href="/signin" className="text-celestique-dark border-b border-celestique-dark pb-0.5 hover:text-celestique-dark/60 hover:border-celestique-dark/60 transition-colors ml-2">
          LOGIN
        </Link>
      </p>
    </form>
  );
}
