import React from "react";

const Beat = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 80" >
      <path
        className="stroke-red-400 stroke-[3] fill-none animate-draw"
        d="M0.5,38.5 L16,38.5 L19,25.5 L24.5,57.5 L31.5,7.5 L37.5,46.5 L43,38.5 L53.5,38.5"
      />
    </svg>
  );
};

const styles = `
  @keyframes draw {
    0% {
      stroke-dashoffset: 350;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }

  .animate-draw {
    stroke-dasharray: 175;
    animation: draw 1.4s linear infinite;
  }
`;

export default () => (
  <>
    <style>{styles}</style>
    <Beat />
  </>
);
