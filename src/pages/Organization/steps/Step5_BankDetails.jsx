import React from "react";

function Step5_BankDetails({ form, updateField }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-800">Bank Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Bank Name</span>
          <input
            value={form.bankName}
            onChange={(e) => updateField("bankName", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Account Number</span>
          <input
            value={form.accountNumber}
            onChange={(e) => updateField("accountNumber", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">IFSC Code</span>
          <input
            value={form.ifscCode}
            onChange={(e) => updateField("ifscCode", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Branch Name</span>
          <input
            value={form.bankBranchName}
            onChange={(e) => updateField("bankBranchName", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
      </div>
    </div>
  );
}

export default React.memo(Step5_BankDetails);
