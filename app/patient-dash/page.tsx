'use client';

import React, { useState } from 'react';
import { deleteAllPatients } from '../patient-auth/auth.actions'; // Adjust the path
import { toast } from 'sonner';

export default function PatientDashboard() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event:any) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await deleteAllPatients();

      if (response.success) {
        toast.success('All patients deleted successfully!');
      } else {
        toast.error(response.message || 'No patients to delete');
      }
    } catch (error) {
      toast.error('An error occurred during deletion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Patient Dashboard</h1>
      
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className={`bg-red-500 text-white cursor-pointer p-4 rounded ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={loading}
        >
          {loading ? 'Deleting...' : 'Delete All Patients'}
        </button>
      </form>
    </div>
  );
}
