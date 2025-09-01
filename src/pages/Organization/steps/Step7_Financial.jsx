import React from "react";

function Step7_Financial({ form, updateField }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-800">Financial Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Financial Year Start Date *</span>
          <input
            type="date"
            value={form.financialYearStart}
            onChange={(e) => updateField("financialYearStart", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Payroll Frequency</span>
          <select
            value={form.payrollFrequency}
            onChange={(e) => updateField("payrollFrequency", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 outline-none transition duration-150"
          >
            <option>Monthly</option>
            <option>Bi-weekly</option>
            <option>Weekly</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default React.memo(Step7_Financial);
