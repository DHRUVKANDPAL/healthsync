import React from "react";
import Image from "next/image";

const Profile = ({ userData }: any) => {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-6">
      <div className="flex items-center space-x-4 mb-6">
        <Image
          src={userData.imageUrl || "/default-avatar.png"}
          alt={userData.name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 dark:text-white">
            {userData.name}
          </h2>
          <p className="text-slate-600 dark:text-slate-300">{userData.email}</p>
          <p className="text-slate-600 dark:text-slate-300">
            {userData.contactno}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white">
            Personal Information
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Gender: {userData.gender}
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Date of Birth: {userData.dob}
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Blood Group: {userData.bloodgroup}
          </p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white">
            Contact Information
          </h3>
          <p className="text-slate-600 dark:text-slate-300">
            Address: {userData.address}
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Emergency Contact: {userData.emergencycontact}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
