import React from "react";

type LastCheckedProps = {
  note: string;
};

const LastChecked = ({ note }: LastCheckedProps) => (
  <div className="w-full flex justify-center px-4 pb-8">
    <p className="m-0 max-w-3xl text-center text-sm italic text-gray-500 dark:text-gray-400">
      {note}
    </p>
  </div>
);

export default LastChecked;
