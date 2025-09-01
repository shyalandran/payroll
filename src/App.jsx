import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employee/Employees";
import PayRuns from "./pages/PayRuns";
import Benefits from "./pages/Benefits";
import Documents from "./pages/Documents";
import Reports from "./pages/Reports";
import Marketing from "./pages/Marketing";
import CompanySettings from "./pages/CompanySettings";
import OrganizationForm from "./pages/Organization/OrganizationForm";
import AddEmployee from "./pages/Employee/AddEmployee";

export default function App() {
  return (
    <div className="flex h-screen bg-[#121212] text-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/employees/add" element={<AddEmployee />} />
            <Route path="/payruns" element={<PayRuns />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/marketing" element={<Marketing />} />
            <Route path="/settings" element={<CompanySettings />} />
            <Route path="/organization" element={<OrganizationForm />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
