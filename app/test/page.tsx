"use client";
import BeatLoader from "@/components/BeatLoader";
import { triage } from "@/lib/gemini";
// import { MedicalTriage, triage } from "@/lib/gemini";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  useEffect(() => {
    async function Gemini(input:string) {
      const output=await triage(input);
      console.log(output);
    }
    async function fetchData() {
      const response = await fetch("/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          departments: ["Cardiology", "Neurology"],
        }),
      });

      // const data = await response.json();
    }
    Gemini("pet dard");
    fetchData();
  },[])
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* <BeatLoader className="w-[50px] h-[20px]"></BeatLoader> */}
      Test Page
    </div>
  );
};
export default page;
