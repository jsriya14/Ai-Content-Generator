import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define matchers outside middleware
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/dashboard/history',
  '/dashboard/settings',
]);
const isSignInRoute = createRouteMatcher(['/sign-in']);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req) && !isSignInRoute(req)) {
    await auth.protect(); // Ensure user is authenticated
  }

  return NextResponse.next(); // Continue the request
});

export const config = {
  matcher: [
    // Skip static/internal files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always match API and TRPC routes
    '/(api|trpc)(.*)',
  ],
};



// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
// import { NextResponse } from 'next/server';

// export default clerkMiddleware(async (auth, req) => {


//   if (isProtectedRoute(req) && !isSignInRoute(req)) await auth.protect()
//   })
// const isProtectedRoute = createRouteMatcher([
//     '/dashboard(.*)',
//     '/dashboard/history',
//     '/dashboard/settings',
//     ]);
//     const isSignInRoute = createRouteMatcher(['/sign-in']);
// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };



// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
// import { getAuth } from '@clerk/nextjs/server';
// import { NextResponse } from 'next/server';

// const isProtectedRoute = createRouteMatcher([
//     '/dashboard(.*)',
//     '/dashboard/history',
//     '/dashboard/settings',
// ]);

// const isSignInRoute = createRouteMatcher(['/sign-in']);

// export default clerkMiddleware(async (auth, req) => {
//     // Use getAuth to check the session
//     //const session  = getAuth(req);

//     if (isSignInRoute(req) ) {
//         // Redirect signed-in users away from the sign-in page.  Use a full URL.
//         return NextResponse.redirect(new URL('/dashboard', req.url).toString());
//     }

//     if (isProtectedRoute(req)  ) {
//         // Redirect to sign-in, if not signed in, and is a protected route. Use a full URL.
//         return NextResponse.redirect(new URL('/sign-in', req.url).toString());
//     }

//     //  Important:  Allow the request to continue.
//     return NextResponse.next();
// });

// export const config = {
//     matcher: [
//         '/((?!_next/static|favicon.ico).*)', // Match all paths except those starting with _next/static or favicon.ico
//     ],
// };
