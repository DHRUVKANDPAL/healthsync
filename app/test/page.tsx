import BeatLoader from "@/components/BeatLoader";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <BeatLoader className="w-[50px] h-[20px]"></BeatLoader>
    </div>
  );
};
export default page;
