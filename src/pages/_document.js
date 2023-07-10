import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="UTF-8" />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
        </Head>
        <body className="my-body-class">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
