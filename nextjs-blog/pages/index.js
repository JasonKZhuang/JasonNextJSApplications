//===Pages routing with file name====//
//look at pages directory
//`pages/index.js` is associated with the / route.
//`pages/posts/first-post.js` is associated with the /posts/first-post route.

//===Link Component =======//
//Using the Link Component from next/link to wrap the <a> tag. <Link>
//allows you to do [client-side navigation] to a different page in the application.
//Using <Link>
//Client-side navigation means that the page transition happens using JavaScript,
//which is faster than the default navigation done by the browser.

//==== Code splitting and pre-fetching =====//
//Next.js does code splitting automatically,
//so each page only loads what’s necessary for that page.
//That means when the homepage is rendered, the code for other pages is not served initially.

//==== Assets, Metadata, and CSS, Sass ===//
//https://nextjs.org/docs/basic-features/static-file-serving
//the top-level public directory.

//=== Image Component and Image Optimization ===//
//Images are lazy loaded by default, which means Images load as they are scrolled into viewport.

//==== Metadata such as <title> <header> ====//
//<Head>,instead of the lowercase <head>, is a React Component

// Next.js + Tailwind CSS Example//

//===== Next.js’ pre-rendering feature.=====//
// Static Generation with data, and without data.
// Server-side Rendering
// Static Generation with Data using getStaticProps
// npm install gray-matter
//============================================//

//====Dynamic Routes=====//
//Pages that begin with [ and end with ] are dynamic routes in Next.js.
//npm install remark remark-html
//npm install date-fns

//====API Routes=========//

import Head from "next/head";
import Link from "next/link";
import Layout, { siteTitle } from "../components/layout";
import UtilStyles from "../styles/utils.module.css";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/date";

export async function getStaticProps() {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
}

export default function Home({ allPostsData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>

      <section className={UtilStyles.headingMd}>
        <p>[Hi this is Jason, my Professional is a software engineer. I like fishing, but I have never got a fish in Australia.]</p>
        <p>
          (This is a sample website - you’ll be building a site like this on <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>

      <section className={`${UtilStyles.headingMd} ${UtilStyles.padding1px}`}>
        <h2 className={UtilStyles.headingLg}>Blog</h2>
        <ul className={UtilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={UtilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>
                <a>{title}</a>
              </Link>
              <br />
              <small className={UtilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}
