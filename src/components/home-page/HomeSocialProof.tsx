import React, { useState, useEffect } from "react";
import { mdiFormatQuoteClose, mdiFormatQuoteOpen } from "@mdi/js";
import Icon from "@mdi/react";
import Link from "@docusaurus/Link";

const testimonials = [
  {
    quote:
      "Wopee.io showcased its potential to save us valuable time and effort in maintaining the visual integrity of our application",
    about:
      "Livesport, The fastest sports information and scores provider from 35+ sports to 100M people worldwide (60+ web and mobile apps)",
    avatar: "/img/customers/avatars/martin-livesport.jpg",
    name: "Martin Šimon",
    position: "Test Automation Lead",
    logo: "/img/customers/flash-score-logo.png",
    alt: "Flash score logo",
  },
  {
    quote:
      "Wopee.io autonomous testing is extremely valuable in testing our marketing & customer account pages",
    about:
      "Multitude, European provider of Digital Financial Services 400k+ customers in 20 countries",
    avatar: "/img/customers/avatars/juraj-multitude.jpeg",
    name: "Juraj Žabka",
    position: "Engineering Lead",
    logo: "/img/customers/multitude-logo.png",
    alt: "Multitude logo",
  },
];

const TestimonialCard = ({ testimonial, itemIndex, activeItemIndex }) => {
  const isLivesport = testimonial.name === "Martin Šimon";
  const CardContent = (
    <div className="group relative rounded-xl transition-shadow h-full flex max-w-4xl w-full">
      <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-gradient-to-br from-blue-500 to-secondary-wopee p-0.5"></div>
      <div className="relative bg-white/70 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl p-8 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-shadow h-full w-full backdrop-blur z-10 group-hover:border-transparent">
        <div className="flex-1 flex flex-col">
          <div className="mb-6">
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-900 dark:text-white leading-relaxed font-medium text-center">
              <Icon
                size={1.2}
                path={mdiFormatQuoteOpen}
                className="text-secondary-wopee dark:text-primary-wopee inline mr-2"
              />
              {testimonial.quote}
              <Icon
                size={1.2}
                path={mdiFormatQuoteClose}
                className="text-secondary-wopee dark:text-primary-wopee inline ml-2"
              />
            </p>
          </div>

          <div className="flex-1 flex flex-col justify-end">
            <div className="flex items-center gap-4 mb-4">
              <img
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                src={testimonial.avatar}
                alt={testimonial.name}
              />
              <div className="flex-1">
                <div className="font-bold text-lg text-gray-900 dark:text-white">
                  {testimonial.name}
                </div>
                <div className="text-base text-gray-600 dark:text-gray-400">
                  {testimonial.position}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-secondary-wopee dark:text-primary-wopee font-medium leading-relaxed">
                  {testimonial.about}
                </p>
              </div>
              <div className="ml-6 flex-shrink-0">
                <img
                  className="h-16 w-auto dark:invert dark:grayscale opacity-90"
                  src={testimonial.logo}
                  alt={testimonial.alt}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center ${
        activeItemIndex === itemIndex ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500`}
    >
      {isLivesport ? (
        <Link
          to="/blog/livesport-visual-testing-w-wopee-io"
          className="block w-full h-full hover:no-underline"
        >
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </div>
  );
};

const TestimonialSwitcher = ({
  activeItemIndex,
  setActiveItemIndex,
  activateInterval,
}) => {
  return (
    <div className="flex justify-center gap-2 mt-8">
      {testimonials.map((_, index) => (
        <div
          key={index}
          className={`w-3 h-3 ${
            activeItemIndex === index
              ? "bg-secondary-wopee dark:bg-primary-wopee"
              : "bg-gray-300 dark:bg-gray-600 opacity-50"
          } rounded-full cursor-pointer hover:opacity-75 transition-opacity`}
          onClick={() => {
            setActiveItemIndex(index);
            activateInterval();
          }}
          aria-label={`Go to testimonial ${index + 1}`}
        />
      ))}
    </div>
  );
};

const HomeSocialProof = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const activateInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const interval = setInterval(() => {
      setActiveItemIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 6000);

    setIntervalId(interval);
  };

  useEffect(() => {
    activateInterval();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="w-full flex flex-col items-center py-16 px-2">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary-wopee dark:text-primary-wopee mb-2">
          Trusted by leading tech teams
        </h2>
        <p className="text-lg text-gray-700 dark:text-white">
          Join the visionaries who chose Wopee.io to transform their testing.
        </p>
      </div>

      <div className="max-w-4xl w-full px-4">
        <div className="relative w-full" style={{ height: "350px" }}>
          {testimonials.map((testimonial, idx) => (
            <TestimonialCard
              key={idx}
              testimonial={testimonial}
              itemIndex={idx}
              activeItemIndex={activeItemIndex}
            />
          ))}
        </div>

        <TestimonialSwitcher
          activeItemIndex={activeItemIndex}
          setActiveItemIndex={setActiveItemIndex}
          activateInterval={activateInterval}
        />
      </div>
    </section>
  );
};

export default HomeSocialProof;
