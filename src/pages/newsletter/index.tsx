import React from "react";

import Layout from "@theme/Layout";

const NewsletterPage = () => {
  return (
    <Layout>
      <main className="container">
        <div className="flex flex-col mt-3 md:mt-5 gap-y-5 gap-x-5 justify-center items-center sm:flex-row">
        <iframe width="540" height="605" src="https://02c03965.sibforms.com/serve/MUIFAH9d-UTdGK2vNNDxNgTg6vwiUYzU4WgQCQb0omgfGXtFKiLC4lM1ruDSXZVcZPGWrpjbB-XZ-PtgtJs9a2V-DOzVcFMORTK_TdK49KLXLZQsuLp8E0ZlaLro9Y6EPJQK7PP9Wyw8OAN0pYZh7R_Dt4s4r-37Qeq8ftWBRqQBFlFiLq17lJAkIRtJ1s6jOv_uZfCEsa-6dfSi" frameborder="0" scrolling="auto" allowfullscreen ></iframe>
          {/* <div className="card flex md:h-[500px] xl:h-[450px] flex-col justify-center items-center sm:w-1/2 p-10 gap-2 xl:gap-5 shadow-xl">
            <h1>Newsletter</h1>
            <p>Subscribe to our newsletter to get the latest updates.</p>
            <div id="newsletter-form-container"></div>
          </div> */}
        </div>
      </main>
    </Layout>
  );
};
export default NewsletterPage;
