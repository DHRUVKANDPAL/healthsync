import React from "react";

const Vision = () => {
  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2">
            <h2 className="text-4xl font-bold text-blue-900 mb-6">
              Our Vision
            </h2>
            <p className="text-gray-700 mb-6">
              At HealthSync, we envision a future where healthcare is seamlessly
              integrated, accessible, and patient-centric. Our mission is to
              leverage technology to bridge the gaps in healthcare delivery,
              ensuring that every individual has access to quality medical
              services and information at their fingertips.
            </p>
            <p className="text-gray-700 mb-6">
              We strive to create a connected healthcare ecosystem where
              patients, doctors, and healthcare providers can collaborate
              effortlessly. By streamlining processes, from appointment booking
              to medical record management, we aim to enhance the overall
              healthcare experience for everyone involved.
            </p>
            <p className="text-gray-700 mb-6">
              Our commitment extends beyond mere convenience. We're dedicated to
              empowering individuals to take charge of their health through
              informed decision-making and easy access to their medical
              information. We believe that by doing so, we can contribute to
              better health outcomes and a more efficient healthcare system.
            </p>
            <div className="mt-8">
              <a
                href="#"
                className="bg-teal-500 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-600 transition duration-300"
              >
                Learn More
              </a>
            </div>
          </div>
          <div className="lg:w-1/2 lg:block sm:hidden ">
            <div className="bg-gray-200 rounded-lg overflow-hidden shadow-lg">
              {/* Placeholder for image */}
              <div className="w-full">
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <img
                    src="https://i.imghippo.com/files/GqGSf1724064367.jpg"
                    alt="Our Vision for Healthcare"
                    className=""
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Vision;
