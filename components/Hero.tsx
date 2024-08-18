import React from "react";

type Props = {};

const Hero = async (props: Props) => {
  return (
    <div className="hero flex flex-col md:flex-row justify-between items-center w-screen bg-gradient-to-br from-teal-200 via-slate-100 to-cyan-100 h-80">
      <section className="w-full md:w-2/5 mb-10 md:mb-0 p-4">
        <h1 className="text-4xl md:text-5xl font-bold text-wrap leading-tight mb-4">
          "Saving Lives, One Drop at a Time"
        </h1>
        <p className="text-xl md:text-3xl text-wrap text-gray-700">
          Connecting donors, patients, and hospitals
        </p>
        <button className="mt-6 bg-teal-500 text-white font-bold py-2 px-4 rounded hover:bg-teal-600 transition duration-300">
          Donate Now
        </button>
      </section>
      <div className="md:w-3/5 bg-[url('https://horizonhospital.com/wp-content/uploads/2018/05/GENERAL-WARD-1.jpg')]">
        <section className="flex flex-wrap justify-around w-full bg-gradient-to-t from-emerald-950 to-transparent items-end pb-20 h-80 bg-cover font-bold text-center ">
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h1 className="text-3xl md:text-4xl text-teal-300">452+</h1>
            <h2 className="font-semibold text-gray-300">
              Hospitals Affiliated
            </h2>
          </div>
          <div className="w-full sm:w-1/3 mb-6 sm:mb-0">
            <h1 className="text-3xl md:text-4xl text-teal-300">3250+</h1>
            <h2 className="font-semibold text-gray-300">Blood Banks Network</h2>
          </div>
          <div className="w-full sm:w-1/3">
            <h1 className="text-3xl md:text-4xl text-teal-300">1M+</h1>
            <h2 className="font-semibold text-gray-300">Patients Registered</h2>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Hero;
