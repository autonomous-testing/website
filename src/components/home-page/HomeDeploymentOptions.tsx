import React from "react";
import Link from "@docusaurus/Link";
import { Cloud, Server } from "lucide-react";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

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
    <div className="flex flex-col justify-between p-8 rounded-2xl bg-gradient-to-br from-secondary-wopee to-purple-800 text-white h-80 max-w-md hover:shadow-xl transition-shadow duration-300">
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="text-primary-wopee">{icon}</div>
          <h3 className="text-3xl font-bold">{title}</h3>
        </div>
        <p className="text-lg leading-relaxed opacity-90">{description}</p>
      </div>

      <Link href={buttonHref} className="group mt-8">
        <button className="w-full bg-white text-secondary-wopee font-semibold rounded-lg px-8 py-4 text-lg hover:bg-primary-wopee hover:text-secondary-wopee transition-all duration-200 hover:shadow-lg">
          {buttonText}
        </button>
      </Link>
    </div>
  );
};

const HomeDeploymentOptions = () => {
  return (
    <section className="py-16 bg-slate-50 dark:bg-slate-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-800 dark:text-white mb-4">
            Flexible deployment options
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 justify-center items-center max-w-6xl mx-auto">
          <DeploymentCard
            title="Cloud"
            description="One less thing to worry about – delegate the deployment to us"
            buttonText="Start testing better now"
            buttonHref={cmdBaseUrl}
            icon={<Cloud size={40} />}
          />

          <DeploymentCard
            title="On-Premises"
            description="Maintain a tight grip on your CI/CD and get more control over security"
            buttonText="Talk to founders"
            buttonHref="/marcel"
            icon={<Server size={40} />}
          />
        </div>
      </div>
    </section>
  );
};

export default HomeDeploymentOptions;
