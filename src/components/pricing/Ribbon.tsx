import React from "react";

const Ribbon = () => {
  return (
    <div className="absolute right-0 top-0 h-16 w-16">
      <div className="absolute transform rotate-45 bg-secondary-wopee dark:bg-primary-wopee  text-center text-white dark:text-secondary-wopee shadow-sm font-semibold py-1 right-[-40px] top-[32px] w-[170px]">
        Most Popular
      </div>
    </div>
  );
};

export default Ribbon;
