import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Tabswitcher from "@/components/Tabswitcher";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="min-h-screen flex justify-center items-center mt-10">
      <Tabswitcher
        signUpTab={<Signup></Signup>}
        signinTab={<Signin></Signin>}
      ></Tabswitcher>
    </div>
  );
};

export default page;
