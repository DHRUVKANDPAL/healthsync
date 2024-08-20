import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

type Props = {
  className?: string;
};

const Logo = ({ className }: Props) => {
  return (
    <Link href={"/."}>
      <h1
        className={cn(
          "text-3xl sm:text-4xl font-poppins-font font-semibold text-teal-500 text-center sm:text-left ",
          className
        )}
      >
        Health<span className="text-teal-700 font-bold">Sync</span>
      </h1>
    </Link>
  );
};

export default Logo;
