"use client";
import Chartstats from "@/components/Chartstats";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import Safari from "@/components/ui/safari";
import Vision from "@/components/Vision";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";

export default function Home() {
  const isMobile = useIsMobile();
  const [isSearching, setIsSearching] = useState(false);

  const MainContent = () => (
    <>
      <div className="relative">
        <div className="relative">
          <Hero></Hero>
        </div>
        <div className="absolute rounded-lg top-[80%] w-full ">
          <Vision></Vision>
        </div>
      </div>
      <div className="h-[600px] sm:h-[650px] lg:h-[800px] xl:h-[700px] "></div>
      <Features></Features>
      <div className="relative flex items-center justify-center bg-slate-50 dark:bg-slate-900">
        {!isMobile && (
          <Safari
            url="healthsync.vercel.app"
            className="w-full px-10 my-10 "
            imageSrc={
              "https://res.cloudinary.com/ddd4ftror/image/upload/healthsync/plpt7u632qoc6ud0z4li"
            }
          />
        )}
      </div>
      <Chartstats></Chartstats>
      <div className="w-5/6 mx-auto ">
        <Testimonial></Testimonial>
      </div>
      <div className="w-5/6 mx-auto md:w-1/2 py-10">
        <Faq></Faq>
      </div>
      <Footer></Footer>
    </>
  );

  return (
    <main className="select-none bg-gradient-to-r dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header onSearchStateChange={setIsSearching} />
      {!isSearching && <MainContent />}
    </main>
  );
}
