"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "../ui/Button";
import { Input } from "../ui/Input";
import { GoogleButton } from "../ui/GoogleButton";
import { signUp, signInWithGoogle } from "../../lib/actions/auth";

export function SignUpForm() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await signUp(new FormData(e.target));
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

      <p className="mt-4 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          href="/signin"
          className="font-semibold text-orange-500 hover:text-orange-600"
        >
          LOGIN
        </Link>
      </p>
    </form>
  );
}
