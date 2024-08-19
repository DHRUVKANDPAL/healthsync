import Faq from "@/components/faq";
import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <div className='w-5/6 mx-auto '><Testimonial></Testimonial></div>
      <div className='w-5/6 mx-auto md:w-1/2 py-10'><Faq></Faq></div>
    </main>
  );
}
