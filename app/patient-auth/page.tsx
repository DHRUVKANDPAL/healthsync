import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Tabswitcher from "@/components/Tabswitcher";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    // <></>
    <div className="min-h-screen w-full max-w-screen-2xl flex justify-center py-10 mx-auto">
      <Tabswitcher
        signUpTab={<Signup></Signup>}
        signinTab={<Signin></Signin>}
      ></Tabswitcher>
    </div>
  );
};

export default page;
