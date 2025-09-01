import React from "react";

function Step3_Registration({ form, updateField }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-800">Registration Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">PAN</span>
          <input
            value={form.pan}
            onChange={(e) => updateField("pan", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">TAN</span>
          <input
            value={form.tan}
            onChange={(e) => updateField("tan", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">GSTIN</span>
          <input
            value={form.gstin}
            onChange={(e) => updateField("gstin", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">CIN</span>
          <input
            value={form.cin}
            onChange={(e) => updateField("cin", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">PF Registration Code</span>
          <input
            value={form.pfRegistration}
            onChange={(e) => updateField("pfRegistration", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">ESI Registration Code</span>
          <input
            value={form.esiRegistration}
            onChange={(e) => updateField("esiRegistration", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
      </div>
    </div>
  );
}

export default React.memo(Step3_Registration);
