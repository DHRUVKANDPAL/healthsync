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
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import { ShineBorder } from "@/components/magicui/shine-border";

export default function Home() {
  const isMobile = useIsMobile();
  const [isSearching, setIsSearching] = useState(false);

  const MainContent = () => (
    <>
      <div className="relative">
        <div className="relative">
          <Hero></Hero>
        </div>
        <div className="absolute rounded-lg top-[85%] w-full ">
          <Vision></Vision>
        </div>
      </div>
      <div className="h-[600px] sm:h-[650px] lg:h-[800px] xl:h-[700px] "></div>
      <Features></Features>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 items-center justify-center dark:bg-slate-900/20 py-10 ">
        {/* Left Side - Terminal */}
        <div className="relative flex items-center justify-end px-2 ">
          <Terminal>
            <TypingAnimation>&gt; HealthSync on the way!</TypingAnimation>

            <AnimatedSpan delay={1500} className="text-green-500">
              <span>✔ Connecting to hospital database.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2000} className="text-green-500">
              <span>✔ Verifying patient records.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={2500} className="text-green-500">
              <span>✔ Syncing OPD appointments.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3000} className="text-green-500">
              <span>✔ Updating real-time bed availability.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={3500} className="text-green-500">
              <span>✔ Optimizing pharmacy inventory.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={4000} className="text-green-500">
              <span>✔ Processing doctor prescriptions.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={4500} className="text-green-500">
              <span>✔ Sending automated patient notifications.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={5000} className="text-green-500">
              <span>✔ Ensuring data encryption & security.</span>
            </AnimatedSpan>

            <AnimatedSpan delay={5500} className="text-blue-500">
              <span> AI Diagnostics Module Loaded:</span>
              <span className="pl-2">
                - Predictive health analytics activated.
              </span>
            </AnimatedSpan>

            <TypingAnimation delay={6000} className="text-muted-foreground">
              HealthSync is now live and operational.
            </TypingAnimation>

            <TypingAnimation delay={6500} className="text-muted-foreground">
              Real-time hospital management enabled.
            </TypingAnimation>
          </Terminal>
        </div>
        {/* Right Side - Information Text */}
        <div className="relative flex items-center justify-start px-2 ">
          <ShineBorder  color={["#A07CFE", "#FE8FB5", "#FFBE7B"]} />
        </div>
      </div>
      {/* <Chartstats></Chartstats> */}
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
