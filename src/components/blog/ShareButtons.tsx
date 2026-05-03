import React, { useState } from "react";
import { Twitter, Linkedin, Link2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

type ShareButtonsProps = {
  url: string;
  title: string;
  className?: string;
};

const iconBtn =
  "inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 hover:bg-secondary-wopee/10 hover:text-secondary-wopee dark:hover:bg-primary-wopee/15 dark:hover:text-primary-wopee hover:border-transparent transition-colors";

export default function ShareButtons({ url, title, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const tweet = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
  const linkedin = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="text-sm font-semibold text-gray-600 dark:text-gray-400 mr-1">
        Share
      </span>
      <a
        href={tweet}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Twitter / X"
        className={iconBtn}
      >
        <Twitter size={18} />
      </a>
      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className={iconBtn}
      >
        <Linkedin size={18} />
      </a>
      <button
        type="button"
        onClick={onCopy}
        aria-label={copied ? "Link copied" : "Copy link"}
        className={cn(iconBtn, copied && "text-secondary-wopee dark:text-primary-wopee border-transparent bg-secondary-wopee/10 dark:bg-primary-wopee/15")}
      >
        {copied ? <Check size={18} /> : <Link2 size={18} />}
      </button>
      {copied && (
        <span className="text-sm text-secondary-wopee dark:text-primary-wopee font-medium">
          Copied!
        </span>
      )}
    </div>
  );
}
