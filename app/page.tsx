import Hero from "@/components/Hero";
import Testimonial from "@/components/Testimonial";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Hero></Hero>
      <div className='w-5/6  mx-auto'><Testimonial></Testimonial></div>
    </main>
  );
}
