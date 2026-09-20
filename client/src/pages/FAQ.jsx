import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronDown, HelpCircle } from "lucide-react";

const faqs = [
  {
    question: "What is NeuralForge AI?",
    answer:
      "NeuralForge AI is an all-in-one AI creative suite that brings multiple AI-powered tools together in one simple platform.",
  },
  {
    question: "What AI tools are available on NeuralForge?",
    answer:
      "NeuralForge currently offers AI Article Writer, Blog Title Generator, AI Image Generation, Background Removal, Object Removal, and Resume Reviewer.",
  },
  {
    question: "Is NeuralForge free to use?",
    answer:
      "Yes. NeuralForge offers a Free plan with access to selected AI tools and usage limits. You can upgrade to Premium when you need additional features and higher usage limits.",
  },
  {
    question: "Which features are available with Premium?",
    answer:
      "The Premium plan provides unlimited access to the AI tools included in the Premium plan, including the Blog Title Generator and unlimited usage of the other supported AI tools.",
  },
  {
    question: "Can I use the Resume Reviewer on the Free plan?",
    answer:
      "Yes. The Resume Reviewer is available on both Free and Premium plans. The Free plan includes limited usage, while Premium provides unlimited access.",
  },
  {
    question: "Why is the Blog Title Generator Premium-only?",
    answer:
      "The Blog Title Generator is currently offered as a Premium feature. You can upgrade to the Premium plan to unlock it.",
  },
  {
    question: "Do I need an account to use the AI tools?",
    answer:
      "Yes. You need to sign in to your NeuralForge account before using the AI tools.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="px-6 pb-24 pt-32 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="mb-14 text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50 px-4 py-2 text-sm font-medium text-primary">
              <HelpCircle className="h-4 w-4" />
              Help Center
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-slate-800 sm:text-5xl">
              Frequently Asked Questions
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
              Everything you need to know about NeuralForge AI, its features,
              plans, and how to get started.
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-300 ${
                    isOpen
                      ? "border-primary/20 shadow-md shadow-indigo-100/40"
                      : "border-slate-200 hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFAQ(index)}
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left sm:px-6 sm:py-6"
                  >
                    <span className="text-sm font-semibold leading-6 text-slate-800 sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-primary text-white"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  <div
                    className={`grid transition-all duration-300 ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-slate-100 px-5 pb-6 pt-5 sm:px-6">
                        <p className="text-sm leading-7 text-gray-500">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-600 px-6 py-10 text-center text-white shadow-lg shadow-indigo-100 sm:px-10">
            <h2 className="text-2xl font-bold sm:text-3xl">
              Still have questions?
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-indigo-100 sm:text-base">
              Explore NeuralForge and experience our AI-powered creative tools
              yourself.
            </p>

            <a
              href="/"
              className="mt-6 inline-flex items-center rounded-xl bg-white px-6 py-3 text-sm font-semibold text-indigo-600 transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-50"
            >
              Explore NeuralForge →
            </a>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
