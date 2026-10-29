import React from "react";

const comparisonItems = [
  {
    stat: "",
    unit: "",
    description: "Quicker preparation",
  },
  {
    stat: "",
    unit: "",
    description: "Lower maintenance effort",
  },
  {
    stat: "",
    unit: "",
    description: "Broader coverage",
  },
  {
    stat: "",
    unit: "",
    description: "Quicker execution",
  },
];

export default function HomeComparison(): JSX.Element {
  return (
    <section
      id="comparison"
      className="mt-5 md:mt-10"
    >
      <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee mb-10">
        Compared to manual testing
      </h2>

      <div className="flex flex-col md:flex-row justify-center items-center gap-2 my-2">
        {comparisonItems.map((item, index) => (
          <div
            key={index}
            className="card border border-solid border-gray-300 dark:border-gray-700 flex flex-col justify-center items-center aspect-video w-56 rounded-lg dark:hover:border-primary-wopee hover:border-secondary-wopee group transition-all"
          >
            <p className="flex items-center justify-center">
              <span className="text-2xl">{item.stat}</span>
              <span className="opacity-90 text-xl">{item.unit}</span>
            </p>
            <p className="flex items-center justify-center opacity-80 ">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
