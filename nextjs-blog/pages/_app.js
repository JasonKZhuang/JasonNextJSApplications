//This App component is the top-level component
//which will be common, across all the different pages.
//We can use this App component to keep state when navigating between pages

//In Next.js, you can add global CSS files by importing them from pages/_app.js.
//You cannot import global CSS anywhere else.

import React from "react";
import "../styles/global.css";

function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
export default App;
