import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { auth } from "./app/lib/auth";

// This function can be marked `async` if using `await` inside
export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session && !session?.user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Alternatively, you can use a default export:
// export default function proxy(request) { ... }

export const config = {
  matcher: ["/appointments/:id", "/dashboard", "/dashboard/my-profile", "/dashboard/my-bookings"]
};
