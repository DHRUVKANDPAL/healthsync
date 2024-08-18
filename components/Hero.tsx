import React from "react";

type Props = {};

const Hero = async (props: Props) => {
  return (
    <div className="hero flex justify-start items-end w-screen bg-gradient-to-br from-teal-200 via-slate-100 to-cyan-100 py-20">
      <section className="w-2/5">
        <h1 className="text-5xl text-wrap leading-[4rem]">
          "Hero content SLOGAN HERE"
        </h1>
        <p className="text-3xl text-wrap">mini slogan here</p>
      </section>
      <section className="flex justify-around w-3/5 items-end font-bold">
        <div className="">
          <h1 className="text-4xl">452+</h1>
          <h1 className="font-semibold">Hospitals Affiliated</h1>
        </div>
        <div>
          <h1 className="text-4xl">3250+</h1>
          <h1 className="font-semibold">Blood Banks Network</h1>
        </div>
        <div>
          <h1 className="text-4xl">1M+</h1>
          <h1 className="font-semibold">Patients Registered</h1>
        </div>
      </section>
    </div>
  );
};
export default Hero;
