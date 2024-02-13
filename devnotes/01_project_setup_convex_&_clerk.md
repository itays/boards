### Project setup

did a `pnpm create next-app` from terminal and followed the instructions.

```
✔ What is your project named? … boards
✔ Would you like to use TypeScript? … No / Yes
✔ Would you like to use ESLint? … No / Yes
✔ Would you like to use Tailwind CSS? … No / Yes
✔ Would you like to use `src/` directory? … No / Yes
✔ Would you like to use App Router? (recommended) … No / Yes
✔ Would you like to customize the default import alias (@/*)? … No / Yes
```

### Shadcn ui setup

Installed shadcn-ui with pnpm `pnpm dlx shadcn-ui@latest init` and also added a button componen just to test things out - `pnpm dlx shadcn-ui@latest add button` then added the button to the index page.

```tsx
import { Button } from "@/components/ui/button";

export default function Home() {
  return <Button>Hello</Button>;
}
```

### Adding [Convex](https://www.convex.dev/)

Convex is a real-time database provider that I will be using for this project. I added the convex package to the project with `pnpm add convex`

after the installation I run `pnpx convex dev`, it will prompt me to login with my convex account and then it will create a `.convex` in my user home folder and also create a convex folder the root project. it also added sone env variables in the .env.local file. so this command also runs the backend in the background. now I can open a new terminal and run `pnpm dev` to start the frontend.

_The next to do is to setup Clerk and connect it to Convex._

### [Clerk]('https://clerk.com/') setup

Clerk is an authenticaion provider that I will be using for this project.

1. I created an account and then created a new project.
   I enabled signin with **google**, **github** and **email** methods.
   Once the project is created you'll see the api keys to be used in the project. you should put those in the .env file.
   At this point you should already have a .env.local file generated from earlier by convex. so just copy paste the clerk keys over there. dont worry as the .env.local file is gitignored.

2. I then installed Clerk with nextjs:

```bash
pnpm add @clerk/nextjs
```

3. I added a _middleware.ts_ file in the root project as described in the [Clerk and nextjs integration guide.](https://clerk.com/docs/quickstarts/nextjs?_gl=1*65ipfj*_gcl_au*MTE5Mjk3NTUxOC4xNzA3Nzk3Njg5*_ga*NTkwMTAzMDA2LjE3MDc3OTc2ODk.*_ga_1WMF5X234K*MTcwNzgxMDc0NS4yLjEuMTcwNzgxMTM3MC4wLjAuMA..#require-authentication-to-access-your-app)

```ts
import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
```

right now this file is going to protect all routes.

4. Went back to the Clerk dashboard of the project, on the sidebar on the left clicked on "JWT Templates" and clicked on _New Template_ give it a name ("convex" or something) scroll down to the Claims section and make sure the 'aud' field says 'convex' and click the 'Apply changes' button.

5. Now head over to the Convex integration with Clerk [guide](https://docs.convex.dev/auth/clerk) and copy paste the 'convex/auth.config.js' code in section 4 and place it in the convex folder in the root project.

6. Paste in the Issuer URL from the JWT template (from Clerk dashboard) and set `applicationID` to "convex" (the value of the "aud" Claims field).

7. Run `pnpx convex dev` to test that the configuration is set correctly. if it says "Convex function ready!" then we're good. if you'll try to edit the auth.config.js file you'll see errors in the terminal saying the config is invalid.

8. Now, I will need to create a Convex Provider with Clerk. I followed the [convex integration guide with Clerk](https://docs.convex.dev/auth/clerk). Created `providers/convex-client-provider.tsx` file in root folder.

```tsx
// providers/convex-client-provider.tsx
"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";

type ConvexClientProviderProps = {
  children: React.ReactNode;
};

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        {children}
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
```

9. Now I just need to wrap the app with the `<ConvexClientProvider>` component:

```tsx
// app/layout.tsx
import { ConvexClientProvider } from "@/providers/convex-client-provider";
...
<body className={inter.className}>
  <ConvexClientProvider>{children}</ConvexClientProvider>
</body>
...
```

If I'll run `pnpm dev` in another terminal (I have `pnpx convex dev` running in another terminal tab) and go to the browser I should see the Clerk login page. I can try to login with google and it should redirect me to the home page.`

#### Loading while authenticating

While the authentication check is happening, I'll show a loading component I created at components/auth/Loading.tsx and added it to the convex-client-provider.tsx file:

```tsx
// providers/convex-client-provider.tsx
export function ConvexClientProvider({ children }: ConvexClientProviderProps) {
  return (
    <ClerkProvider>
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <Authenticated>{children}</Authenticated> // <-- added this
        <AuthLoading>
          <Loading /> // <-- added this
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

```

#### Added a `<UserButton/>` component

Inside `app/page.tsx` I added a `<UserButton/>` component from @clerk/nextjs:

```tsx
export default function Home() {
  return (
    <div className="grid place-items-center">
      <div>This is a screen for authenticated users only</div>
      <UserButton /> // 👈🏻 this
    </div>
  );
}
```
