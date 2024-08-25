import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Tabswitcher from "@/components/Tabswitcher";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    // <></>
    <div className="min-h-[500px] w-full max-w-screen-2xl flex justify-center py-10 mx-auto bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Tabswitcher
        signUpTab={<Signup></Signup>}
        signinTab={<Signin></Signin>}
      ></Tabswitcher>
    </div>
  );
};

export default page;
