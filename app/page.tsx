import Chartstats from "@/components/Chartstats";
import Faq from "@/components/faq";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import Vision from "@/components/Vision";

export default function Home() {
  return (
    <main className="select-none">
      <Hero></Hero>
      <Vision></Vision>
      <Features></Features>
      <Chartstats></Chartstats>
      <div className="w-5/6 mx-auto ">
        <Testimonial></Testimonial>
      </div>
      <div className="w-5/6 mx-auto md:w-1/2 py-10">
        <Faq></Faq>
      </div>
    </main>
  );
}
