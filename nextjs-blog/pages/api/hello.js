//Essential information about API Routes
//https://nextjs.org/docs/api-routes/introduction
//req is an instance of http.IncomingMessage, plus some pre-built middlewares you can see here.
//res is an instance of http.ServerResponse, plus some helper functions you can see here.

//Do Not Fetch an API Route from getStaticProps or getStaticPaths
//You should not fetch an API Route from getStaticProps or getStaticPaths.
//Instead, write your server-side code directly in getStaticProps or getStaticPaths (or call a helper function).
//Here’s why:
//getStaticProps and getStaticPaths runs only on the server-side.
//It will never be run on the client-side.
//It won’t even be included in the JS bundle for the browser.
//That means you can write code such as direct database queries without them being sent to browsers.

export default function HelloAPI(req, res) {
  res.status(200).json({ text: "Hello" });
  const email = req.body.email;
  // Then save email to your database, etc...
}
