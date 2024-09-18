import React from "react";
import { User, Phone } from "lucide-react";

const EmergencyContacts = ({ contacts }: any) => {
  return (
    <div className="space-y-4">
      {contacts.map(({ contact, index }: any) => (
        <div key={index} className="flex items-start space-x-2">
          <User className="text-blue-500 mt-1" size={20} />
          <div>
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-sm text-gray-600">{contact.relationship}</p>
            <p className="text-sm flex items-center">
              <Phone className="mr-1" size={14} /> {contact.phone}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmergencyContacts;
