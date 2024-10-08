import React from "react";

import Layout from "@theme/Layout";
import NewsletterForm from "@site/src/components/hub-spot/NewsletterForm";

const NewsletterPage = () => {
  return (
    <Layout>
      <main className="container">
        <div className="flex flex-col mt-3 md:mt-5 gap-y-5 gap-x-5 justify-center items-center sm:flex-row">
        <iframe width="540" height="605" src="https://02c03965.sibforms.com/serve/MUIFAF3Jz4xJoDu9MiweeSL7qo0c1HmPyK3TbcNuNmzrmWk4pmpbUP5H0zLvg-sTC2LgnfR8tc02o8Z8b0dzsjs6s-2WTzWtJ19Xj3Skm1NAZKE67qC913KkPowC_kEI8ow55zJ45Mbhmvs5d2v2eqvNYJNyXUrNoh2hQmQ4zXMQfP8903JxYiBCwUBEnAlN-it4TSNjVtffc5TF" frameborder="0" scrolling="auto" allowfullscreen ></iframe>
          {/* <div className="card flex md:h-[500px] xl:h-[450px] flex-col justify-center items-center sm:w-1/2 p-10 gap-2 xl:gap-5 shadow-xl">
            <h1>Newsletter</h1>
            <p>Subscribe to our newsletter to get the latest updates.</p>
            <div id="newsletter-form-container"></div>
          </div> */}
        </div>
        <NewsletterForm />
      </main>
    </Layout>
  );
};
export default NewsletterPage;
