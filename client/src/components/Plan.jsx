import React, { useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";
import { Check, Crown, Lock, X, CreditCard, Sparkles, Zap } from "lucide-react";

const Plan = () => {
  const { user } = useUser();
  const { getToken } = useAuth();

  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState("payment");

  const [cardData, setCardData] = useState({
    name: "",
    number: "",
    expiry: "",
    cvv: "",
  });

  const isPremium = user?.publicMetadata?.plan === "premium";

  const handlePayment = async () => {
    setStep("processing");

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/user/upgrade-to-premium`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (data.success) {
        window.location.reload();
      } else {
        alert(data.message);
        setStep("payment");
      }
    } catch (error) {
      console.log(error);
      setStep("payment");
    }
  };

  const formatCard = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();

  const formatExpiry = (val) =>
    val
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(.{2})/, "$1/");

  const closeModal = () => {
    setShowModal(false);
    setStep("payment");
  };

  return (
    <section
      id="pricing"
      className="relative overflow-hidden px-5 pt-0 pb-2 sm:px-8 lg:px-10"
    >
      {/* Background Shapes */}

      <div className="pointer-events-none absolute left-0 top-20 h-80 w-80 rounded-full bg-purple-100/40 blur-3xl" />

      <div className="pointer-events-none absolute right-0 bottom-0 h-80 w-80 rounded-full bg-pink-100/40 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Heading */}

        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-purple-50 px-4 py-1.5 text-xs font-medium text-primary sm:text-sm">
            <Sparkles className="h-3.5 w-3.5" />
            Simple & Flexible Pricing
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            Choose Your Plan
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Choose a plan to unlock advanced AI content creation tools and boost
            your productivity.
          </p>
        </div>

        {/* Plans */}

        <div className="mx-auto mt-7 grid max-w-5xl gap-5 lg:grid-cols-2">
          {/* =================================================
              FREE PLAN
          ================================================== */}

          <div className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white/85 p-5 shadow-sm backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:p-6">
            {/* Side Accent */}

            <div className="absolute bottom-7 left-0 top-7 w-1 rounded-r-full bg-gradient-to-b from-indigo-400 to-blue-400" />

            <div className="relative z-10">
              {/* Icon */}

              <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 shadow-sm">
                <Zap className="h-5 w-5 text-slate-600" />
              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-slate-900">Free Plan</h3>

              <p className="mt-1.5 max-w-sm text-sm leading-5 text-slate-500">
                Perfect for getting started with AI-powered content creation.
              </p>

              {/* Price */}

              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  ₹0
                </span>

                <span className="ml-2 text-sm text-slate-500">/ month</span>
              </div>

              {/* Divider */}

              <div className="my-4 h-px bg-slate-100" />

              <p className="mb-2.5 text-sm font-semibold text-slate-800">
                What's included
              </p>

              {/* Features */}

              <ul className="space-y-2 text-sm text-slate-600">
                {/* AI Article Writer */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>AI Article Writer</span>

                  <span className="ml-auto text-xs text-slate-400">
                    Limited
                  </span>
                </li>

                {/* Blog Title Generator - LOCKED */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-slate-100">
                    <Lock className="h-3 w-3 text-slate-500" />
                  </span>

                  <span className="text-slate-500">Blog Title Generator</span>

                  <span className="ml-auto rounded-full bg-purple-50 px-2 py-0.5 text-[10px] font-semibold text-primary">
                    PREMIUM ONLY
                  </span>
                </li>

                {/* AI Image Generation */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>AI Image Generation</span>

                  <span className="ml-auto text-xs text-slate-400">
                    Limited
                  </span>
                </li>

                {/* Background Removal */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Background Removal</span>

                  <span className="ml-auto text-xs text-slate-400">
                    Limited
                  </span>
                </li>

                {/* Object Removal */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Object Removal</span>

                  <span className="ml-auto text-xs text-slate-400">
                    Limited
                  </span>
                </li>

                {/* Resume Reviewer */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Resume Reviewer</span>

                  <span className="ml-auto text-xs text-slate-400">
                    Limited
                  </span>
                </li>
              </ul>

              {/* CTA */}

              <button className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 py-3 text-sm font-semibold text-slate-600 transition duration-300 hover:border-slate-300 hover:bg-slate-100">
                {isPremium ? "Basic Features" : "Current Plan"}
              </button>
            </div>
          </div>

          {/* =================================================
              PREMIUM PLAN
          ================================================== */}

          <div
            className={`group relative overflow-visible rounded-3xl border-2 bg-white/90 p-5 shadow-lg backdrop-blur-md transition duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-6 ${
              isPremium
                ? "border-green-400 shadow-green-100"
                : "border-primary shadow-indigo-100"
            }`}
          >
            {/* Side Accent */}

            <div
              className={`absolute bottom-7 left-0 top-7 w-1 rounded-r-full ${
                isPremium
                  ? "bg-gradient-to-b from-green-400 to-emerald-500"
                  : "bg-gradient-to-b from-indigo-500 via-purple-500 to-fuchsia-500"
              }`}
            />

            {/* Most Popular Badge */}

            <div
              className={`absolute -top-3 left-8 flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-white shadow-sm ${
                isPremium ? "bg-green-500" : "bg-primary"
              }`}
            >
              <Crown className="h-3.5 w-3.5" />

              {isPremium ? "ACTIVE" : "MOST POPULAR"}
            </div>

            <div className="relative z-10">
              {/* Icon */}

              <div className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-md shadow-indigo-100">
                <Crown className="h-5 w-5 text-white" />
              </div>

              {/* Title */}

              <h3 className="text-2xl font-bold text-slate-900">
                Premium Plan
              </h3>

              <p className="mt-1.5 max-w-sm text-sm leading-5 text-slate-500">
                Unlock all advanced AI features without limits.
              </p>

              {/* Price */}

              <div className="mt-4 flex items-baseline">
                <span className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  ₹499
                </span>

                <span className="ml-2 text-sm text-slate-500">/ month</span>
              </div>

              {/* Divider */}

              <div className="my-4 h-px bg-slate-100" />

              <p className="mb-2.5 text-sm font-semibold text-slate-800">
                Everything in Free, plus
              </p>

              {/* Features */}

              <ul className="space-y-2 text-sm text-slate-600">
                {/* AI Article Writer */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Unlimited AI Article Writer</span>
                </li>

                {/* Blog Title Generator */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Unlimited Blog Title Generator</span>
                </li>

                {/* AI Image Generation */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Unlimited AI Image Generation</span>
                </li>

                {/* Background Removal */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Unlimited Background Removal</span>
                </li>

                {/* Object Removal */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Unlimited Object Removal</span>
                </li>

                {/* Resume Reviewer */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Unlimited Resume Reviewer</span>
                </li>

                {/* Priority Access */}

                <li className="flex items-center gap-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50">
                    <Check className="h-3 w-3 text-green-600" />
                  </span>

                  <span>Priority Access</span>
                </li>
              </ul>

              {/* CTA */}

              {isPremium ? (
                <button className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-green-500 py-3 text-sm font-semibold text-white transition duration-300 hover:bg-green-600">
                  <Check className="h-4 w-4" />
                  Premium Active
                </button>
              ) : (
                <button
                  onClick={() => setShowModal(true)}
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
                >
                  Upgrade to Premium
                  <Crown className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          PAYMENT MODAL
      ====================================================== */}

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-3xl bg-white shadow-2xl">
            {/* Modal Header */}

            <div className="flex items-center justify-between bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-6 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20">
                  <Crown className="h-5 w-5 text-white" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    NeuralForge Premium
                  </p>

                  <p className="mt-0.5 text-xs text-white/70">
                    Premium Plan — ₹499/month
                  </p>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="flex h-8 w-8 items-center justify-center rounded-full text-white/80 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Payment */}

            {step === "payment" && (
              <div className="p-6">
                {/* Payment Method */}

                <div className="mb-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-slate-800">
                        Pay securely by card
                      </p>

                      <p className="text-xs text-slate-400">
                        Visa, Mastercard & other cards
                      </p>
                    </div>
                  </div>
                </div>

                {/* Card Form */}

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardData.name}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        name: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-indigo-50"
                  />

                  <input
                    type="text"
                    placeholder="Card Number"
                    value={cardData.number}
                    onChange={(e) =>
                      setCardData({
                        ...cardData,
                        number: formatCard(e.target.value),
                      })
                    }
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-indigo-50"
                  />

                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardData.expiry}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          expiry: formatExpiry(e.target.value),
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-indigo-50"
                    />

                    <input
                      type="password"
                      placeholder="CVV"
                      maxLength={3}
                      value={cardData.cvv}
                      onChange={(e) =>
                        setCardData({
                          ...cardData,
                          cvv: e.target.value.replace(/\D/g, "").slice(0, 3),
                        })
                      }
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-primary focus:ring-4 focus:ring-indigo-50"
                    />
                  </div>
                </div>

                <button
                  onClick={handlePayment}
                  disabled={
                    !cardData.name ||
                    cardData.number.length < 19 ||
                    cardData.expiry.length < 5 ||
                    cardData.cvv.length < 3
                  }
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Lock className="h-4 w-4" />
                  Pay ₹499
                </button>

                <p className="mt-3 text-center text-xs text-slate-400">
                  🔒 Secured by Razorpay
                </p>
              </div>
            )}

            {/* Processing */}

            {step === "processing" && (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-indigo-200 border-t-primary" />
                </div>

                <p className="mt-6 text-base font-semibold text-slate-800">
                  Processing your payment...
                </p>

                <p className="mt-2 text-center text-xs text-slate-400">
                  Please do not close this window
                </p>
              </div>
            )}

            {/* Success */}

            {step === "success" && (
              <div className="flex flex-col items-center justify-center px-8 py-16">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                  <Check className="h-8 w-8 text-green-600" />
                </div>

                <p className="mt-6 text-xl font-bold text-slate-800">
                  Payment Successful!
                </p>

                <p className="mt-2 text-center text-sm text-slate-500">
                  Welcome to Premium! All features are now unlocked.
                </p>

                <button
                  onClick={() => {
                    setShowModal(false);
                    setStep("payment");
                  }}
                  className="mt-6 rounded-xl bg-green-500 px-8 py-3 text-sm font-semibold text-white transition hover:bg-green-600"
                >
                  Start Using Premium →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Plan;
