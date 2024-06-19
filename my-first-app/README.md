This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
## Getting Started
### first step
- Create an app/ folder, then add a layout.tsx and page.tsx file.   
- These will be rendered when the user visits the root of your application (/).  
- Create a root layout inside app/layout.tsx with the required <html> and <body> tags
- Create a home page app/page.tsx with some initial content:

### app Routing Conventions
[app Routing Conventions](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions)  
- layout.tsx: The layout component that wraps all pages.
  - Layouts do not **receive** searchParams, but can receive  path parameters.
- page.tsx: The main page component.
  - Pages **receive** searchParams and path parameters.
### App Router
- By default, pages are Server Components. 
- You can access the route segments through the **params** prop and the URL search params through the **searchParams** prop for a given page.





First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
