import React from "react";
import { Quote } from "lucide-react";
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
    role: "Frequent Traveler",
    content:
      "As a frequent traveler, I often need to visit hospitals in different cities. This platform has been a lifesaver. I could easily complete my registration online before arriving at the hospital. No more waiting in long queues or dealing with paperwork. Everything is managed smoothly, and I feel confident that my records are secure and accessible whenever needed. The staff is always prepared for my arrival, making each visit efficient and stress-free.",
  },
  {
    name: "Anita Sharma",
    role: "Regular Patient",
    content:
      "I was able to book an appointment for my check-up in just a few minutes. The entire process was smooth, and I loved how I could manage everything from home. It saved me a lot of time, and the staff at the hospital were already prepared when I arrived. No more waiting in line or dealing with unnecessary paperwork! The online platform is intuitive and user-friendly, making healthcare access simpler than ever before.",
  },
  {
    name: "Rohan Mehta",
    role: "Tech Professional",
    content:
      "This platform made it easy for me to track my medical records and appointments. I no longer have to keep paper records or worry about losing important documents. Everything is organized and accessible online, which has been a huge relief. The digital system ensures all my medical history is in one place, making it simple to share with healthcare providers when needed. The security measures in place give me peace of mind.",
  },
  {
    name: "Priya Singh",
    role: "Business Executive",
    content:
      "As a busy professional, finding time to register for hospital visits has always been difficult. This platform made it incredibly easy to handle everything online. The process was simple and stress-free. I didn't have to worry about anything when I arrived at the hospital. The appointment scheduling system is flexible and accommodating to my packed schedule. The reminder system ensures I never miss an appointment.",
  },
  {
    name: "Vikram Patel",
    role: "First-time User",
    content:
      "I was initially hesitant to use an online platform for my hospital appointments, but this service exceeded my expectations. It was so easy to navigate, and I could complete the entire registration in minutes. The best part is that all my information was securely stored, and the hospital had everything they needed when I arrived. The customer support team was very helpful in guiding me through the process.",
  },
  {
    name: "Sanjana Rao",
    role: "Regular User",
    content:
      "The convenience of this platform has been a game-changer. I was able to complete my registration online, book an appointment, and even receive reminders about my upcoming visits. It has made accessing healthcare so much easier for me. The integration with the hospital systems means my information is always up-to-date and accurate. Regular notifications about upcoming appointments help me stay organized.",
  },
];

const Testimonial = () => {
  return (
    <div className="py-16 px-4 bg-gradient-to-b from-transparent to-teal-50/50 dark:to-transparent">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-teal-600 to-blue-600 dark:from-teal-300 dark:to-blue-400 bg-clip-text text-transparent mb-4">
          What Our Users Say
        </h2>
        <p className="text-xl text-center text-teal-600 dark:text-teal-300 mb-12 font-medium">
          Real experiences from our valued community
        </p>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {testimonials.map((testimonial, index) => (
              <CarouselItem
                key={index}
                className="pl-2 md:pl-4 sm:basis-1/2 lg:basis-1/3"
              >
                <Card className="h-[450px] border border-teal-100 dark:border-slate-700 bg-white dark:bg-slate-800/50 backdrop-blur-sm transition-all duration-500 hover:shadow-xl hover:shadow-teal-500/10 dark:hover:shadow-slate-700/30 hover:-translate-y-1">
                  <CardContent className="p-6 h-full flex flex-col">
                    <Quote className="w-8 h-8 text-teal-500 dark:text-teal-300 mb-4 flex-shrink-0" />
                    <CardHeader className="p-0 flex-grow flex flex-col">
                      <div className="flex-grow overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-teal-200 dark:scrollbar-thumb-slate-700 scrollbar-track-transparent">
                        <CardDescription className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                          {testimonial.content}
                        </CardDescription>
                      </div>
                      <div className="border-t border-teal-100 dark:border-slate-700 pt-4 mt-4 flex-shrink-0">
                        <CardTitle className="text-lg font-semibold text-teal-700 dark:text-teal-300 mb-1">
                          {testimonial.name}
                        </CardTitle>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {testimonial.role}
                        </p>
                      </div>
                    </CardHeader>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex -left-12 hover:bg-teal-50 dark:hover:bg-slate-800 border-teal-100 dark:border-slate-700" />
          <CarouselNext className="hidden md:flex -right-12 hover:bg-teal-50 dark:hover:bg-slate-800 border-teal-100 dark:border-slate-700" />
        </Carousel>
      </div>
    </div>
  );
};

export default Testimonial;
