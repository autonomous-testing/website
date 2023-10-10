import React from "react";

const setupImg = require("@site/static/img/how-it-works/setup.png").default;
const modelImg = require("@site/static/img/how-it-works/model.png").default;
const cmdImg = require("@site/static/img/how-it-works/commander.png").default;

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="how-it-works">
      <div className="container text--center">
        <header className="section-header">
          <h2>How it works</h2>
          <p>Reduce the test automation complexity and keep its benefits 💪</p>
        </header>

        <div className="row">
          <div className="col col--4">
            <img src={setupImg} className="img-fluid how-it-works-image" />

            <h3>1. Set up bot execution</h3>
            <p>
              Enabling all client's needs for autonomous testing. Easy to use
              interface.
            </p>
          </div>

          <div className="col col--4">
            <img src={modelImg} className="img-fluid how-it-works-image" />
            <h3>2. Teach bot test</h3>
            <p>
              Gets more regression testing with same resources. Automatically
              validates application functionality.
            </p>
          </div>

          <div className="col col--4">
            <img src={cmdImg} className="img-fluid how-it-works-image" />
            <h3>3. Monitor testing results</h3>
            <p>
              Finds most relevant bugs always and quickly. No scripting required
              and mild learning curve.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
