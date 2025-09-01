import React from "react";

function Step4_Branches({ branches, addBranch, removeBranch, updateNestedBranch }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-blue-600">Branches / Locations</h2>
        <button
          type="button"
          onClick={addBranch}
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
        >
          + Add Branch
        </button>
      </div>

      {branches.length === 0 && (
        <div className="p-4 text-red-600 border rounded">
          No branches added yet. Click <strong>+ Add Branch</strong> to add.
        </div>
      )}

      <div className="space-y-3">
        {branches.map((b, idx) => (
          <div
            key={b.id}
            className="p-3 border rounded grid grid-cols-1 md:grid-cols-4 gap-2 items-end bg-indigo-50"
          >
            <label className="flex flex-col">
              <span className="text-sm text-indigo-700">Branch Name</span>
              <input
                value={b.branchName}
                onChange={(e) => updateNestedBranch(idx, "branchName", e.target.value)}
                className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-indigo-700">Address</span>
              <input
                value={b.address}
                onChange={(e) => updateNestedBranch(idx, "address", e.target.value)}
                className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
              />
            </label>
            <label className="flex flex-col">
              <span className="text-sm text-indigo-700">Contact Number</span>
              <input
                value={b.contactNumber}
                onChange={(e) => updateNestedBranch(idx, "contactNumber", e.target.value)}
                className="rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150"
              />
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => removeBranch(idx)}
                className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Step4_Branches);
