import React from "react";

function Step8_Branding({ form, logoInputRef, handleLogoChange }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-indigo-800">Branding</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
        <div>
          <p className="text-sm text-indigo-700">
            Upload Company Logo (for payslips and reports)
          </p>
          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoChange}
            className="mt-2"
          />
          {form.logoPreviewUrl && (
            <div className="mt-3">
              <img
                src={form.logoPreviewUrl}
                alt="logo preview"
                style={{ maxWidth: 180, maxHeight: 120 }}
              />
            </div>
          )}
        </div>

        <div>
          <p className="text-sm text-indigo-700">Preview usage note</p>
          <div className="mt-2 p-3 border rounded bg-indigo-50">
            <div style={{ height: 60, display: "flex", alignItems: "center", gap: 12 }}>
              {form.logoPreviewUrl ? (
                <img src={form.logoPreviewUrl} alt="small" style={{ height: 40 }} />
              ) : (
                <div className="placeholder-box">Logo</div>
              )}
              <div>
                <div className="text-sm font-medium text-indigo-900">
                  {form.companyName || "Company name here"}
                </div>
                <div className="text-xs text-indigo-700">
                  {form.industrySector || "Industry"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Step8_Branding);
