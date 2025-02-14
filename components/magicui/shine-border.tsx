"use client";

import { cn } from "@/lib/utils";
import React from "react";
import { Activity, Calendar, Database, Pill, Brain } from "lucide-react";

const FeatureItem = ({ icon: Icon, text }: any) => (
  <div className="flex items-center space-x-3 group">
    <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors" />
    <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors">
      {text}
    </span>
  </div>
);
type TColorProp = string | string[];

interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: TColorProp;
  className?: string;
  children?: React.ReactNode;
}

/**
 * @name Shine Border
 * @description It is an animated background border effect component with easy to use and configurable props.
 * @param borderRadius defines the radius of the border.
 * @param borderWidth defines the width of the border.
 * @param duration defines the animation duration to be applied on the shining border
 * @param color a string or string array to define border color.
 * @param className defines the class name to be applied to the component
 * @param children contains react node elements.
 */
export function ShineBorder({
  borderRadius = 8,
  borderWidth = 1,
  duration = 14,
  color = "#000000",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative min-h-[60px] w-fit min-w-[300px] place-items-center rounded-[--border-radius] p-3 bg-background border",
        className
      )}
    >
      <div
        style={
          {
            "--border-width": `${borderWidth}px`,
            "--border-radius": `${borderRadius}px`,
            "--duration": `${duration}s`,
            "--mask-linear-gradient": `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
            "--background-radial-gradient": `radial-gradient(transparent,transparent, ${
              color instanceof Array ? color.join(",") : color
            },transparent,transparent)`,
          } as React.CSSProperties
        }
        className={`before:bg-shine-size pointer-events-none before:absolute before:inset-0 before:size-full before:rounded-[--border-radius] before:p-[--border-width] before:will-change-[background-position] before:content-[""] before:![-webkit-mask-composite:xor] before:![mask-composite:exclude] before:[background-image:--background-radial-gradient] before:[background-size:300%_300%] before:[mask:--mask-linear-gradient] motion-safe:before:animate-shine `}
      ></div>
      <div className="p-6 space-y-6 max-w-2xl  ">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            HealthSync: Revolutionizing Hospital Management
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400">
            HealthSync is an advanced hospital management system designed to
            optimize real-time patient care and hospital workflow.
          </p>
        </div>

        <div className="space-y-3">
          <FeatureItem
            icon={Calendar}
            text="Seamless OPD appointment scheduling"
          />
          <FeatureItem
            icon={Database}
            text="Automated real-time bed availability tracking"
          />
          <FeatureItem
            icon={Pill}
            text="Smart pharmacy inventory optimization"
          />
          <FeatureItem
            icon={Activity}
            text="Secure and encrypted patient data management"
          />
          <FeatureItem
            icon={Brain}
            text="AI-powered predictive health diagnostics"
          />
        </div>

        <p className="text-lg text-gray-600 dark:text-gray-400">
          Stay ahead with HealthSync - where technology meets healthcare
          efficiency.
        </p>
      </div>
    </div>
  );
}
