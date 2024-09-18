import React from "react";
import { Activity, FileText, Brain, DollarSign, PhoneCall } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import AppointmentList from "./AppointmentList";
import HealthMetrics from "./HealthMetrices";
import HealthRecords from "./HealthRecords";
import MentalWellbeing from "./MentalWelbeing";
import HealthInsights from "./HealthInsights";
import BillingInsurance from "./BillingInsuarance";
import EmergencyContacts from "./EmergencyContacts";

const Dashboard = ({ samplePatientData = {} }) => {
  const {
    healthRecords = [],
    healthMetrics = {},
    appointments = [],
    mentalWellbeing = {},
    healthInsights = {},
    billingInsurance = {},
    emergencyContacts = [],
  }: any = samplePatientData;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Patient Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Health Metrics */}
        <div className="col-span-1 md:col-span-2 lg:col-span-3">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Activity className="mr-2 text-blue-500" size={24} />
            Health Metrics
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Blood Pressure
                </p>
                <p className="text-lg font-semibold">
                  {healthMetrics.bloodPressure}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Heart Rate
                </p>
                <p className="text-lg font-semibold">
                  {healthMetrics.heartRate} bpm
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Weight
                </p>
                <p className="text-lg font-semibold">
                  {healthMetrics.weight} kg
                </p>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={healthMetrics.progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="weight"
                  stroke="#8884d8"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="bloodPressure"
                  stroke="#82ca9d"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Appointments */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 text-green-500" size={24} />
            Upcoming Appointments
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <AppointmentList appointments={appointments} />
          </div>
        </div>

        {/* Health Insights */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="mr-2 text-purple-500" size={24} />
            Health Insights
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <HealthInsights insights={healthInsights} />
          </div>
        </div>

        {/* Mental Wellbeing */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Brain className="mr-2 text-indigo-500" size={24} />
            Mental Wellbeing
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <MentalWellbeing wellbeing={mentalWellbeing} />
          </div>
        </div>

        {/* Health Records */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <FileText className="mr-2 text-yellow-500" size={24} />
            Health Records
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <HealthRecords records={healthRecords} />
          </div>
        </div>

        {/* Billing & Insurance */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 text-green-500" size={24} />
            Billing & Insurance
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <BillingInsurance billing={billingInsurance} />
          </div>
        </div>

        {/* Emergency Contacts */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <PhoneCall className="mr-2 text-red-500" size={24} />
            Emergency Contacts
          </h2>
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
            <EmergencyContacts contacts={emergencyContacts} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
