import React, { useState, useRef, useCallback } from "react";
import ProgressBar from "../../components/ProgressBar";
import { useToast } from "../../components/Toast";

// Import step components (correct paths based on your structure)
import Step1_BasicInfo from "./steps/Step1_BasicInfo";
import Step2_ContactDetails from "./steps/Step2_ContactDetails";
import Step3_Registration from "./steps/Step3_Registration";
import Step4_Branches from "./steps/Step4_Branches";
import Step5_BankDetails from "./steps/Step5_BankDetails";
import Step6_Statutory from "./steps/Step6_Statutory";
import Step7_Financial from "./steps/Step7_Financial";
import Step8_Branding from "./steps/Step8_Branding";
const TOTAL_STEPS = 8;

export default function OrganizationForm() {
  const [step, setStep] = useState(1);
  const { show } = useToast();
  const [form, setForm] = useState({
    // 1. Basic Information
    companyName: "",
    legalName: "",
    organisationType: "Private Ltd",
    industrySector: "",

    // 2. Contact Details
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
    emailAddress: "",

    // 3. Registration Details
    pan: "",
    tan: "",
    gstin: "",
    cin: "",
    pfRegistration: "",
    esiRegistration: "",

    // 4. Branches
    branches: [],

    // 5. Bank Details
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    bankBranchName: "",

    // 6. Statutory Settings
    pfApplicability: false,
    esiApplicability: false,
    professionalTax: false,
    tdsConfiguration: "",

    // 7. Financial Settings
    financialYearStart: "",
    payrollFrequency: "Monthly",

    // 8. Branding
    logoFile: null,
    logoPreviewUrl: null,
  });

  // refs
  const logoInputRef = useRef(null);

  // helpers (stable with useCallback)
  const updateField = useCallback((path, value) => {
    setForm((prev) => ({ ...prev, [path]: value }));
  }, []);

  const updateNestedBranch = useCallback((index, key, value) => {
    setForm((prev) => {
      const branches = [...prev.branches];
      branches[index] = { ...branches[index], [key]: value };
      return { ...prev, branches };
    });
  }, []);

  const addBranch = useCallback(() => {
    setForm((prev) => {
      const id = Date.now();
      const newBranches = [
        ...prev.branches,
        { id, branchName: "", address: "", contactNumber: "" },
      ];
      return { ...prev, branches: newBranches };
    });
  }, []);

  const removeBranch = useCallback((index) => {
    setForm((prev) => {
      const branches = prev.branches.filter((_, i) => i !== index);
      return { ...prev, branches };
    });
  }, []);

  const handleLogoChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setForm((prev) => ({ ...prev, logoFile: file, logoPreviewUrl: url }));
  }, []);

  function canProceedCurrentStep() {
    switch (step) {
      case 1: // Basic Info
        return (
          form.companyName.trim() !== "" &&
          form.legalName.trim() !== "" &&
          form.organisationType.trim() !== "" &&
          form.industrySector.trim() !== ""
        );
      case 2: // Contact Details
        return (
          form.address.trim() !== "" &&
          form.city.trim() !== "" &&
          form.state.trim() !== "" &&
          form.country.trim() !== "" &&
          form.pincode.trim() !== "" &&
          form.phoneNumber.trim() !== "" &&
          form.emailAddress.trim() !== ""
        );
      case 3: // Registration
        return (
          form.pan.trim() !== "" &&
          form.tan.trim() !== "" &&
          form.gstin.trim() !== "" &&
          form.cin.trim() !== "" &&
          form.pfRegistration.trim() !== "" &&
          form.esiRegistration.trim() !== ""
        );
      case 4: // Branches — at least one branch with required fields
        return (
          form.branches.length > 0 &&
          form.branches.every(
            (b) =>
              b.branchName.trim() !== "" &&
              b.address.trim() !== "" &&
              b.contactNumber.trim() !== ""
          )
        );
      case 5: // Bank Details
        return (
          form.bankName.trim() !== "" &&
          form.accountNumber.trim() !== "" &&
          form.ifscCode.trim() !== "" &&
          form.bankBranchName.trim() !== ""
        );
      case 6: // Statutory (assuming tdsConfiguration is required, booleans are okay as they default)
        return form.tdsConfiguration.trim() !== "";
      case 7: // Financial
        return (
          form.financialYearStart.trim() !== "" &&
          form.payrollFrequency.trim() !== ""
        );
      case 8: // Branding (require logo upload?)
        return form.logoFile !== null;
      default:
        return true;
    }
  }

  function handleNext() {
    if (!canProceedCurrentStep()) {
      show(
        "Please fill required fields in this section before moving forward.",
        "warning"
      );
      return;
    }
    setStep((s) => Math.min(TOTAL_STEPS, s + 1));
  }

  function handlePrev() {
    setStep((s) => Math.max(1, s - 1));
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Final organization payload:", form);
    show("Organization details submitted", "success");
  }

  function renderStep() {
    switch (step) {
      case 1:
        return <Step1_BasicInfo form={form} updateField={updateField} />;
      case 2:
        return <Step2_ContactDetails form={form} updateField={updateField} />;
      case 3:
        return <Step3_Registration form={form} updateField={updateField} />;
      case 4:
        return (
          <Step4_Branches
            branches={form.branches}
            addBranch={addBranch}
            removeBranch={removeBranch}
            updateNestedBranch={updateNestedBranch}
          />
        );
      case 5:
        return <Step5_BankDetails form={form} updateField={updateField} />;
      case 6:
        return <Step6_Statutory form={form} updateField={updateField} />;
      case 7:
        return <Step7_Financial form={form} updateField={updateField} />;
      case 8:
        return (
          <Step8_Branding
            form={form}
            logoInputRef={logoInputRef}
            handleLogoChange={handleLogoChange}
          />
        );
      default:
        return null;
    }
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-indigo-900 drop-shadow">
            Organization Details
          </h1>
          <div className="text-sm text-indigo-700">
            Step {step} of {TOTAL_STEPS}
          </div>
        </div>
        <ProgressBar step={step} total={TOTAL_STEPS} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-4 bg-indigo-50 rounded shadow"
      >
        {renderStep()}

        <div className="flex items-center justify-between mt-6">
          <div>
            <button
              type="button"
              onClick={handlePrev}
              disabled={step === 1}
              className={`px-4 py-2 rounded font-semibold mr-2 transition ${
                step === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              ← Previous
            </button>
            {step < TOTAL_STEPS && (
              <button
                type="button"
                onClick={handleNext}
                className="px-4 py-2 rounded font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition"
              >
                Next →
              </button>
            )}
          </div>

          <div>
            {step === TOTAL_STEPS ? (
              <button
                type="submit"
                className="px-4 py-2 rounded font-semibold bg-green-600 text-white hover:bg-green-700 transition"
              >
                Submit Organization
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setStep(TOTAL_STEPS)}
                className="px-4 py-2 rounded font-semibold bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition"
              >
                Skip to End
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
