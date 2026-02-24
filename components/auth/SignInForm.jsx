"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { GoogleButton } from "../ui/GoogleButton";
import { signIn, signInWithGoogle } from "../../lib/actions/auth";

export function SignInForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signIn(new FormData(e.target));
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
          placeholder="ENTER YOUR PASSWORD"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center group cursor-pointer">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-3 w-3 rounded-none border-celestique-dark/20 text-celestique-dark focus:ring-celestique-dark bg-transparent cursor-pointer"
          />
          <label htmlFor="remember-me" className="ml-3 block text-[9px] uppercase tracking-[0.2em] text-celestique-dark/40 group-hover:text-celestique-dark/70 transition-colors cursor-pointer font-bold">
            Stay Signed In
          </label>
        </div>
        <div className="text-[9px] uppercase tracking-[0.2em]">
          <Link href="#" className="text-celestique-dark/40 hover:text-celestique-dark transition-colors font-bold border-b border-transparent hover:border-celestique-dark pb-0.5">
            Lost Password?
          </Link>
        </div>
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
          {loading ? "Verifying..." : "Access Portfolio"}
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
          text="CONNECT WITH GOOGLE" 
        />
      </div>
    </form>
  );
}
