import type { BoxTypeVariant } from "../constants";
import React, { HTMLAttributes, InputHTMLAttributes } from "react";

type InputBoxProps = InputHTMLAttributes<HTMLInputElement> & {
  letter?: string;
  type?: BoxTypeVariant;
};

interface ColorTypeMap {
  [key: string]: string;
}

const colorTypeMap: ColorTypeMap = {
  wrong: "bg-neutral-700", // Grey
  misplaced: "bg-amber-500", // Orange
  solved: "bg-green-600", // Green
  default: "border-2 border-neutral-500", // Border Grey
};

export const InputBox: React.FC<InputBoxProps> = ({
  letter,
  type = "default",
}) => {
  let boxStyling = colorTypeMap[type];

  if (!letter) {
    boxStyling = "border-2 border-neutral-600";
  }

  return (
    <div
      className={`flex justify-center items-center box-border h-20 w-20 ${boxStyling}`}
    >
      {letter && <h1 className="font-mono text-white text-5xl">{letter}</h1>}
    </div>
  );
};
