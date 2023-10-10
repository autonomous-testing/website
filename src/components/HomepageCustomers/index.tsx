import React from "react";

const multitudeImg =
  require("@site/static/img/customers/multitude.png").default;
const livesportImg =
  require("@site/static/img/customers/livesport.png").default;

export default function HomepageHowItWorks(): JSX.Element {
  return (
    <section id="customers">
      <div className="container text--center">
        <header className="section-header">
          <h2>Trusted by the technology leaders, our early adopters</h2>
        </header>

        <div className="row">
          <div className="card col col--6 padding--md">
            <div className="card__image">
              <img src={multitudeImg} />
            </div>
            <div className="card__body">
              <h4>Multitude</h4>
              <p>
                Wopee autonomous testing is extremely valuable in testing our
                marketing & customer account pages.
              </p>
              <p>
                Juraj Žabka Engineering Lead, Multitude European provider of
                Digital Financial Services 400k+ customers in 20 countries
              </p>
            </div>
          </div>

          <div className="card col col--6">
            <div className="card__image">
              <img src={livesportImg} />
            </div>
            <div className="card__body">
              <h4>Livesport</h4>
              <p>
                Wopee showcased its potential to save us valuable time and
                effort in maintaining the visual integrity of our application.
              </p>
              <p>
                Martin Šimon Test Automation Lead, Livesport The fastest sports
                information and scores provider from 35+ sports to 100M people
                worldwide (60+ web and mobile apps)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
