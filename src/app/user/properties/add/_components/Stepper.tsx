import { cn } from "@nextui-org/react";
import React from "react";

interface Props {
  items: {
    label: string;
  }[];
  activeItem: number;
  setActiveItem: (item: number) => void;
  className?: string;
}

function Stepper({ items, className, activeItem, setActiveItem }: Props) {
  return (
    <div className={cn("flex items-center justify-around", className)}>
      {items.map((item, index) => (
        <div key={index}>
          <div className={"flex items-center justify-around"}>
            <div
              className={cn(
                "rounded-full w-6 h-6 flex justify-center items-center transition",
                {
                  "bg-primary-400 text-white": index + 1 === activeItem,
                  "bg-primary-100 text-white": index + 1 > activeItem,
                  "bg-primary-700 text-white": index + +1 < activeItem,
                  "cursor-pointer": index + 1 <= activeItem,
                }
              )}
              {...(index + 1 <= activeItem
                ? { onClick: () => setActiveItem(index + 1) }
                : {})}
            >
              {index + 1}
            </div>
            <p>{item.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Stepper;
