import React from 'react';

const ScrollingAnnouncement = () => {
  return (
    <div className="relative w-full h-14 overflow-hidden bg-gradient-to-r from-violet-600 to-violet-700 shadow-lg">
      <div className="absolute inset-0 bg-violet-500/5" />

      <div className="absolute inset-x-0 top-0 h-px bg-violet-400/20" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-violet-400/20" />

      <div 
        className="absolute whitespace-nowrap text-lg font-medium text-white tracking-wide py-4 animate-scroll font-ubuntu-font"
      >
        {`🎉 Welcome to the Discuss Section!`}&nbsp;&nbsp;&nbsp;&nbsp;{`💬You are free to Diss & Cuss here!🔥`}&nbsp;&nbsp;&nbsp;&nbsp;{`🎙️Let your thoughts flow, but keep the vibes friendly! ✨❤️`}
      </div>

      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-violet-600 to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-violet-700 to-transparent z-10" />

      <style jsx>{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(100vw);  /* Start from right edge of viewport */
          }
          100% {
            transform: translateX(-100%);  /* Move to left until text is completely off screen */
          }
        }
      `}</style>
    </div>
  );
};

export default ScrollingAnnouncement;