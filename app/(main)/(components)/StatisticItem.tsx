import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  columns: {
    logo: string;
    title: string;
    text: string;
    classNames: string;
    color: string;
    textBottom?: {
      size: "large" | "default" | "medium";
      point: boolean;
      title: string;
      value: string;
      order: "default" | "negative";
      position: "end" | "start";
      valueCN?: string;
      className?: string;
    };
  }[];
  position: "start" | "center" | "end";
  isMobile: boolean;
};

const StatisticItem = ({ columns, position, isMobile }: Props) => {
  return (
    <div
      className={`flex w-full flex-col lg:flex-row gap-5 lg:gap-16 ${
        position === "end"
          ? "justify-end"
          : position === "center"
          ? "justify-center"
          : "justify-start"
      } ${isMobile ? "justify-start" : ""}`}
    >
      {columns.map((item, index) => (
        <div
          key={`${item.title.toLocaleLowerCase()}-${index}`}
          className={cn(
            "w-full font-['Helvetica'] box-border overflow-hidden rounded-3xl p-4 md:p-8",
            item.classNames
          )}
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            backdropFilter: "blur(5px)",
          }}
        >
          <div className="flex justify-between mb-4 items-center">
            <div className="w-max flex gap-6 items-center mb-3 text-3xl">
              <span className={`w-[2px] h-8 ${item.color}`} />
              <h4
                className="w-full leading-8"
                style={{ textShadow: "0 1px 3px #7ac6ea" }}
              >
                {item.title}
              </h4>
            </div>
            <img
              className="h-12 aspect-square object-contain"
              alt={`${item.logo}_logo`}
              src={item.logo}
            />
          </div>
          <p className="w-full xl:w-[87%] text-lg text-[#c4c4c4] hyphens-auto	">
            {item.text}
          </p>
          {item.textBottom && (
            <div
              className={cn(
                "relative w-[90%] mt-8",
                item.textBottom.position === "end"
                  ? "items-end justify-end"
                  : "",
                item.textBottom.className ? item.textBottom.className : ""
              )}
            >
              <div
                className={cn(
                  "text-[#c4c4c4] font-['Roboto'] hyphens-auto	",
                  item.textBottom.size === "large"
                    ? "text-sm md:text-lg xl:text-xl uppercase"
                    : "text-base"
                )}
              >
                {item.textBottom.title}
              </div>
              <div
                className={cn(
                  "leading-[70%] font-normal hyphens-auto	",
                  item.textBottom.order === "negative" ? "-order-5" : "",
                  item.textBottom.size === "large"
                    ? "text-4xl md:text-6xl xl:text-7xl"
                    : item.textBottom.size === "medium"
                    ? "text-2xl xl:text-3xl"
                    : "text-sm md:text-lg xl:text-xl",
                  item.textBottom.valueCN ? item.textBottom.valueCN : ""
                )}
              >
                {item.textBottom.value}
              </div>
              {item.textBottom.point && (
                <img
                  className="absolute w-1 -top-1 left-0 rounded-[50px] overflow-hidden aspect-square object-contain"
                  alt=""
                  src="/assets/icons/main/green_dot.svg"
                />
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatisticItem;
