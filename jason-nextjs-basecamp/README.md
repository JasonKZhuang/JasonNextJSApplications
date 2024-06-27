## Getting Started
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

npm run dev # to run the app in dev mode  
npm run lint # to lint the code
npm run build # to build the app
npm run start # to run the app in production mode
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

### [Please see my Notion Next.js]


### Tasks
1. Add a navigation bar, sticky to the top of the page, with the following links:
    - Home
    - About
    - Services
    - Contact
2. add a loading page, but loading page is rubbish, we cannot mix client side rendering and server side rendering



### References
[Tutorial Next.js](https://nextjs.org/learn/dashboard-app/getting-started)  
[Next.js 14 Tutorial](https://www.youtube.com/playlist?list=PLC3y8-rFHvwjOKd6gdf4QtV1uYNiQnruI)  
[Modal in Next.js](https://www.youtube.com/watch?v=fwq9vePfwkI)  
[Server Actions in Next.js ](https://www.youtube.com/watch?v=BmUsDuLO598)  
[React Query - Complete Tutorial](https://www.youtube.com/watch?v=8K1N3fE-cDs)  
[Using Forms in Next.js](https://www.youtube.com/watch?v=dDpZfOQBMaU)  


### Public data APIs 
[{JSON} Placeholder](https://jsonplaceholder.typicode.com)  
[Restcountries](https://restcountries.com/v2/all)  
 




## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
