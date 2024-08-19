import React from "react";

type Props = {};

const Logo = (props: Props) => {
  return (
    <h1 className="text-3xl sm:text-4xl font-poppins-font font-semibold text-teal-500 text-center sm:text-left">
      Health<span className="text-teal-700 font-bold">Sync</span>
    </h1>
  );
};

export default Logo;
