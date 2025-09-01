import React from "react";

function Step2_ContactDetails({ form, updateField }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-800">Contact Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Address</span>
          <input
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">City</span>
          <input
            value={form.city}
            onChange={(e) => updateField("city", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">State</span>
          <input
            value={form.state}
            onChange={(e) => updateField("state", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Country</span>
          <input
            value={form.country}
            onChange={(e) => updateField("country", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Pincode</span>
          <input
            value={form.pincode}
            onChange={(e) => updateField("pincode", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col">
          <span className="text-sm text-indigo-700">Phone Number</span>
          <input
            value={form.phoneNumber}
            onChange={(e) => updateField("phoneNumber", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
        <label className="flex flex-col md:col-span-2">
          <span className="text-sm text-indigo-700">Email Address</span>
          <input
            value={form.emailAddress}
            onChange={(e) => updateField("emailAddress", e.target.value)}
            className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
          />
        </label>
      </div>
    </div>
  );
}

export default React.memo(Step2_ContactDetails);
