import React from "react";
import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Quote, Star, CalendarDays } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar?: string;
  rating?: number;
  createdAt: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Rajiv Verma",
    role: "Frequent Traveler",
    content:
      "As a frequent traveler, I often need to visit hospitals in different cities. This platform has been a lifesaver. I could easily complete my registration online before arriving at the hospital.",
    avatar:
      "",
    rating: 5,
    createdAt: "2024-02-15",
  },
  {
    name: "Anita Sharma",
    role: "Regular Patient",
    content:
      "I was able to book an appointment for my check-up in just a few minutes. The process was smooth and efficient.",
    avatar:
      "",
    rating: 5,
    createdAt: "2024-02-14",
  },
  {
    name: "Rohan Mehta",
    role: "Tech Professional",
    content:
      "This platform made it easy for me to track my medical records and appointments. Everything is organized and accessible online.",
    avatar:
      "",
    rating: 4,
    createdAt: "2024-02-13",
  },
  {
    name: "Priya Singh",
    role: "Business Executive",
    content:
      "As a busy professional, finding time for hospital visits has always been challenging. This platform made it incredibly easy to handle everything online.",
    avatar:
      "",
    rating: 5,
    createdAt: "2024-02-12",
  },
];

const TestimonialCard = ({ testimonial, index }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.4,
        delay: index * 0.1,
        ease: "easeOut",
      }}
      whileHover={{
        scale: 1.02,
        transition: {
          duration: 0.2,
          ease: "easeInOut",
        },
      }}
      className="h-full relative perspective-1000"
    >
      <div className="rounded-xl h-full bg-white dark:bg-gray-900 shadow-lg hover:shadow-xl dark:shadow-primary/5 transition-all duration-300">
        {/* Main Content Area */}
        <div className="p-4 md:p-6 flex flex-col h-full">
          {/* Quote and Content */}
          <div className="mb-4 relative">
            <Quote className="absolute w-8 h-8 -left-1 -top-2 text-primary/10 dark:text-primary/5" />
            <p className="pt-4 text-sm md:text-base text-foreground/80 dark:text-foreground/70 leading-relaxed">
              {testimonial.content}
            </p>
          </div>

          {/* Card Footer */}
          <div className="mt-auto pt-4 border-t border-border/10 dark:border-border/5">
            <div className="flex items-start md:items-center gap-3 flex-col md:flex-row md:justify-between">
              {/* User Info */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10 ring-2 ring-primary/10 ring-offset-2 ring-offset-background">
                  <AvatarFallback className="bg-primary/5 text-primary">
                    {testimonial.name
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-foreground dark:text-foreground/90">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-muted-foreground dark:text-muted-foreground/80">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Rating and Date */}
              <div className="flex flex-col gap-1 items-start md:items-end w-full md:w-auto">
                <div className="flex gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-teal-500 dark:text-teal-400 fill-teal-500 dark:fill-teal-400"
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <CalendarDays className="w-3 h-3" />
                  {new Date(testimonial.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TestimonialCarousel = () => {
  return (
    <section className="w-full py-12 md:py-16 bg-transparent">
      <div className="container px-4 mx-auto">
        <div className="space-y-8 md:space-y-12 overflow-hidden">
          {/* Header */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <motion.h2
              className="text-4xl md:text-5xl pb-2 font-bold bg-gradient-to-r from-teal-600 to-cyan-500 dark:from-teal-400 dark:to-cyan-300 inline-block text-transparent bg-clip-text"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              What Our Users Say
            </motion.h2>
            <motion.p
              className="text-base md:text-lg text-teal-600 dark:text-teal-500"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              See how we're making healthcare management easier
            </motion.p>
          </div>

          {/* Carousel */}
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full "
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3"
                >
                  <TestimonialCard testimonial={testimonial} index={index} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="flex items-center justify-center gap-4 mt-6">
              <CarouselPrevious className="static translate-x-0 translate-y-0 hover:bg-primary hover:text-primary-foreground transition-colors" />
              <CarouselNext className="static translate-x-0 translate-y-0 hover:bg-primary hover:text-primary-foreground transition-colors" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
