import React, { useEffect, useState } from "react";
import { Lock, LockOpen } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const tooltipMessages = [
  "Serious tests? Upgrade to Starter!",
  "Let the robots break it - Upgrade to Starter!",
  "Fun's over, time for quality - Upgrade to Starter!",
  "No more 'hello world' - Upgrade to Starter!",
  "Real app, needs real tests - Upgrade to Starter!",
  "Sleep well, upgrade to Starter!",
  "Bugs had their chance to run.. Upgrade to Starter!",
  "Playtime is over, upgrade to Starter!",
];

const LockTooltip = ({
  size = 4,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [currentMessage, setCurrentMessage] = useState(tooltipMessages[0]);

  const handleMouseEnter = () => {
    const randomIndex = Math.floor(Math.random() * tooltipMessages.length);
    setCurrentMessage(tooltipMessages[randomIndex]);
    setIsHovered(true);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            className={cn(
              "absolute -top-2 -right-2 rounded-full flex p-1 bg-gray-300 text-black border border-solid border-black/50 cursor-pointer",
              className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHovered(false)}
          >
            {isHovered ? (
              <LockOpen className={`w-${size} h-${size}`} />
            ) : (
              <Lock className={`w-${size} h-${size}`} />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>{currentMessage}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default LockTooltip;
