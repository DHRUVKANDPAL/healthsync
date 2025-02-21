"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, MessageSquare, Sparkles, Star, Zap } from "lucide-react";

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

const MotionCard = motion(Card);

export default function ProfessionalPricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
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
            Select the perfect plan to elevate your productivity and streamline
            your workflow
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
            Join thousands of satisfied customers and take your productivity to
            new heights
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
