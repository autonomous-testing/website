import React, { useState } from "react";
import Head from "@docusaurus/Head";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus } from "@mdi/js";

export type CompareFaqItem = {
  question: string;
  answer: string;
  render?: React.ReactNode;
};

type CompareFaqProps = {
  title: string;
  faqs: CompareFaqItem[];
};

// JSON-LD answers must stay word-identical to the visible answers
// (links live only in the visible HTML via `render`).
const CompareFaq = ({ title, faqs }: CompareFaqProps) => {
  const [openIndices, setOpenIndices] = useState<number[]>([]);

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <div className="py-16 lg:py-24 px-4 lg:px-8 text-slate-900 dark:text-white transition-colors duration-300">
      <Head>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Head>
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-12">{title}</h2>

        <div>
          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="border-b border-slate-200 dark:border-slate-800 last:border-b-0"
            >
              <h3 className="m-0">
                <button
                  className="bg-transparent border-none w-full flex justify-between items-center py-4 text-left text-lg font-bold focus:outline-none focus:ring-0 group text-slate-900 dark:text-white"
                  onClick={() => toggleFaq(index)}
                >
                  {faq.question}
                  <Icon
                    path={openIndices.includes(index) ? mdiMinus : mdiPlus}
                    size={1}
                    className="flex-shrink-0 ml-4 text-slate-500 dark:text-slate-400"
                  />
                </button>
              </h3>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndices.includes(index)
                    ? "max-h-[1000px] opacity-100 mb-4"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-slate-600 dark:text-slate-400 m-0">
                  {faq.render ?? faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompareFaq;
