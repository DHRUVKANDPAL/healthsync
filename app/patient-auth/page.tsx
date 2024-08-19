import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Tabswitcher from "@/components/Tabswitcher";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    // <></>
    <div className="min-h-screen max-w-full flex justify-center py-10">
      <Tabswitcher
        signUpTab={<Signup></Signup>}
        signinTab={<Signin></Signin>}
      ></Tabswitcher>
    </div>
  );
};

export default page;
