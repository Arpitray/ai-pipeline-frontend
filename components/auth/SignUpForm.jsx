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
    <form className="mt-8 space-y-12" onSubmit={handleSubmit}>

      {/* ── Role selector ── */}
      <div className="space-y-6">
        <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-celestique-dark/40">IDENTIFY AS</p>
        <div className="grid grid-cols-2 gap-4">
          {ROLES.map((r) => {
            const isSelected = role === r.value;
            return (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className={`
                  relative flex flex-col items-center gap-3 py-8 px-4 border transition-all duration-500 text-center
                  ${isSelected
                    ? "border-celestique-dark bg-celestique-dark text-celestique-cream shadow-2xl scale-[1.02] z-10"
                    : "border-celestique-dark/10 bg-transparent hover:border-celestique-dark/40"}
                `}
              >
                <span className={`text-[10px] uppercase tracking-[0.2em] font-bold ${isSelected ? "text-celestique-cream" : "text-celestique-dark"}`}>
                  {r.label}
                </span>
                <span className={`text-[8px] uppercase tracking-[0.1em] ${isSelected ? "text-celestique-cream/60" : "text-celestique-dark/40"}`}>{r.hint}</span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-[#FF1E1E] rounded-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Credentials ── */}
      <div className="space-y-10">
        <Input
          id="email"
          name="email"
          label="Registry Email"
          type="email"
          placeholder="ENTER YOUR EMAIL"
          required
        />
        <Input
          id="password"
          name="password"
          label="Secure Key"
          type="password"
          placeholder="CREATE A PASSWORD"
          required
        />
      </div>

      {error && (
        <div className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#FF1E1E] bg-[#FF1E1E]/5 border-l-2 border-[#FF1E1E] px-4 py-4 animate-in fade-in slide-in-from-left-2 duration-300">
          Error :: {error}
        </div>
      )}

      <div className="space-y-6">
        <Button 
          type="submit" 
          variant="primary" 
          disabled={loading}
          className="w-full h-14 bg-celestique-dark hover:bg-[#FF1E1E] text-celestique-cream text-[10px] uppercase tracking-[0.3em] font-bold transition-all duration-500 rounded-none transform active:scale-[0.98]"
        >
          {loading ? "Registering..." : "Create Account"}
        </Button>

        <div className="relative py-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-celestique-dark/10" />
          </div>
          <div className="relative flex justify-center text-[8px] uppercase tracking-[0.4em]">
            <span className="bg-celestique-cream px-4 text-celestique-dark/30 font-bold">AUTHENTICATION</span>
          </div>
        </div>

        <GoogleButton 
          onClick={handleGoogle} 
          text="JOIN WITH GOOGLE" 
        />
      </div>
    </form>
  );
}
