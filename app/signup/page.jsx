import { AuthLayout } from "../../components/auth/AuthLayout";
import { SignUpForm } from "../../components/auth/SignUpForm";

export const metadata = {
  title: "Sign Up — Celestique",
};

export default function SignUpPage() {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="JOIN OUR EXCLUSIVE NETWORK OF ARTISANS"
      imageSrc="https://images.unsplash.com/photo-1596704017254-9b121068fb31?q=80&w=2070&auto=format&fit=crop"
      footerText="ALREADY REGISTERED?"
      footerLink="/signin"
      footerAction="SIGN IN"
    >
      <SignUpForm />
    </AuthLayout>
  );
}
