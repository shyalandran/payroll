import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../components/Toast";

// Utility to generate a simple employee code (e.g., EMP-20250901-1234)
function useAutoEmployeeCode() {
  return useMemo(() => {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const rand = Math.floor(Math.random() * 9000 + 1000);
    return `EMP-${y}${m}${d}-${rand}`;
  }, []);
}

// Hoisted components to keep identity stable between renders
const Section = React.memo(function Section({ title, children }) {
  return (
    <div className="border border-indigo-200 rounded p-4 bg-white">
      <h3 className="text-lg font-semibold text-indigo-900 mb-3">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{children}</div>
    </div>
  );
});

const Label = React.memo(function Label({ children }) {
  return (
    <span className="text-xs uppercase tracking-wide text-indigo-900 mb-1">
      {children}
    </span>
  );
});

const fieldBase =
  "rounded border border-indigo-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 outline-none transition duration-150";

export default function AddEmployee() {
  const navigate = useNavigate();
  const { show } = useToast();
  const autoCode = useAutoEmployeeCode();

  const [form, setForm] = useState({
    // 1. Personal Information
    fullName: "",
    gender: "",
    dob: "",
    maritalStatus: "",
    bloodGroup: "",

    // 2. Contact Information
    mobile: "",
    email: "",
    permanentAddress: "",
    currentAddress: "",

    // 3. Identification Details
    aadhaar: "",
    pan: "",
    passport: "",
    voterId: "",

    // 4. Employment Details
    employeeCode: autoCode,
    doj: "",
    department: "",
    designation: "",

    // 5. Work Location
    workLocation: "",
    reportingManager: "",

    // 6. Salary Structure
    salaryTemplate: "",
    customSalaryEnabled: false,
    customComponents: [{ name: "", amount: "" }],

    // 7. Bank Details
    bankName: "",
    accountNumber: "",
    ifsc: "",
    bankBranch: "",

    // 8. Statutory Information
    pfUAN: "",
    esiNumber: "",
    ptApplicable: "No",
    tdsStatus: "Not Declared",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function updateCustomComponent(index, key, value) {
    setForm((prev) => {
      const list = [...prev.customComponents];
      list[index] = { ...list[index], [key]: value };
      return { ...prev, customComponents: list };
    });
  }

  function addCustomComponent() {
    setForm((prev) => ({
      ...prev,
      customComponents: [...prev.customComponents, { name: "", amount: "" }],
    }));
  }

  function removeCustomComponent(index) {
    setForm((prev) => ({
      ...prev,
      customComponents: prev.customComponents.filter((_, i) => i !== index),
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Basic required fields validation similar to Organization page
    const required = [
      form.fullName,
      form.gender,
      form.dob,
      form.mobile,
      form.email,
      form.department,
      form.designation,
      form.doj,
    ];
    const missing = required.some((v) => !String(v || "").trim());
    if (missing) {
      show("Please fill all required fields before saving.", "warning");
      return;
    }

    try {
      const existing = JSON.parse(localStorage.getItem("employees") || "[]");
      const payload = { ...form, id: crypto.randomUUID?.() || `${Date.now()}` };
      localStorage.setItem("employees", JSON.stringify([payload, ...existing]));
      show("Employee saved successfully", "success");
      navigate("/employees");
    } catch (err) {
      console.error("Failed to save employee", err);
      show("Failed to save employee", "error");
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-indigo-900">Add Employee</h1>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-4 py-2 rounded bg-indigo-800 text-white hover:bg-indigo-700 transition"
          >
            Back
          </button>
        </div>
      </div>

      <form
        id="add-employee-form"
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* 1. Personal Information */}
        <Section title="Personal Information">
          <label className="flex flex-col">
            <Label>Full Name</Label>
            <input
              className={fieldBase}
              value={form.fullName}
              onChange={(e) => update("fullName", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Gender</Label>
            <select
              className={fieldBase}
              value={form.gender}
              onChange={(e) => update("gender", e.target.value)}
            >
              <option value="">Select</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </label>
          <label className="flex flex-col">
            <Label>Date of Birth</Label>
            <input
              type="date"
              className={fieldBase}
              value={form.dob}
              onChange={(e) => update("dob", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Marital Status</Label>
            <select
              className={fieldBase}
              value={form.maritalStatus}
              onChange={(e) => update("maritalStatus", e.target.value)}
            >
              <option value="">Select</option>
              <option>Single</option>
              <option>Married</option>
              <option>Divorced</option>
              <option>Widowed</option>
            </select>
          </label>
          <label className="flex flex-col">
            <Label>Blood Group</Label>
            <select
              className={fieldBase}
              value={form.bloodGroup}
              onChange={(e) => update("bloodGroup", e.target.value)}
            >
              <option value="">Select</option>
              {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((bg) => (
                <option key={bg}>{bg}</option>
              ))}
            </select>
          </label>
        </Section>

        {/* 2. Contact Information */}
        <Section title="Contact Information">
          <label className="flex flex-col">
            <Label>Mobile Number</Label>
            <input
              className={fieldBase}
              value={form.mobile}
              onChange={(e) => update("mobile", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Email Address</Label>
            <input
              type="email"
              className={fieldBase}
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </label>
          <label className="flex flex-col md:col-span-2">
            <Label>Permanent Address</Label>
            <textarea
              className={fieldBase}
              rows={2}
              value={form.permanentAddress}
              onChange={(e) => update("permanentAddress", e.target.value)}
            />
          </label>
          <label className="flex flex-col md:col-span-2">
            <Label>Current Address</Label>
            <textarea
              className={fieldBase}
              rows={2}
              value={form.currentAddress}
              onChange={(e) => update("currentAddress", e.target.value)}
            />
          </label>
        </Section>

        {/* 3. Identification Details */}
        <Section title="Identification Details">
          <label className="flex flex-col">
            <Label>Aadhaar Number</Label>
            <input
              className={fieldBase}
              value={form.aadhaar}
              onChange={(e) => update("aadhaar", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>PAN Number</Label>
            <input
              className={fieldBase}
              value={form.pan}
              onChange={(e) => update("pan", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Passport Number</Label>
            <input
              className={fieldBase}
              value={form.passport}
              onChange={(e) => update("passport", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Voter ID</Label>
            <input
              className={fieldBase}
              value={form.voterId}
              onChange={(e) => update("voterId", e.target.value)}
            />
          </label>
        </Section>

        {/* 4. Employment Details */}
        <Section title="Employment Details">
          <label className="flex flex-col">
            <Label>Employee Code (auto)</Label>
            <input className={fieldBase} value={form.employeeCode} readOnly />
          </label>
          <label className="flex flex-col">
            <Label>Date of Joining</Label>
            <input
              type="date"
              className={fieldBase}
              value={form.doj}
              onChange={(e) => update("doj", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Department</Label>
            <input
              className={fieldBase}
              value={form.department}
              onChange={(e) => update("department", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Designation</Label>
            <input
              className={fieldBase}
              value={form.designation}
              onChange={(e) => update("designation", e.target.value)}
            />
          </label>
        </Section>

        {/* 5. Work Location */}
        <Section title="Work Location">
          <label className="flex flex-col">
            <Label>Branch / Office Location</Label>
            <input
              className={fieldBase}
              value={form.workLocation}
              onChange={(e) => update("workLocation", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Reporting Manager</Label>
            <input
              className={fieldBase}
              value={form.reportingManager}
              onChange={(e) => update("reportingManager", e.target.value)}
            />
          </label>
        </Section>

        {/* 6. Salary Structure */}
        <Section title="Salary Structure">
          <label className="flex flex-col">
            <Label>Assign Salary Template</Label>
            <select
              className={fieldBase}
              value={form.salaryTemplate}
              onChange={(e) => update("salaryTemplate", e.target.value)}
            >
              <option value="">Select</option>
              <option value="STD-1">Standard Template 1</option>
              <option value="STD-2">Standard Template 2</option>
            </select>
          </label>
          <label className="flex items-center gap-2 md:col-span-1">
            <input
              type="checkbox"
              className="h-4 w-4 accent-indigo-500"
              checked={form.customSalaryEnabled}
              onChange={(e) => update("customSalaryEnabled", e.target.checked)}
            />
            <span className="text-sm text-indigo-300">
              Enable Custom Salary Components
            </span>
          </label>

          {form.customSalaryEnabled && (
            <div className="md:col-span-2">
              <div className="space-y-2">
                {form.customComponents.map((comp, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-6 gap-2 items-end"
                  >
                    <label className="flex flex-col md:col-span-3">
                      <Label>Component Name</Label>
                      <input
                        className={fieldBase}
                        value={comp.name}
                        onChange={(e) =>
                          updateCustomComponent(idx, "name", e.target.value)
                        }
                      />
                    </label>
                    <label className="flex flex-col md:col-span-2">
                      <Label>Amount</Label>
                      <input
                        type="number"
                        className={fieldBase}
                        value={comp.amount}
                        onChange={(e) =>
                          updateCustomComponent(idx, "amount", e.target.value)
                        }
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() => removeCustomComponent(idx)}
                      className="px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition md:col-span-1"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addCustomComponent}
                  className="px-3 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
                >
                  + Add Component
                </button>
              </div>
            </div>
          )}
        </Section>

        {/* 7. Bank Details */}
        <Section title="Bank Details">
          <label className="flex flex-col">
            <Label>Bank Name</Label>
            <input
              className={fieldBase}
              value={form.bankName}
              onChange={(e) => update("bankName", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Account Number</Label>
            <input
              className={fieldBase}
              value={form.accountNumber}
              onChange={(e) => update("accountNumber", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>IFSC Code</Label>
            <input
              className={fieldBase}
              value={form.ifsc}
              onChange={(e) => update("ifsc", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Branch Name</Label>
            <input
              className={fieldBase}
              value={form.bankBranch}
              onChange={(e) => update("bankBranch", e.target.value)}
            />
          </label>
        </Section>

        {/* 8. Statutory Information */}
        <Section title="Statutory Information">
          <label className="flex flex-col">
            <Label>PF UAN</Label>
            <input
              className={fieldBase}
              value={form.pfUAN}
              onChange={(e) => update("pfUAN", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>ESI Number</Label>
            <input
              className={fieldBase}
              value={form.esiNumber}
              onChange={(e) => update("esiNumber", e.target.value)}
            />
          </label>
          <label className="flex flex-col">
            <Label>Professional Tax Applicability</Label>
            <select
              className={fieldBase}
              value={form.ptApplicable}
              onChange={(e) => update("ptApplicable", e.target.value)}
            >
              <option>No</option>
              <option>Yes</option>
            </select>
          </label>
          <label className="flex flex-col">
            <Label>TDS Declaration Status</Label>
            <select
              className={fieldBase}
              value={form.tdsStatus}
              onChange={(e) => update("tdsStatus", e.target.value)}
            >
              <option>Not Declared</option>
              <option>Declared</option>
              <option>Exempt</option>
            </select>
          </label>
        </Section>
        {/* Save Button at bottom */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 rounded bg-green-600 text-white hover:bg-green-700 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
