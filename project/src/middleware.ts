import { authMiddleWare, clerkClient } from "@clerk/nextjs/server";

const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/forgot-password",
  "/reset-password",
  "/verify-email",
  "/api/auth/signin",
  "/api/auth/signup",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/api/auth/verify-email",
];

export default authMiddleWare({
  publicRoutes,
  clerkClient,
});

afterAuth: async (req: any, res: any) => {
  const auth = req.auth;
  if (!auth.userId && !publicRoutes.includes(req.nextUrl.pathname)) {
    return res.redirect("/signin");
  }

  if (auth.userId) {
    const client = await clerkClient();
    const user = await client.users.getUser(auth.userId);
    if (user.publicMetadata.role === "admin") {
      return res.redirect("/admin-home");
    }
    if (user.publicMetadata.role === "user") {
      return res.redirect("/Home");
    }
  }
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
