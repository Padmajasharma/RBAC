import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { theme } from "../store/theme";
import a from "../media/a.png";

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
};

const NavLink: React.FC<NavLinkProps> = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-700 hover:text-gray-900 transition-colors duration-300"
  >
    {children}
  </a>
);

export default function Home() {
  const Theme = useRecoilValue(theme);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) location.href = "/app";
  }, []);

  return (
    <div
      className="h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${newImage})` }} // Full-screen background image
    >
      <nav className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="font-semibold text-2xl text-indigo-600">
              Liaplus
            </span>
          </div>

          <div className="flex items-center space-x-6">
            <NavLink href="/app">App</NavLink>
            <NavLink href="/auth">Login</NavLink>
            <button
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-500 transition-colors duration-200"
              onClick={() => (location.href = "/auth")}
            >
              Sign up
            </button>
          </div>
        </div>
      </nav>

      <div className="flex justify-center items-center h-full px-4">
        {/* Hero Section */}
        <div className="text-center max-w-2xl mx-auto space-y-6 text-white">
          <h1
            className={`text-5xl font-semibold ${
              Theme === "light" ? "text-gray-800" : "text-gray-100"
            }`}
          >
            Role-Based Access Control (RBAC)
          </h1>
          <p
            className={`text-xl ${
              Theme === "light" ? "text-gray-700" : "text-gray-300"
            }`}
          >
            We provide a safe and reliable Role-Based Access Control (RBAC)
            system for you and your team to ensure secure access and seamless
            operations.
          </p>
        </div>
      </div>
    </div>
  );
}
