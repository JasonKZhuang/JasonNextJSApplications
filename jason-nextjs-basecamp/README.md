## Getting Started
[next-learn GitHub Repo Starter](https://github.com/vercel/next-learn/tree/main/dashboard/starter-example)  
[next-learn GitHub Repo Final](https://github.com/vercel/next-learn/tree/main/dashboard/final-example)  
[Setting Up Your Database](https://nextjs.org/learn/dashboard-app/setting-up-your-database)  

### Create Next.js App
```shell
npx create-next-app@latest --ts
```
### Analyze the project structure
- app is the source code directory
- layout.tsx is the root layout file
- page.tsx is the main file will be rendered inside the layout.tsx as a child component
- public folder is the static assets folder
- next.config.js is the next.js configuration file, [here is the reference](https://nextjs.org/docs/app/api-reference/next-config-js)  
- next.env.d.ts is the next.js environment variables declaration file
- tsconfig.json is the typescript configuration file [here is the reference](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
- tailwind.config.js is the tailwindcss configuration file [here is the reference](https://tailwindcss.com/docs/configuration)
- postcss.config.js is the postcss configuration file (A tool for transforming CSS with JavaScript) [here is the reference](https://postcss.org/)    
- .eslintrc.js is the eslint configuration file [here is the reference](https://eslint.org/docs/user-guide/configuring)  

### First, run the development, build, lint, product :

```bash

pnpm dev # to run the app in dev mode  
pnpm lint # to lint the code
pnpm build # to build the app
pnpm start # to run the app in production mode
```

### [Understand the project structure](https://nextjs.org/docs/getting-started/project-structure)  
- Create an app/ folder, then add a layout.tsx and page.tsx file.
- These will be rendered when the user visits the root of your application (/).
- Create a root layout inside app/layout.tsx with the required <html> and <body> tags
- Create a home page app/page.tsx with some initial content:
- [app Routing Conventions](https://nextjs.org/docs/getting-started/project-structure#app-routing-conventions)
- By default, pages are Server Components.
- You can access the route segments through the **params** prop and the URL search params through the **searchParams** prop for a given page.

### [Routing File Conventions and Component Hierarchy](https://nextjs.org/docs/app/building-your-application/routing)  

### CSS Styling
1. global css added into root layout.tsx
2. Tailwind CSS configuration added into tailwind.config.js and global css
3. CSS Modules added into the components folder,
   CSS Modules allow you to scope CSS to a component by automatically creating unique class names, so you don't have to worry about style collisions as well.  
4. [clsx library is used to combine multiple classes](https://github.com/lukeed/clsx)  

### Optimizing Fonts and Images
1. next/font module, It downloads font files at build time and hosts them with your other static assets.
2. next/image

### Layouts and Pages

### set up Next.js with Prisma
[Prisma ORM with PostgreSQL](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)  
 ```shell
 npx prisma init
 ```

✔ Your Prisma schema was created at prisma/schema.prisma
You can now open it in your favorite editor.

Next steps:
1. Set the DATABASE_URL in the .env file to point to your existing database. If your database has no tables yet, read https://pris.ly/d/getting-started
2. Set the provider of the datasource block in schema.prisma to match your database: postgresql, mysql, sqlite, sqlserver, mongodb or cockroachdb.
3. Run prisma db pull to turn your database schema into a Prisma schema.
4. Run prisma generate to generate the Prisma Client. You can then start querying your database.
5. Tip: Explore how you can extend the ORM with scalable connection pooling, global caching, and real-time database events. Read: https://pris.ly/beyond-the-orm

To map your data model to the database schema, you need to use the prisma migrate CLI commands:
```shell
npx prisma migrate dev --name init
```
This command does two things:
- It creates a new SQL migration file for this migration
- It runs the SQL migration file against the database
  
[Install and generate Prisma Client](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases/install-prisma-client-typescript-postgresql#install-and-generate-prisma-client)  
```shell
npm install @prisma/client
```
Whenever you update your Prisma schema, you will have to update your database schema using either 
```shell
prisma migrate dev
#or
prisma db push
```
This will keep your database schema in sync with your Prisma schema. The commands will also regenerate Prisma Client.


### Tasks
1. Add a navigation bar, sticky to the top of the page, with the following links:
    - Home
    - About
    - Services
    - Contact
2. add a loading page, but loading page is rubbish, we cannot mix client side rendering and server side rendering
3. Deciding where to place your Suspense boundaries  
   Where you place your Suspense boundaries will depend on a few things:  
   - How you want the user to experience the page as it streams.
   - What content you want to prioritize.
   - If the components rely on data fetching.
4. Partial PreRendering (PPR) (https://nextjs.org/learn/dashboard-app/partial-prerendering)    








### References
[Tutorial Next.js](https://nextjs.org/learn/dashboard-app/getting-started)  
[Next.js 14 Tutorial](https://www.youtube.com/playlist?list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI)  
[Modal in Next.js](https://www.youtube.com/watch?v=fwq9vePfwkI)  
[Server Actions in Next.js ](https://www.youtube.com/watch?v=BmUsDuLO598)  
[React Query - Complete Tutorial](https://www.youtube.com/watch?v=8K1N3fE-cDs)  
[Using Forms in Next.js](https://www.youtube.com/watch?v=dDpZfOQBMaU)  
[prisma ORM](https://www.prisma.io/)  

### Public data APIs 
[{JSON} Placeholder](https://jsonplaceholder.typicode.com)  
[Restcountries](https://restcountries.com/v2/all)  
[MockAPI](https://mockapi.io/)   




## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
