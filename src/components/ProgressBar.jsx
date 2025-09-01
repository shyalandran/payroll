// src/components/ProgressBar.jsx
import React from "react";

export default function ProgressBar({ step, total }) {
  const percent = Math.round(((step - 1) / (total - 1)) * 100);
  return (
    <div className="w-full h-3 bg-gray-200 rounded overflow-hidden">
      <div
        aria-hidden
        className="h-full bg-blue-600 transition-all duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
