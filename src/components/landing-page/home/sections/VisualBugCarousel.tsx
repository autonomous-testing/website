import { mdiArrowLeft, mdiArrowRight } from "@mdi/js";
import Icon from "@mdi/react";
import React, { useEffect, useRef, useState } from "react";

const visualBugImages = [
  "/img/visual-bugs/1.png",
  "/img/visual-bugs/2.png",
  "/img/visual-bugs/3.png",
  "/img/visual-bugs/4.png",
  "/img/visual-bugs/6.png",
  "/img/visual-bugs/7.png",
  "/img/visual-bugs/8.png",
  "/img/visual-bugs/1.png",
  "/img/visual-bugs/2.png",
  "/img/visual-bugs/3.png",
  "/img/visual-bugs/4.png",
  "/img/visual-bugs/6.png",
  "/img/visual-bugs/7.png",
  "/img/visual-bugs/8.png",
];

const VisualBugImage = ({ image }: { image: string }) => {
  return (
    <div className="w-52 h-full snap-start">
      <img
        src={image}
        alt="VisualBug"
      />
    </div>
  );
};

const VisualBugCarousel = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  useEffect(() => {
    const scrollInterval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;

        if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
          scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          scrollRef.current.scrollBy({ left: 260, behavior: "smooth" });
        }
      }
    }, 3000);

    return () => clearInterval(scrollInterval);
  }, []);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(Math.ceil(scrollLeft + clientWidth) < scrollWidth);
    }
  };

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -260 : 260;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="container lg:mb-28 mb-16 relative">
      {showLeftArrow && (
        <button
          className="absolute left-0 md:-left-5 top-1/2 transform -translate-y-1/2 bg-transparent border-none p-2 z-10 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          onClick={() => scroll("left")}
        >
          <Icon
            path={mdiArrowLeft}
            size={2}
            className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
          />
        </button>
      )}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="grid grid-flow-col gap-5 mx-5 md:mx-0 overflow-x-auto md:overflow-x-hidden snap-x scroll-smooth rounded-md"
      >
        {visualBugImages.map((image, index) => (
          <VisualBugImage
            key={index}
            image={image}
          />
        ))}
      </div>
      {showRightArrow && (
        <button
          className="absolute right-0 md:-right-5 top-1/2 transform -translate-y-1/2 bg-transparent border-none p-2 z-10 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
          onClick={() => scroll("right")}
        >
          <Icon
            path={mdiArrowRight}
            size={2}
            className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
          />
        </button>
      )}
    </div>
  );
};

export default VisualBugCarousel;
