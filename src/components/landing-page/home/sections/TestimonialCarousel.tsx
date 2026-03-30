import React, { useState, useEffect } from "react";

const testimonials = [
  {
    quote:
      "Wopee showcased its potential to save us valuable time and effort in maintaining the visual integrity of our application",
    about:
      "Livesport, The fastest sports information and scores provider from 35+ sports to 100M people worldwide (60+ web and mobile apps)",
    avatar: "/img/customers/avatars/martin-livesport.webp",
    name: "Martin Šimon",
    position: "Test Automation Lead",
    logo: "/img/customers/flash-score-logo.png",
    alt: "Flash score logo",
  },
  {
    quote:
      "Wopee autonomous testing is extremely valuable in testing our marketing & customer account pages",
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
    className={`${
      activeItemIndex === itemIndex
        ? "block md:opacity-100"
        : "hidden md:opacity-0"
    } md:absolute md:inset-0 transition-opacity duration-500 flex items-center justify-center px-4`}
  >
    <div className="w-full max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-8 lg:p-10 flex flex-col gap-6 items-center border border-gray-200 dark:border-gray-600 shadow-lg text-center">
      <p className="text-lg sm:text-xl lg:text-2xl leading-relaxed">
        <span className="text-secondary-wopee dark:text-primary-wopee font-bold text-3xl">&ldquo;</span>
        {quote}
        <span className="text-secondary-wopee dark:text-primary-wopee font-bold text-3xl">&rdquo;</span>
      </p>
      <p className="text-secondary-wopee dark:text-primary-wopee text-sm lg:text-base">
        {about}
      </p>
      <div className="flex items-center gap-4 pt-2">
        <img
          className="w-14 h-14 rounded-full object-cover border-2 border-secondary-wopee/30 dark:border-primary-wopee/30 flex-shrink-0"
          src={avatar}
          alt={name}
        />
        <div className="text-left">
          <p className="font-bold">{name}</p>
          <p className="text-sm opacity-60">{position}</p>
        </div>
        <div className="h-10 w-px bg-gray-300 dark:bg-gray-600 mx-1" />
        <img
          className="h-8 w-auto max-w-[120px] dark:invert dark:grayscale object-contain"
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
}) => (
  <div className="flex justify-center gap-2">
    {testimonials.map((_, index) => (
      <div
        key={index}
        className={`w-3 h-3 rounded-full cursor-pointer transition-opacity ${
          activeItemIndex === index
            ? "bg-secondary-wopee dark:bg-primary-wopee"
            : "bg-gray-300 dark:bg-gray-600 opacity-50"
        }`}
        onClick={() => {
          setActiveItemIndex(index);
          activateInterval();
        }}
        aria-label={`Go to testimonial ${index + 1}`}
      />
    ))}
  </div>
);

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
      <div className="text-xl sm:text-3xl lg:text-4xl text-center font-bold text-balance">
        <p>Join the visionaries shaping the future</p>
        <p className="text-secondary-wopee dark:text-primary-wopee">
          Trusted by the technology leaders & innovators
        </p>
      </div>

      <div className="relative flex items-center justify-center w-full md:h-[350px]">
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
