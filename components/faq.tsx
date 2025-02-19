import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

const faqItems = [
  {
    id: "item-1",
    question: "How do I register as a patient on the platform?",
    answer:
      "To register as a patient, you need to fill out an online form with your personal details, medical history, and emergency contacts. Once submitted, your information will be securely stored for easy access to healthcare services.",
  },
  {
    id: "item-2",
    question:
      "What is the process for registering a hospital or doctor on the platform?",
    answer:
      "Hospitals and doctors can register by filling out the online application form with required details such as license number, contact information, and specialization. Verification steps will follow to ensure authenticity.",
  },
  {
    id: "item-3",
    question: "What should I do if I need immediate medical attention?",
    answer:
      "If you require immediate medical attention, use the platform to request an ambulance. The system will route the ambulance to the nearest hospital with the necessary facilities.",
  },
  {
    id: "item-4",
    question: "How can I book an appointment with a specialist?",
    answer:
      "You can search for specialists through the platform, compare their profiles, and book an appointment directly. You'll receive confirmation and reminders about your appointment.",
  },
  {
    id: "item-5",
    question: "What documents are needed for hospital registration?",
    answer:
      "Required documents include a government-issued license, proof of accreditation, facility details, and contact information. These documents are used for verification purposes.",
  },
  {
    id: "item-6",
    question:
      "What support is available if I encounter issues during registration?",
    answer:
      "If you face issues during registration, contact our support team through the helpdesk. We provide assistance to resolve any registration or profile management problems.",
  },
];

const Faq = () => {
  return (
    <section className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-12">
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-cyan-400 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-sm sm:text-base">
            Find answers to common questions about our healthcare platform.
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="border-b dark:border-gray-700 last:border-none"
            >
              <AccordionTrigger className="text-left py-6 text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 hover:no-underline">
                <span className="pr-8">{item.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm sm:text-base pb-6">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faq;
