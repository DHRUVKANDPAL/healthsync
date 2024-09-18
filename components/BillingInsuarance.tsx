import React from "react";
import { DollarSign, CreditCard, FileText } from "lucide-react";

const BillingInsurance = ({ billing = {} }: any) => {
  // Destructure with default values
  const {
    totalDue = 0,
    nextPayment = 0,
    nextPaymentDue = "N/A",
    insurance = {},
    recentTransactions = [],
  } = billing;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold flex items-center">
          <DollarSign className="mr-2" size={20} /> Billing Summary
        </h3>
        <p>Total Due: ${totalDue}</p>
        <p>
          Next Payment: ${nextPayment} (Due: {nextPaymentDue})
        </p>
      </div>
      <div>
        <h3 className="font-semibold flex items-center">
          <CreditCard className="mr-2" size={20} /> Insurance Information
        </h3>
        {/* Check if insurance is not empty and has required fields */}
        <p>Provider: {insurance.provider || "N/A"}</p>
        <p>Policy Number: {insurance.policyNumber || "N/A"}</p>
        <p>Coverage: {insurance.coverage || "N/A"}</p>
      </div>
      <div>
        <h3 className="font-semibold flex items-center">
          <FileText className="mr-2" size={20} /> Recent Transactions
        </h3>
        <ul className="list-disc list-inside">
          {recentTransactions.length > 0 ? (
            recentTransactions.map(({ transaction, index }: any) => (
              <li key={index}>
                {transaction.date}: ${transaction.amount} -{" "}
                {transaction.description}
              </li>
            ))
          ) : (
            <li>No recent transactions available.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BillingInsurance;
