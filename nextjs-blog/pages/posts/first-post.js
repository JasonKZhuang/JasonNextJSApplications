import React, { useContext, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Layout from "../../components/layout";

function FirstPost() {
  return (
    <Layout>
      <Head>
        <title>Jason First post</title>
      </Head>
      <h1>First Post</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
      <Image src="/images/profile.jpeg" height={144} width={144} alt="Jason " />
    </Layout>
  );
}

export default FirstPost;
