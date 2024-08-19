import { cn } from "@/lib/utils";
import React from "react";

type Props = {
  props?: string;
};

const Logo = (props: Props) => {
  return (
    <h1
      className={cn(
        "text-3xl sm:text-4xl font-poppins-font font-semibold text-teal-500 text-center sm:text-left ",
        props
      )}
    >
      Health<span className="text-teal-700 font-bold">Sync</span>
    </h1>
  );
};

export default Logo;
