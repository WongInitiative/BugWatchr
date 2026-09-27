import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// `clerkMiddleware` protects nothing by default, which is the opposite of the
// old `authMiddleware` behaviour. To preserve how this app worked before, every
// route is protected except the ones matched here.
// See https://clerk.com/docs/reference/nextjs/clerk-middleware
const isPublicRoute = createRouteMatcher(["/"]);

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next internals and static files, unless found in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
  ],
};
