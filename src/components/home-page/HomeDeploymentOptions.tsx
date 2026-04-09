import React from "react";
import Link from "@docusaurus/Link";
import { Cloud, Server } from "lucide-react";
import { cmdBaseUrl } from "../../../cmdBaseUrl";
import ButtonPrimary from "../buttons/ButtonPrimary";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";
import GradientCard from "@/components/ui/GradientCard";

type DeploymentCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  recommended?: boolean;
  cta: React.ReactNode;
};

const DeploymentCard = ({
  title,
  subtitle,
  description,
  icon,
  recommended,
  cta,
}: DeploymentCardProps) => {
  const body = (
    <>
      {recommended && (
        <span className="absolute top-5 right-5 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-primary-wopee text-secondary-wopee">
          Recommended
        </span>
      )}
      <div>
        <div className="flex items-center gap-4 mb-6">
          <div className="text-primary-wopee shrink-0">{icon}</div>
          <div>
            <h3 className="text-3xl font-bold leading-tight m-0">{title}</h3>
            <p className="text-sm font-medium uppercase tracking-wider opacity-70 mt-1 m-0">
              {subtitle}
            </p>
          </div>
        </div>
        <p className="text-lg leading-relaxed opacity-90">{description}</p>
      </div>
      <div className="mt-8">{cta}</div>
    </>
  );

  if (recommended) {
    return (
      <GradientCard
        variant="solid"
        padding="roomy"
        className="relative flex flex-col justify-between w-full max-w-md h-full"
      >
        {body}
      </GradientCard>
    );
  }

  return (
    <GradientCard
      padding="roomy"
      className="w-full max-w-md h-full"
      innerClassName="relative flex flex-col justify-between"
    >
      {body}
    </GradientCard>
  );
};

const HomeDeploymentOptions = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Deploy on your terms</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            Most teams start in the cloud — switch to self-hosted whenever you
            need to.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 justify-center items-stretch max-w-5xl mx-auto">
          <DeploymentCard
            title="Cloud"
            subtitle="Fully managed"
            description="Focus on shipping. We take care of the rest (host, scale & update everything)."
            icon={<Cloud size={40} />}
            recommended
            cta={
              <ButtonPrimary
                id="cta-deploy-cloud"
                className="w-full font-semibold rounded-lg px-8 py-4 text-lg !bg-primary-wopee !text-secondary-wopee"
                label="Start for free"
                href={cmdBaseUrl}
              />
            }
          />

          <DeploymentCard
            title="On-Prem"
            subtitle="Self-hosted"
            description="Run Wopee.io inside your own CI/CD. Get more control over security."
            icon={<Server size={40} />}
            cta={
              <Link to="/book-demo" id="cta-deploy-onprem">
                <ButtonGradientOutline className="w-full" label="Book demo" />
              </Link>
            }
          />
        </div>
      </div>
    </section>
  );
};

export default HomeDeploymentOptions;
