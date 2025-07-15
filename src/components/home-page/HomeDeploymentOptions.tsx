import React from "react";
import Link from "@docusaurus/Link";
import { Cloud, Server } from "lucide-react";
import { cmdBaseUrl } from "../../../cmdBaseUrl";
import ButtonPrimary from "../buttons/ButtonPrimary";

const DeploymentCard = ({
  title,
  description,
  buttonText,
  buttonHref,
  icon,
}: {
  title: string;
  description: string;
  buttonText: string;
  buttonHref: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-br from-secondary-wopee to-purple-800 text-white h-80 max-w-lg hover:shadow-xl transition-shadow duration-300">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="text-primary-wopee">{icon}</div>
          <h3 className="text-3xl font-bold">{title}</h3>
        </div>
        <p className="text-lg leading-relaxed opacity-90">{description}</p>
      </div>

      <ButtonPrimary
        className="w-full font-semibold rounded-lg px-8 py-4 text-lg !bg-primary-wopee !text-secondary-wopee group-hover:!text-white group-hover:!bg-secondary-wopee group-hover:!border-primary-wopee"
        label={buttonText}
        href={buttonHref}
      />
    </div>
  );
};

const HomeDeploymentOptions = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Deploy on your terms
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 justify-center items-center max-w-6xl mx-auto">
          <DeploymentCard
            title="Cloud (fully managed)"
            description="Focus on shipping. We take care of the rest (host, scale & update everything)."
            buttonText="Start testing better now"
            buttonHref={cmdBaseUrl}
            icon={<Cloud size={40} />}
          />

          <DeploymentCard
            title="On-Prem (self-hosted)"
            description="Run Wopee.io inside your own CI/CD. Get more control over security."
            buttonText="Book demo"
            buttonHref="/book-demo"
            icon={<Server size={40} />}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeDeploymentOptions;
