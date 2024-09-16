import React from "react";

import Layout from "@theme/Layout";

const NewsletterPage = () => {
  return (
    <Layout>
      <main className="container">
        <div className="flex flex-col mt-3 md:mt-5 gap-y-5 gap-x-5 justify-center items-center sm:flex-row">
          <div className="card flex md:h-[500px] xl:h-[450px] flex-col justify-center items-center sm:w-1/2 p-10 gap-2 xl:gap-5 shadow-xl">
            <h1>Newsletter</h1>
            <p>Subscribe to our newsletter to get the latest updates.</p>
            <div id="newsletter-form-container"></div>
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default NewsletterPage;
