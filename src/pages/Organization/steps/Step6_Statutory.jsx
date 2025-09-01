import React from "react";

function Step6_Statutory({ form, updateField }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-800">Statutory Settings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.pfApplicability}
            onChange={(e) => updateField("pfApplicability", e.target.checked)}
          />
          <span className="text-indigo-700">PF Applicability</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.esiApplicability}
            onChange={(e) => updateField("esiApplicability", e.target.checked)}
          />
          <span className="text-indigo-700">ESI Applicability</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.professionalTax}
            onChange={(e) => updateField("professionalTax", e.target.checked)}
          />
          <span className="text-indigo-700">Professional Tax Applicability</span>
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">TDS Configuration</span>
          <input
            value={form.tdsConfiguration}
            onChange={(e) => updateField("tdsConfiguration", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
            placeholder="e.g. 10% on ... or custom rules"
          />
        </label>
      </div>
    </div>
  );
}

export default React.memo(Step6_Statutory);
