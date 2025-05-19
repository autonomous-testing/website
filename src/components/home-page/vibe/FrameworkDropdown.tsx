import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Framework = {
  PLAYWRIGHT: "PLAYWRIGHT",
  CYPRESS: "CYPRESS",
  WEBDRIVER_IO: "WEBDRIVER_IO",
  ROBOT_FRAMEWORK: "ROBOT_FRAMEWORK",
};
const frameworks = [
  {
    label: "Playwright",
    value: Framework.PLAYWRIGHT,
  },
  {
    label: "Cypress",
    value: Framework.CYPRESS,
  },
  {
    label: "WebdriverIO",
    value: Framework.WEBDRIVER_IO,
  },
  {
    label: "Robot Framework",
    value: Framework.ROBOT_FRAMEWORK,
  },
];

const FrameworkDropdown = () => {
  const [framework] = useState(frameworks[0]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="bg-transparent border-none cursor-pointer">
        <p>{framework.label}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-3 dark:bg-gray-800">
        <RadioGroup
          defaultValue={Framework.PLAYWRIGHT}
          disabled
          className="opacity-50"
        >
          {frameworks.map((framework) => (
            <div
              key={framework.value}
              className="flex items-center space-x-2"
            >
              <RadioGroupItem
                value={framework.value}
                id={framework.value}
              />
              <Label htmlFor={framework.value}>{framework.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default FrameworkDropdown;
