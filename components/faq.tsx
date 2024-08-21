import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const Faq = () => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            How do I register as a patient on the platform?
          </AccordionTrigger>
          <AccordionContent>
            To register as a patient, you need to fill out an online form with
            your personal details, medical history, and emergency contacts. Once
            submitted, your information will be securely stored for easy access
            to healthcare services.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>
            What is the process for registering a hospital or doctor on the
            platform?
          </AccordionTrigger>
          <AccordionContent>
            Hospitals and doctors can register by filling out the online
            application form with required details such as license number,
            contact information, and specialization. Verification steps will
            follow to ensure authenticity.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>
            What should I do if I need immediate medical attention?
          </AccordionTrigger>
          <AccordionContent>
            If you require immediate medical attention, use the platform to
            request an ambulance. The system will route the ambulance to the
            nearest hospital with the necessary facilities.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>
            How can I book an appointment with a specialist?
          </AccordionTrigger>
          <AccordionContent>
            You can search for specialists through the platform, compare their
            profiles, and book an appointment directly. You&apos;ll receive
            confirmation and reminders about your appointment.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>
            What documents are needed for hospital registration?
          </AccordionTrigger>
          <AccordionContent>
            Required documents include a government-issued license, proof of
            accreditation, facility details, and contact information. These
            documents are used for verification purposes.
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-6">
          <AccordionTrigger>
            What support is available if I encounter issues during registration?
          </AccordionTrigger>
          <AccordionContent>
            If you face issues during registration, contact our support team
            through the helpdesk. We provide assistance to resolve any
            registration or profile management problems.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Faq;
