import { SignUp } from "@clerk/nextjs";

// Optional catch-all so Clerk can own its sub-routes (verify-email-address,
// sso-callback, ...) under /sign-up. This component enforces the password
// requirements configured in the Clerk Dashboard and renders the live
// zxcvbn-based strength feedback, so the rules live in one place rather than
// being reimplemented here.
const SignUpPage = () => (
  <div className="grid min-h-[80vh] place-items-center px-4 py-10">
    <SignUp routing="path" path="/sign-up" />
  </div>
);

export default SignUpPage;
