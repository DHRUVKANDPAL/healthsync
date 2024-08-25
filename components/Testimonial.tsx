import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const testimonials = [
  {
    name: "Rajiv Verma",
    content:
      "As a frequent traveler, I often need to visit hospitals in different cities. This platform has been a lifesaver. I could easily complete my registration online before arriving at the hospital. No more waiting in long queues or dealing with paperwork. Everything is managed smoothly, and I feel confident that my records are secure and accessible whenever needed.",
  },
  {
    name: "Anita Sharma",
    content:
      "I was able to book an appointment for my check-up in just a few minutes. The entire process was smooth, and I loved how I could manage everything from home. It saved me a lot of time, and the staff at the hospital were already prepared when I arrived. No more waiting in line or dealing with unnecessary paperwork!",
  },
  {
    name: "Rohan Mehta",
    content:
      "This platform made it easy for me to track my medical records and appointments. I no longer have to keep paper records or worry about losing important documents. Everything is organized and accessible online, which has been a huge relief. Highly recommend this service to anyone who values convenience and efficiency.",
  },
  {
    name: "Priya Singh",
    content:
      "As a busy professional, finding time to register for hospital visits has always been difficult. This platform made it incredibly easy to handle everything online. The process was simple and stress-free. I didn't have to worry about anything when I arrived at the hospital, which was a huge relief. I am very impressed!",
  },
  {
    name: "Vikram Patel",
    content:
      "I was initially hesitant to use an online platform for my hospital appointments, but this service exceeded my expectations. It was so easy to navigate, and I could complete the entire registration in minutes. The best part is that all my information was securely stored, and the hospital had everything they needed when I arrived.",
  },
  {
    name: "Sanjana Rao",
    content:
      "The convenience of this platform has been a game-changer. I was able to complete my registration online, book an appointment, and even receive reminders about my upcoming visits. I cannot recommend this service enough. It has made accessing healthcare so much easier for me.",
  },
];

const Testimonial = () => {
  return (
    <>
      <h2 className="text-4xl font-bold text-center text-teal-950 dark:text-teal-100 my-4 mt-10 transition-colors duration-300">
        What Our Users Say
      </h2>
      <p className="text-xl text-center text-teal-700 dark:text-teal-300 mb-12 transition-colors duration-300">
        Real experiences from our valued community
      </p>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index} className="sm:basis-1/2 lg:basis-1/3">
              <div className="p-1 w-full">
                <Card className="transition-all duration-300 hover:shadow-lg hover:-translate-y-1 dark:bg-slate-800 dark:border-slate-700">
                  <CardContent className="flex aspect-square items-center justify-center px-4 h-84 md:h-80 w-full">
                    <CardHeader>
                      <CardTitle className="font-semibold text-lg dark:text-teal-100">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription className="font-medium dark:text-slate-300">
                        {testimonial.content}
                      </CardDescription>
                    </CardHeader>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:block" />
        <CarouselNext className="hidden md:block" />
      </Carousel>
    </>
  );
};

export default Testimonial;
