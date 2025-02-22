"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Check,
  MessageSquare,
  Sparkles,
  Star,
  Zap,
  X,
  BadgeCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

import { Clock, Gift } from "lucide-react";
import Header from "@/components/Header";
import Header2 from "./header2";

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate: any = new Date("2025-02-25T17:00:00Z");

    const calculateTimeLeft = () => {
      const now: any = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        setIsVisible(false);
        return null;
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };

    const timer = setInterval(() => {
      const timeRemaining = calculateTimeLeft();
      if (timeRemaining) {
        setTimeLeft(timeRemaining);
      } else {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: any) => String(num).padStart(2, "0");

  const CountdownUnit = ({ value, label }: any) => (
    <div className="flex flex-col items-center">
      <div className="bg-white/10 rounded-lg px-3 py-2 backdrop-blur-sm">
        <span className="text-xl md:text-2xl font-bold text-white tabular-nums">
          {formatNumber(value)}
        </span>
      </div>
      <span className="text-[10px] md:text-xs text-white/80 mt-1">{label}</span>
    </div>
  );

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
          className="fixed top-0 left-0 right-0 z-50"
        >
          <div className="relative overflow-hidden">
            {/* Enhanced gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 animate-gradient bg-[length:200%_100%]" />
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm" />

            {/* Simplified background effect */}
            <div className="absolute inset-0">
              <div className="absolute top-0 left-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl transform -translate-y-16" />
              <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-white/5 rounded-full blur-xl transform translate-y-16" />
            </div>

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative py-6">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
                  {/* Left section */}
                  <div className="flex items-center justify-center space-x-6 w-full md:w-auto">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="hidden sm:flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-white/20 to-white/5 shadow-lg"
                    >
                      <Gift className="h-8 w-8 text-white" />
                    </motion.div>
                    <div className="text-center sm:text-left">
                      <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mb-2">
                        <h3 className="text-xl sm:text-2xl font-bold text-white ">
                          Limited Time Offer
                        </h3>
                        <motion.span
                          whileHover={{ scale: 1.05 }}
                          className="bg-white/20 text-white text-xs px-3 py-1 rounded-full flex items-center whitespace-nowrap"
                        >
                          <BadgeCheck className="w-4 h-4 mr-1" />
                          Premium Deal
                        </motion.span>
                      </div>
                      <p className="text-white/80 text-sm sm:text-base">
                        Book your consultation before the offer expires & save
                        $150
                      </p>
                    </div>
                  </div>

                  {/* Center section with enhanced countdown */}
                  <div className="xl:flex items-center justify-center w-full md:w-auto hidden ">
                    <div className="bg-white/10 rounded-xl p-4 backdrop-blur-md shadow-xl">
                      <div className="flex items-center space-x-3">
                        <Clock className="h-5 w-5 text-white animate-pulse" />
                        <div className="flex space-x-3">
                          <CountdownUnit value={timeLeft.days} label="days" />
                          <span className="text-xl font-bold text-white self-center mb-4">
                            :
                          </span>
                          <CountdownUnit value={timeLeft.hours} label="hours" />
                          <span className="text-xl font-bold text-white self-center mb-4">
                            :
                          </span>
                          <CountdownUnit
                            value={timeLeft.minutes}
                            label="mins"
                          />
                          <span className="text-xl font-bold text-white self-center mb-4">
                            :
                          </span>
                          <CountdownUnit
                            value={timeLeft.seconds}
                            label="secs"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right section */}
                  <div className="md:flex items-center justify-center space-x-4 w-full md:w-auto hidden ">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        size="lg"
                        className=" bg-white text-teal-600 hover:bg-gray-50 transition-all shadow-lg hover:shadow-xl group relative overflow-hidden"
                      >
                        <span className="relative z-10">Book Your Slot</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 relative z-10" />
                        <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-blue-50 transform transition-transform group-hover:scale-x-100 scale-x-0 origin-left" />
                      </Button>
                    </motion.div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsVisible(false)}
                      className="p-2 text-white hover:text-gray-200 transition-colors rounded-full hover:bg-white/10"
                      aria-label="Close banner"
                    >
                      <X className="h-6 w-6" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced bottom border */}
            <div className="h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
          </div>

          <style jsx>{`
            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }
            .animate-gradient {
              animation: gradient 15s linear infinite;
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MotionCard = motion(Card);

export default function ProfessionalPricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <>
      <Header2 />
      <div className=" bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 py-16">
          <motion.header
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
              Choose Your Plan
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Select the perfect plan to elevate your productivity and
              streamline your workflow
            </p>
            <div className="flex items-center justify-center space-x-4">
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Monthly
              </span>
              <Switch
                checked={isYearly}
                onCheckedChange={setIsYearly}
                className="data-[state=checked]:bg-blue-600"
              />
              <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                Yearly
              </span>
              <Badge variant="secondary" className="ml-2">
                Save 20%
              </Badge>
            </div>
          </motion.header>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
            {pricingPlans.map((plan, index) => (
              <MotionCard
                key={plan.name}
                className={`flex flex-col transition-all duration-200 ${
                  plan.name === "Pro"
                    ? "border-blue-500 dark:border-blue-400"
                    : ""
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {plan.icon}
                    {plan.name}
                    {plan.name === "Pro" && (
                      <Badge variant="secondary">Most Popular</Badge>
                    )}
                  </CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-3xl font-bold mb-4">
                    {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </p>
                  <ul className="space-y-2">
                    {plan.features.map((feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-sm text-gray-600 dark:text-gray-300"
                      >
                        <Check className="mr-2 h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full ${
                      plan.name === "Pro" ? "bg-blue-600 hover:bg-blue-700" : ""
                    }`}
                    variant={plan.name === "Pro" ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </MotionCard>
            ))}
          </div>

          <Tabs defaultValue="features" className="mb-16">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
            </TabsList>
            <TabsContent value="features">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Comparison</CardTitle>
                  <CardDescription>See how our plans compare</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2 font-medium">Feature</th>
                          <th className="text-center p-2 font-medium">Basic</th>
                          <th className="text-center p-2 font-medium">Pro</th>
                          <th className="text-center p-2 font-medium">
                            Enterprise
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {featureComparison.map((feature, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2">{feature.name}</td>
                            <td className="text-center p-2">{feature.basic}</td>
                            <td className="text-center p-2">{feature.pro}</td>
                            <td className="text-center p-2">
                              {feature.enterprise}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="testimonials">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {testimonial.name}
                      </CardTitle>
                      <CardDescription>{testimonial.company}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {testimonial.quote}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 text-yellow-400 fill-current"
                          />
                        ))}
                      </div>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          <section className="mb-16 max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-center mb-8">
              Frequently Asked Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>

          <motion.section
            className="text-center max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
              Join thousands of satisfied customers and take your productivity
              to new heights
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Your Free Trial
            </Button>
          </motion.section>
        </div>
      </div>
    </>
  );
}

const pricingPlans = [
  {
    name: "Basic Healthsync",
    icon: <MessageSquare className="w-5 h-5 text-blue-500" />,
    description: "For Patients - Essential free health tracking.",
    monthlyPrice: "₹0",
    yearlyPrice: "₹0",
    features: [
      "Curo AI Chat (3/day) - AI-powered health chat support",
      "Health Monitoring - Track heart rate, steps, and sleep",
      "Doctor & Medication Reminders - Stay on top of appointments",
      "Basic Analytics - View simple health trends",
      "Community Support - Join patient forums & discussions",
    ],
  },
  {
    name: "Healthsync Plus",
    icon: <Zap className="w-5 h-5 text-blue-500" />,
    description: "Premium Plan - Advanced health insights.",
    monthlyPrice: "₹299",
    yearlyPrice: "₹2,999/year",
    features: [
      "Includes Basic Features - Everything in the free plan",
      "Enhanced Analytics - Deeper insights & health reports",
      "AI-Powered Guidance - Personalized health recommendations",
      "Secure Medical Storage - Encrypted health records",
      "Priority Support - Faster assistance via chat or email",
    ],
  },
  {
    name: "Healthsync Pro",
    icon: <Sparkles className="w-5 h-5 text-blue-500" />,
    description: "Chronic Care - Comprehensive health management.",
    monthlyPrice: "Custom",
    yearlyPrice: "Tailored Pricing",
    features: [
      "All Plus Features - Full access to premium tools",
      "Remote Monitoring - Continuous tracking for chronic care",
      "Instant Health Alerts - Real-time critical health notifications",
      "Coordinated Care - Seamless collaboration with doctors",
      "Unlimited AI Chat - Save history & get unlimited sessions",
    ],
  },
];

const featureComparison = [
  {
    name: "Curo AI Chat",
    basic: "3/day",
    pro: "Unlimited",
    enterprise: "Unlimited + Save History",
  },
  {
    name: "Health Monitoring",
    basic: "Basic Metrics",
    pro: "Advanced Analytics",
    enterprise: "Continuous Monitoring",
  },
  {
    name: "Doctor & Medication Reminders",
    basic: "✅",
    pro: "✅",
    enterprise: "✅",
  },
  {
    name: "Medical Records Storage",
    basic: "❌",
    pro: "Encrypted",
    enterprise: "Encrypted + Chronic Care Reports",
  },
  { name: "Instant Health Alerts", basic: "❌", pro: "❌", enterprise: "✅" },
  { name: "Coordinated Care", basic: "❌", pro: "❌", enterprise: "✅" },
  { name: "Community Support", basic: "✅", pro: "✅", enterprise: "✅" },
  {
    name: "Priority Support",
    basic: "❌",
    pro: "✅",
    enterprise: "24/7 Assistance",
  },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    company: "Tech Innovators Inc.",
    quote:
      "This platform has revolutionized our workflow. The Pro plan offers incredible value for our growing team.",
  },
  {
    name: "Michael Chen",
    company: "Global Solutions Ltd.",
    quote:
      "The Enterprise plan's customization options have been a game-changer for our large-scale operations.",
  },
  {
    name: "Emily Rodriguez",
    company: "Startup Ventures",
    quote:
      "Even the Basic plan packs a punch! It's perfect for our small team to collaborate efficiently.",
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, you can cancel your subscription at any time without any penalties. Your service will continue until the end of your current billing period.",
  },
  {
    question: "Is there a free trial available?",
    answer:
      "No. But we offer a generous free tier to help you get started and evaluate our service.",
  },
  {
    question: "Do you offer discounts for non-profits?",
    answer:
      "Yes, we offer special discounts for non-profit organizations. Please contact our sales team with proof of your non-profit status, and we'll be happy to discuss our discount options.",
  },
  {
    question: "How secure is my data?",
    answer:
      "We take data security very seriously. We use industry-standard encryption, regular security audits, and strict access controls to ensure your data is always protected. Our systems are compliant with GDPR, CCPA, and other major data protection regulations.",
  },
];
