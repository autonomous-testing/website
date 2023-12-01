import React from "react";

import { TeamMemberList } from "./TeamMembersList";
import { TeamMemberCard } from "./TeamMemberCard";

export default function Team(): JSX.Element {
  return (
    <section className="mt-8 mb-16 text-center overflow-visible">
      <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Wopees
      </h2>
      <div className="flex flex-col items-center justify-center mt-3 md:mt-5 sm:flex-row gap-5 sm:flex-wrap">
        {TeamMemberList.map((props, idx) => (
          <TeamMemberCard
            key={idx}
            {...props}
          />
        ))}
      </div>
    </section>
  );
}
