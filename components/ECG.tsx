// components/IntroBlock.tsx
import React from "react";

const IntroBlock: React.FC = () => {
  return (
    <div className="h-screen w-screen flex justify-center items-center bg-black">
      <div className="border-2 border-[#0f3a4d] max-w-[500px] rounded-md bg-[#0b0e13] p-0">
        <svg
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 500 200"
          className="max-w-[470px] mx-5 relative transition-all duration-500 ease-in-out"
        >
          <g>
            <polyline
              className="fill-none stroke-[#00d704] stroke-[3] stroke-linecap-round stroke-linejoin-miter opacity-0 animate-ekg"
              points="486.6,113.8 328.2,113.8 310.3,132.3 296,70.7 246.8,127.4 241.6,120.2 233.9,166.4 227,27.6 
                      213.2,118.3 211.8,112.3 205.1,126.1 198.2,108.5 194.1,124.4 184.5,92.9 174.1,113 4.3,113"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

export default IntroBlock;
