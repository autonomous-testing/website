import React from "react";
import useBaseUrl from "@docusaurus/useBaseUrl";
import LyingCheck from "./LyingCheck";
import VideoBlock from "./VideoBlock";
import { learnConfig } from "@/data/learn-config";
import { featuredTutorials, cardTitle } from "@/data/learn-tutorials";

const bungee = { fontFamily: 'Bungee, "Arial Black", sans-serif' };

// The series title card ("slate"): the one black/yellow band on /learn, in the
// look of the video poster. Purple stays the house everywhere else.
export default function SeriesSlate() {
  const monkey = useBaseUrl("/img/learn/monkey-disc.webp");
  const video = learnConfig.introVideoId;
  return (
    <section aria-labelledby="series-h" className="bg-[#0d0d0d] text-white">
      <div className="container px-6 lg:px-10 py-14 lg:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
            <LyingCheck size="lg" />
            <h2
              id="series-h"
              style={bungee}
              className="m-0 mt-5 text-[2.5rem] font-normal uppercase leading-[0.95] tracking-normal text-primary-wopee sm:text-6xl"
            >
              Green is
              <br />
              not correct
            </h2>
            <p className="m-0 mt-4 text-lg font-semibold text-white sm:text-xl">
              Free hands-on tutorials · agentic testing for testers
            </p>
            <ol className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
              {featuredTutorials.map((t, i) => (
                <li key={t.id} className="flex items-baseline gap-3">
                  <span style={bungee} className="w-[4.5rem] flex-shrink-0 text-2xl text-primary-wopee">
                    EP.{i + 1}
                  </span>
                  <span className="text-base text-gray-200">{cardTitle(t)}</span>
                </li>
              ))}
            </ol>
          </div>
          {video ? (
            <VideoBlock
              videoId={video}
              poster={learnConfig.introPoster}
              title="Green Is Not Correct: what this series teaches"
              comingLabel=""
            />
          ) : (
            <img
              src={monkey}
              alt=""
              width={240}
              height={240}
              loading="lazy"
              className="mx-auto hidden h-60 w-60 sm:block lg:h-80 lg:w-80"
            />
          )}
        </div>
      </div>
    </section>
  );
}
