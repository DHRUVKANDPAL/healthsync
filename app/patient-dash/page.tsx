'use client';

import Testimonial from '@/components/Testimonial';
import React, { useState } from 'react';
// import { deleteAllPatients } from '../patient-auth/auth.actions'; // Adjust the path
import { toast } from 'sonner';

export default function PatientDashboard() {
  const [loading, setLoading] = useState(false);


  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Patient Dashboard</h1>
      <div className='w-5/6  mx-auto'><Testimonial></Testimonial></div>
    </div>
  );
}
