import { SignIn } from "@clerk/nextjs";

// Optional catch-all so Clerk can own its sub-routes (factor-two, sso-callback,
// reset-password, ...) under /sign-in. `routing="path"` keeps those on our own
// domain instead of bouncing the user to Clerk's hosted Account Portal.
const SignInPage = () => (
  <div className="grid min-h-[80vh] place-items-center px-4 py-10">
    <SignIn routing="path" path="/sign-in" />
  </div>
);

export default SignInPage;
