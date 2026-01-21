"use client";
import { FiShield, FiLock, FiEye, FiServer } from "react-icons/fi";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-12 px-6 bg-background dark:bg-dark">
      <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-2xl mb-4">
            <FiShield className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-dark dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Your privacy is our priority. We are committed to protecting your personal data and ensuring transparency.
          </p>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-[#2D274B]/50 p-8 rounded-3xl border border-white/20 shadow-xl backdrop-blur-sm card-hover">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FiLock className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-xl font-bold text-dark dark:text-white">Data Protection</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              We use industry-standard encryption to protect your personal information. Your data is stored securely and never shared with unauthorized third parties.
            </p>
          </div>

          <div className="bg-white dark:bg-[#2D274B]/50 p-8 rounded-3xl border border-white/20 shadow-xl backdrop-blur-sm card-hover">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <FiEye className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-dark dark:text-white">Data Usage</h2>
            </div>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
              We collect only the essential data needed to provide our services, such as order processing and account management. 
            </p>
          </div>
        </div>

        {/* Detailed Section */}
        <div className="bg-white dark:bg-[#2D274B]/50 p-8 md:p-12 rounded-3xl border border-white/20 shadow-xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold mb-6 text-dark dark:text-white flex items-center gap-2">
                <FiServer className="text-primary" /> Information We Collect
            </h3>
            <ul className="space-y-4 text-gray-500 dark:text-gray-400">
                <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Personal information (Name, Email, Address) provided during checkout.</span>
                </li>
                <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Payment information (Processed securely via Stripe).</span>
                </li>
                <li className="flex gap-3">
                    <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                    <span>Usage data to improve our website experience.</span>
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
