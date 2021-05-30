import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="ru">
        <Head>
          <script src="https://www.google.com/recaptcha/api.js?render=6LchYK0UAAAAAMRflt6o0V_1imaH5KDnH5XVjWjB&onload=initRecaptcha&render=explicit" />
          <script
            type="text/javascript"
            var
            initRecaptcha={function () {
              grecaptcha.ready(function () {
                grecaptcha
                  .execute("6LchYK0UAAAAAMRflt6o0V_1imaH5KDnH5XVjWjB", {
                    action: "homepage",
                  })
                  .then(function (token) {
                    document.getElementById("recaptcha_token").value = token;
                  });
              });
            }}
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
