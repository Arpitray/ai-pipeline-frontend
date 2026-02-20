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
          placeholder="Enter your password"
          required
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-900"
          />
          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
            Remember me
          </label>
        </div>
        <div className="text-sm">
          <Link href="#" className="font-medium text-gray-600 hover:text-gray-900">
            Forgot your password?
          </Link>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <Button type="submit" variant="primary" disabled={loading}>
        {loading ? "Signing in…" : "Sign In"}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-white px-2 text-gray-500">OR</span>
        </div>
      </div>

      <GoogleButton onClick={handleGoogle} text="Sign in with Google" />

      <p className="mt-4 text-center text-sm text-gray-500">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-semibold text-orange-500 hover:text-orange-600"
        >
          SIGN UP
        </Link>
      </p>
    </form>
  );
}
