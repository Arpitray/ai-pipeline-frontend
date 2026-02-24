import { AuthLayout } from "../../components/auth/AuthLayout";
import { SignInForm } from "../../components/auth/SignInForm";

export const metadata = {
  title: "Sign In — Celestique",
};

export default function SignInPage() {
  return (
    <AuthLayout
      title="Enter the Studio"
      subtitle="PRIVATE ACCESS FOR OUR VALUED PARTNERS"
      imageSrc="https://images.unsplash.com/photo-1515562141207-7a18b5ce3d8e?q=80&w=2070&auto=format&fit=crop"
      footerText="NEW TO CELESTIQUE?"
      footerLink="/signup"
      footerAction="REQUEST ACCESS"
    >
      <SignInForm />
    </AuthLayout>
  );
}
