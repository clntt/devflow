// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)"]);

// export default clerkMiddleware((auth, request) => {
//   if (!isPublicRoute(request)) {
//     auth().protect();
//   }
// });

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always run for API routes
//     "/(api|trpc)(.*)",
//   ],
// };

// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isProtectedRoute = createRouteMatcher(["/ask-question(.*)"]);

// export default clerkMiddleware((auth, req) => {
//   if (isProtectedRoute(req)) auth().protect();
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

import { authMiddleware } from "@clerk/nextjs";

const options = {
  publicRoutes: [
    "/",
    "/api/webhook",
    "/question/:id",
    "/tags",
    "/tags/:id",
    "/profile/:id",
    "/community",
    "/jobs",
    "/questions/:id", // Ensure this route pattern is included
  ],
  ignoredRoutes: ["/api/webhook", "/api/chatgpt"],
};

export default authMiddleware({
  ...options,
  beforeAuth(req: any, evt: any) {
    console.log("Middleware executed for:", req.url);

    // Check current server time
    const currentTime = new Date().toISOString();
    console.log("Current Server Time:", currentTime);

    // Check if the route is public
    const isPublicRoute = options.publicRoutes.some((route) =>
      matchRoute(route, req.url)
    );
    console.log("Is Public Route:", isPublicRoute);

    // Check if the route is ignored
    const isIgnoredRoute = options.ignoredRoutes.some((route) =>
      matchRoute(route, req.url)
    );
    console.log("Is Ignored Route:", isIgnoredRoute);

    // Log the entire request URL and method for better debugging
    console.log("Request URL:", req.url);
    console.log("Request Method:", req.method);

    // Custom logic if needed
    if (!isPublicRoute && !isIgnoredRoute) {
      console.log("Route requires authentication:", req.url);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};

// Helper function to match routes with patterns
function matchRoute(routePattern: string, url: string | undefined): boolean {
  if (!url) return false;

  // Convert route pattern to regex, handle dynamic segments (e.g., /questions/:id)
  const regexPattern = routePattern.replace(/:\w+/g, "[^/]+");
  const regex = new RegExp(`^${regexPattern}$`);
  return regex.test(new URL(url).pathname);
}
