import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
    <section className="faq-section my-8">
      <h2 className="text-2xl font-bold text-center mb-6 text-teal-900 dark:text-teal-100 transition-colors duration-300 mt-20">
        Frequently Asked Questions
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqItems.map((item) => (
          <AccordionItem
            key={item.id}
            value={item.id}
            className="border-b border-teal-200 dark:border-slate-700"
          >
            <AccordionTrigger className="text-teal-800 dark:text-teal-200 hover:text-teal-600 dark:hover:text-teal-300 transition-colors duration-300">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-slate-700 dark:text-slate-300 transition-colors duration-300">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
