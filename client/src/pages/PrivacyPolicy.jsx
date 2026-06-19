import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const sections = [
  {
    title: "1. Information We Collect",
    content:
      "We collect information you provide directly to us, such as your name, email address, and payment information when you register or subscribe. We also collect usage data including the content you generate, features you use, and how you interact with our platform.",
  },
  {
    title: "2. How We Use Your Information",
    content:
      "We use the information we collect to provide, maintain, and improve our services, process transactions, send you technical notices and support messages, and respond to your comments and questions.",
  },
  {
    title: "3. Data Storage & Security",
    content:
      "Your data is stored securely on our servers. We implement industry-standard security measures including encryption in transit and at rest. However, no method of transmission over the internet is 100% secure.",
  },
  {
    title: "4. AI-Generated Content",
    content:
      "Content generated using NeuralForge AI tools is stored to improve our services. You retain ownership of content you create using our platform. We do not use your private content to train our models without your consent.",
  },
  {
    title: "5. Third-Party Services",
    content:
      "We use third-party services including Clerk for authentication, Cloudinary for image storage, and payment processors for billing. These services have their own privacy policies governing the use of your information.",
  },
  {
    title: "6. Cookies",
    content:
      "We use cookies and similar tracking technologies to track activity on our service and hold certain information to improve your experience. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.",
  },
  {
    title: "7. Your Rights",
    content:
      "You have the right to access, update, or delete your personal information at any time. You may also request a copy of the data we hold about you. To exercise these rights, contact us at support@neuralforge.ai.",
  },
  {
    title: "8. Changes to This Policy",
    content:
      "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the effective date. Continued use of our service after changes constitutes acceptance of the new policy.",
  },
];

const PrivacyPolicy = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-slate-800">Privacy Policy</h1>
          <p className="text-gray-500 mt-4">Effective Date: January 1, 2026</p>
        </div>

        <p className="text-gray-600 mb-10 leading-relaxed">
          At NeuralForge, we take your privacy seriously. This Privacy Policy
          explains how we collect, use, and protect your personal information
          when you use our platform and services.
        </p>

        <div className="space-y-8">
          {sections.map((section, i) => (
            <div key={i} className="border-b border-gray-100 pb-8">
              <h2 className="text-xl font-semibold text-slate-800 mb-3">
                {section.title}
              </h2>
              <p className="text-gray-600 leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-indigo-50 rounded-2xl p-6 text-center">
          <p className="text-gray-600 text-sm">
            Questions about our privacy policy?{" "}
            <a
              href="/contact"
              className="text-indigo-600 font-medium hover:underline"
            >
              Contact us
            </a>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
