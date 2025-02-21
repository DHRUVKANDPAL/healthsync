import React from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Heart,
  Bell,
  BarChart2,
  Users,
  Smartphone,
  Zap,
  Brain,
  Video,
  FileText,
  Headphones,
  Activity,
  AlertTriangle,
  Users2,
  ClipboardList,
  Sparkles,
  Check,
  Save,
  MessageSquare,
} from "lucide-react";

const pricingPlans = [
  {
    title: "Basic Healthsync",
    subtitle: "For Patients",
    price: "₹0",
    billing: "Forever Free",
    description: "Ideal for those beginning their health journey.",
    features: [
      {
        text: "Curo AI Chat (3/day)",
        subtext: "Engage with AI-powered chat for up to 3 sessions daily",
        icon: MessageSquare,
      },
      {
        text: "Essential Health Monitoring",
        subtext:
          "Track vital metrics like heart rate, steps, and sleep patterns",
        icon: Heart,
      },
      {
        text: "Doctor & Medication Reminders",
        subtext: "Never miss appointments or medication times",
        icon: Bell,
      },
      {
        text: "Introductory Analytics",
        subtext: "Visualize your basic health trends effortlessly",
        icon: BarChart2,
      },
      {
        text: "Community Support",
        subtext: "Access patient forums and discuss about self-help resources",
        icon: Users,
      },
    ],
    buttonText: "Get Started Free",
    highlight: false,
  },
  {
    title: "Healthsync Plus",
    subtitle: "Premium Plan",
    price: "₹299",
    billing: "per month",
    yearlyPrice: "₹2,999/year",
    description:
      "Upgrade for proactive health insights and personalized guidance.",
    features: [
      {
        text: "Includes Basic Features",
        subtext: "Access all tools from the free plan",
        icon: Check,
      },
      {
        text: "Enhanced Analytics",
        subtext: "Gain deeper insights with advanced reporting",
        icon: Zap,
      },
      {
        text: "Tailored Guidance with Curo AI",
        subtext: "Receive personalized recommendations powered by AI",
        icon: Brain,
      },
      {
        text: "Encrypted Medical Storage",
        subtext: "Securely manage your health records",
        icon: FileText,
      },
      {
        text: "Priority Support",
        subtext: "Get faster assistance via chat or email",
        icon: Headphones,
      },
    ],
    buttonText: "Upgrade to Plus",
    highlight: true,
  },
  {
    title: "Healthsync Pro",
    subtitle: "Chronic Care Management",
    price: "Custom",
    billing: "Tailored Pricing",
    description:
      "A comprehensive solution for chronic condition management with advanced features.",
    features: [
      {
        text: "All Plus Features",
        subtext: "Enjoy complete access to premium tools",
        icon: Sparkles,
      },
      {
        text: "Continuous Remote Monitoring",
        subtext: "Receive ongoing tracking for chronic conditions",
        icon: Activity,
      },
      {
        text: "Instant Health Alerts",
        subtext: "Real-time notifications for critical changes",
        icon: AlertTriangle,
      },
      {
        text: "Coordinated Care Network",
        subtext: "Seamlessly collaborate with your healthcare team",
        icon: Users2,
      },
      {
        text: "Chat Save & Unlimited Curo AI Chat",
        subtext:
          "Save your chat history and enjoy unlimited AI-powered interactions",
        icon: Save, // Assuming Save icon is available
      },
    ],
    buttonText: "Contact Sales",
    highlight: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
    },
  },
};

export default function PricingSection() {
  return (
    <section className="py-20 bg-transparent">
      <div className="container px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-2 text-base bg-white dark:bg-gray-800"
          >
            Choose Your Health Journey
          </Badge>
          <h2 className="text-5xl font-bold tracking-tight bg-gradient-to-r from-teal-800 to-teal-600 dark:from-gray-50 dark:to-teal-300 bg-clip-text text-transparent pb-6">
            Pricing Plans
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Select the perfect plan to support your healthcare needs and
            wellness goals
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center max-w-7xl mx-auto"
        >
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{
                y: -5,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              className={`h-full will-change-transform max-w-md ${
                index || "hidden lg:block"
              }`}
            >
              <Card
                className={`h-full relative bg-white dark:bg-slate-900 transform-gpu hover:scale-105 transition-all duration-500 ease-in-out
                ${
                  plan.highlight
                    ? "border-2 border-blue-500 dark:border-blue-400 shadow-xl dark:shadow-blue-500/20"
                    : "border border-gray-200 dark:border-gray-700"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-blue-600 to-blue-400 text-white border-0 px-4 py-1">
                      Recommended
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="mb-2">
                    <Badge variant="outline" className="text-xs font-normal">
                      {plan.subtitle}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">
                    {plan.title}
                  </CardTitle>
                  <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4 space-y-1">
                    <div className="text-3xl font-bold text-gray-900 dark:text-gray-50">
                      {plan.price}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {plan.billing}
                    </div>
                    {plan.yearlyPrice && (
                      <div className="text-xs text-blue-600 dark:text-blue-400">
                        Save with yearly: {plan.yearlyPrice}
                      </div>
                    )}
                  </div>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="flex gap-3"
                      >
                        <feature.icon className="w-4 h-4 text-blue-500 dark:text-blue-400 flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-gray-900 dark:text-gray-100 font-medium text-sm">
                            {feature.text}
                          </div>
                          <div className="text-[0.5rem] text-gray-600 dark:text-gray-400">
                            {feature.subtext}
                          </div>
                        </div>
                      </motion.li>
                    ))}
                  </ul>

                </CardContent>
                <CardFooter>
                  <Button
                    className={`w-full h-12 transition-colors duration-200
                      ${
                        plan.highlight
                          ? "bg-gradient-to-r from-blue-600 to-blue-400 hover:from-blue-700 hover:to-blue-500 shadow-lg"
                          : "bg-gray-900 hover:bg-gray-800 dark:bg-transparent dark:ring-2 dark:ring-blue-500 dark:text-white dark:hover:bg-gray-600"
                      }`}
                  >
                    {plan.buttonText}
                  </Button>

                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
