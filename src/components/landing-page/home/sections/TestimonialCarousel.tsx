import React, { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Wopee showcased its potential to save us valuable time and effort in maintaining the visual integrity of our application.",
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
      "Wopee autonomous testing is extremely valuable in testing our marketing & customer account pages.",
    about:
      "Multitude, European provider of Digital Financial Services 400k+ customers in 20 countries",
    avatar: "/img/customers/avatars/juraj-multitude.jpeg",
    name: "Juraj Žabka",
    position: "Engineering Lead",
    logo: "/img/customers/multitude-logo.png",
    alt: "Multitude logo",
  },
];

const Testimonial = ({
  alt,
  logo,
  name,
  quote,
  about,
  avatar,
  position,
  itemIndex,
  activeItemIndex,
}) => (
  <div
    className={`absolute top-1/2 -translate-y-1/2 left-0 w-full ${
      activeItemIndex === itemIndex ? "opacity-100" : "opacity-0"
    } transition-opacity duration-500 flex flex-col lg:flex-row gap-5 lg:gap-10 items-center`}
  >
    <div className="lg:w-1/2 lg:text-3xl text-balance flex flex-col gap-5 px-2 lg:px-20 text-center">
      <p>{quote}</p>
      <p className="text-secondary-wopee dark:text-primary-wopee">{about}</p>
    </div>

    <div className="flex flex-col lg:flex-row gap-3 items-center">
      <div className="flex gap-2">
        <img
          className="avatar__photo avatar__photo--xl"
          src={avatar}
        />
        <div className="avatar__intro text-left">
          <div className="avatar__name">{name}</div>
          <small className="avatar__subtitle">{position}</small>
        </div>
      </div>

      <div className="hidden lg:block h-20 w-0.5 opacity-30 rounded-3xl bg-secondary-wopee dark:bg-primary-wopee" />

      <div className="flex justify-center items-center lg:justify-start">
        <img
          className="w-1/2 dark:invert dark:grayscale"
          src={logo}
          alt={alt}
        />
      </div>
    </div>
  </div>
);

const TestimonialSwitcher = ({
  activeItemIndex,
  setActiveItemIndex,
  activateInterval,
}) => {
  return (
    <div className="flex justify-center gap-2">
      {testimonials.map((_, index) => (
        <div
          key={index}
          className={`w-5 h-5 ${
            activeItemIndex === index
              ? "bg-secondary-wopee dark:bg-primary-wopee"
              : "bg-gray-300 opacity-75"
          } rounded-full cursor-pointer`}
          onClick={() => {
            setActiveItemIndex(index);
            activateInterval();
          }}
          aria-label={`Go to slide ${index + 1}`}
        />
      ))}
    </div>
  );
};

const TestimonialCarousel = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const activateInterval = () => {
    if (intervalId) {
      clearInterval(intervalId);
    }
    const interval = setInterval(() => {
      setActiveItemIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 8000);

    setIntervalId(interval);
  };

  useEffect(() => {
    activateInterval();
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="my-16 lg:my-28 flex flex-col gap-5 lg:gap-14">
      <div className="text-3xl lg:text-4xl text-center font-bold text-balance">
        <p>Join the visionaries shaping the future</p>
        <p className="text-secondary-wopee dark:text-primary-wopee">
          Trusted by the technology leaders & innovators
        </p>
      </div>

      <div
        className="relative flex items-center container"
        style={{ height: "400px" }}
      >
        {" "}
        {testimonials.map((testimonial, index) => (
          <Testimonial
            key={testimonial.name}
            itemIndex={index}
            activeItemIndex={activeItemIndex}
            {...testimonial}
          />
        ))}
      </div>

      <TestimonialSwitcher
        activeItemIndex={activeItemIndex}
        setActiveItemIndex={setActiveItemIndex}
        activateInterval={activateInterval}
      />
    </div>
  );
};

export default TestimonialCarousel;
