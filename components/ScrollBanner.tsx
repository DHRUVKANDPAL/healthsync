import React from 'react';

const ScrollingAnnouncement = () => {
  return (
    <div className="relative w-full h-14 overflow-hidden bg-gradient-to-r from-blue-800 to-blue-900 dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-900 shadow-lg">
      <div className="absolute inset-0 bg-blue-500/5 " />

      <div className="absolute inset-x-0 top-0 h-px bg-blue-400/20 " />
      <div className="absolute inset-x-0 bottom-0 h-px bg-blue-400/20 " />

      <div 
        className="absolute whitespace-nowrap text-lg font-medium text-white tracking-wide py-4 animate-scroll font-ubuntu-font"
      >
        {`🎉 Welcome to the Discuss Section!`}&nbsp;&nbsp;&nbsp;&nbsp;{`💬Feel free to share your thoughts and engage in meaningful conversations! ✨`}&nbsp;&nbsp;&nbsp;&nbsp;{`🎙️ Express yourself freely while maintaining a positive and friendly vibe! ❤️ `}
      </div>

      <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-blue-800 to-transparent z-10 dark:bg-gradient-to-r dark:from-slate-800 dark:to-transparent" />
      <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-blue-900 to-transparent z-10 dark:bg-gradient-to-l dark:from-slate-900 dark:to-transparent" />

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