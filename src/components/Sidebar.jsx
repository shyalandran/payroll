import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  CreditCard,
  Briefcase,
  FileText,
  BarChart,
  Settings,
  Building2,
} from "lucide-react";

export default function Sidebar() {
  const menu = [
    { name: "Dashboard", path: "/", icon: <Home size={18} /> },
    { name: "Employees", path: "/employees", icon: <Users size={18} /> },
    { name: "Pay Runs", path: "/payruns", icon: <CreditCard size={18} /> },
    { name: "Benefits", path: "/benefits", icon: <Briefcase size={18} /> },
    { name: "Documents", path: "/documents", icon: <FileText size={18} /> },
    { name: "Reports", path: "/reports", icon: <BarChart size={18} /> },
    { name: "Marketing", path: "/marketing", icon: <Briefcase size={18} /> },
    { name: "Company Settings", path: "/settings", icon: <Settings size={18} /> },
    { name: "Organization Details", path: "/organization", icon: <Building2 size={18} /> },
  ];

  return (
    <div className="w-64 bg-indigo-900 text-white h-screen flex flex-col border-r border-indigo-800 shadow-lg">
      <div className="p-4 text-xl font-bold tracking-wide text-indigo-100">MAKJUZ</div>
      <nav className="flex-1">
        {menu.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-2 cursor-pointer rounded transition-all duration-150 ${
                isActive
                  ? "bg-indigo-600 text-white shadow-md"
                  : "hover:bg-indigo-700 text-indigo-100"
              }`
            }
          >
            {item.icon}
            {item.name}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
