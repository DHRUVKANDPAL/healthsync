import React from "react";
import { cn } from "@/lib/utils";
const BeatLoader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn("absolute inset-0 m-auto w-[200px] h-[80px]", className)}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 140 80">
        <path
          className="stroke-green-600 stroke-[3] fill-none animate-draw"
          d="M0.5,40 L15,40 L18,28 L23,62 L29,5 L35,50 L41,40 L45,40 
             L50,40 L53,22 L58,68 L64,12 L70,55 L76,40 L80,40 
             L85,40 L88,32 L93,58 L99,8 L105,48 L111,40 L115,40 
             L120,40 L123,18 L128,72 L134,2 L139,45 L140,40"
        />
      </svg>
    </div>
  );
};

const styles = `
  @keyframes draw {
    0% {
      stroke-dashoffset: 800;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  .animate-draw {
    stroke-dasharray: 800;
    animation: draw 2.1s linear infinite;
  }
`;

export default ({ className }: { className?: string }) => (
  <>
    <style>{styles}</style>
    <BeatLoader className={className} />
  </>
);
