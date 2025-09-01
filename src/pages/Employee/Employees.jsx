import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useToast } from "../../components/Toast";
import ConfirmModal from "../../components/ConfirmModal";

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const { show } = useToast();

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("employees") || "[]");
      setEmployees(Array.isArray(data) ? data : []);
    } catch {
      setEmployees([]);
    }
  }, []);

  const [confirmId, setConfirmId] = useState(null);

  const confirmDelete = useCallback((id) => setConfirmId(id), []);
  const cancelDelete = useCallback(() => setConfirmId(null), []);

  const deleteEmployee = useCallback(() => {
    if (!confirmId) return;
    try {
      const next = employees.filter((e) => e.id !== confirmId);
      localStorage.setItem("employees", JSON.stringify(next));
      setEmployees(next);
      show("Employee deleted", "success");
    } catch (err) {
      console.error("Failed to delete employee", err);
      show("Failed to delete employee", "error");
    } finally {
      setConfirmId(null);
    }
  }, [confirmId, employees, show]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-indigo-900">Employees</h1>
        <Link
          to="/employees/add"
          className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
        >
          + Add Employee
        </Link>
      </div>

      {employees.length === 0 ? (
        <div className="border border-indigo-200 rounded p-4 bg-white text-indigo-700">
          No employees yet. Click "+ Add Employee" to create one.
        </div>
      ) : (
        <div className="border border-indigo-200 rounded p-4 bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-indigo-700">
                  <th className="text-left px-3 py-2">Name</th>
                  <th className="text-left px-3 py-2">Code</th>
                  <th className="text-left px-3 py-2">Department</th>
                  <th className="text-left px-3 py-2">Designation</th>
                  <th className="text-left px-3 py-2">DOJ</th>
                  <th className="text-left px-3 py-2">Manager</th>
                  <th className="text-right px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((e) => (
                  <tr
                    key={e.id}
                    className="border-t border-indigo-100 text-black"
                  >
                    <td className="px-3 py-2 font-medium">
                      {e.fullName || "-"}
                    </td>
                    <td className="px-3 py-2">{e.employeeCode || "-"}</td>
                    <td className="px-3 py-2">{e.department || "-"}</td>
                    <td className="px-3 py-2">{e.designation || "-"}</td>
                    <td className="px-3 py-2">{e.doj || "-"}</td>
                    <td className="px-3 py-2">{e.reportingManager || "-"}</td>
                    <td className="px-3 py-2 text-right">
                      <button
                        onClick={() => confirmDelete(e.id)}
                        className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700 transition"
                        aria-label={`Delete ${e.fullName || "employee"}`}
                        title="Delete"
                      >
                        {/* Trash icon (SVG) */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-1 1v1H5.5a1 1 0 100 2H6v12a3 3 0 003 3h6a3 3 0 003-3V6h.5a1 1 0 100-2H16V3a1 1 0 00-1-1H9zm2 4a1 1 0 112 0v10a1 1 0 11-2 0V6zm-3 0a1 1 0 112 0v10a1 1 0 11-2 0V6zm8 0a1 1 0 112 0v10a1 1 0 11-2 0V6z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {confirmId && (
        <ConfirmModal
          open={!!confirmId}
          title="Delete employee?"
          description="This action cannot be undone. The employee will be permanently removed."
          confirmText="Delete"
          cancelText="Cancel"
          onConfirm={deleteEmployee}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
}
