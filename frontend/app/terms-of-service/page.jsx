"use client";
import { FiFileText, FiCheckCircle, FiAlertTriangle, FiHelpCircle } from "react-icons/fi";

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-background dark:bg-dark">
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <FiFileText className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Please read these terms carefully before using our services. By accessing our site, you agree to be bound by these terms.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#2D274B]/50 p-8 rounded-3xl border border-white/20 shadow-xl backdrop-blur-sm card-hover">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-bold text-dark dark:text-white">Acceptance</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              By using GhostShop, you agree to comply with all applicable laws and regulations. If you do not agree, strictly referring from using our services.
            </p>
          </div>

          <div className="bg-white dark:bg-[#2D274B]/50 p-8 rounded-3xl border border-white/20 shadow-xl backdrop-blur-sm card-hover">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
                <FiAlertTriangle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              </div>
              <h2 className="text-xl font-bold text-dark dark:text-white">Limitations</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              We are not liable for any indirect damages arising from your use of our services. Products are provided "as is" without warranty of any kind.
            </p>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="bg-white dark:bg-[#2D274B]/50 p-8 md:p-12 rounded-3xl border border-white/20 shadow-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-dark dark:text-white flex items-center gap-2">
                <FiHelpCircle className="text-primary" /> User Responsibilities
            </h3>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <span>You must be at least 13 years old to use this service.</span>
                </li>
                <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <span>You are responsible for maintaining the confidentiality of your account.</span>
                </li>
                <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Any fraudulent activity will result in immediate account termination.</span>
                </li>
            </ul>
        </div>
        
        <p className="text-center text-sm text-gray-400">
            Last updated: {new Date().toLocaleDateString()}
        </p>

      </div>
    </div>
  );
}
