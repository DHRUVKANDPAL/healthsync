import Doctorsignin from "@/components/Doctorsignin";
import DoctorSignUp from "@/components/Doctorsignup";
import Footer from "@/components/Footer";
import Hospitalsignin from "@/components/Hospitalsignin";


import Tabswitcher from "@/components/Tabswitcher";
import React from "react";

const DoctorAuth = () => {
  return (
    <div className="">
      <div className="min-h-[500px] w-full max-w-screen-2xl flex justify-center py-10 mx-auto bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <Tabswitcher
          signinTab={<Doctorsignin></Doctorsignin>}
          signUpTab={<DoctorSignUp></DoctorSignUp>}
        ></Tabswitcher>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default DoctorAuth;
