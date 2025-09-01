import React from "react";

function Step1_BasicInfo({ form, updateField }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-800">Basic Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Company Name *</span>
          <input
            type="text"
            value={form.companyName}
            onChange={(e) => updateField("companyName", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
            placeholder="e.g. Levivaan Pvt Ltd"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Legal Name *</span>
          <input
            value={form.legalName}
            onChange={(e) => updateField("legalName", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
            placeholder="Legal registered name"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Organisation Type</span>

         <select value={form.organisationType} onChange={(e)=>updateField("organisationType", e.target.value)}
              className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 outline-none transition duration-150">
              <option>Private Ltd</option>
              <option>LLP</option>
              <option>Proprietorship</option>
              <option>Others</option>
            </select>

        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Industry Sector</span>
          <input
            value={form.industrySector}
            onChange={(e) => updateField("industrySector", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
            placeholder="e.g. IT, Manufacturing"
          />
        </label>
      </div>
    </div>
  );
}

export default React.memo(Step1_BasicInfo);


 