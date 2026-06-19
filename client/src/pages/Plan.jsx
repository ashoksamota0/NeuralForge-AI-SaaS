import React, { useState } from "react";
import axios from "axios";
import { useUser, useAuth } from "@clerk/clerk-react";

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
        { headers: { Authorization: `Bearer ${await getToken()}` } },
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

  return (
    <div className="max-w-4xl mx-auto py-20 px-6">
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
            <div className="bg-[#2d6be4] px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white rounded-full w-8 h-8 flex items-center justify-center">
                  <span className="text-[#2d6be4] font-bold text-xs">N</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">
                    NeuralForge
                  </p>
                  <p className="text-blue-200 text-xs">
                    Premium Plan — ₹499/month
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowModal(false);
                  setStep("payment");
                }}
                className="text-white text-xl font-light hover:opacity-70"
              >
                ✕
              </button>
            </div>

            {step === "payment" && (
              <div className="p-6">
                <div className="border rounded-lg px-4 py-3 mb-4 flex items-center gap-3 opacity-50 cursor-not-allowed">
                  <span className="text-2xl">📱</span>
                  <div>
                    <p className="text-sm font-medium text-slate-700">UPI</p>
                    <p className="text-xs text-gray-400">
                      GPay, PhonePe, Paytm & more
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs text-gray-400">or pay by card</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Cardholder Name"
                    value={cardData.name}
                    onChange={(e) =>
                      setCardData({ ...cardData, name: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
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
                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
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
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
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
                      className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
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
                  className="w-full mt-5 bg-[#2d6be4] hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-sm transition-colors"
                >
                  Pay ₹499
                </button>
                <p className="text-center text-xs text-gray-400 mt-3">
                  🔒 Secured by Razorpay
                </p>
              </div>
            )}

            {step === "processing" && (
              <div className="p-10 flex flex-col items-center justify-center gap-4">
                <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-slate-600 font-medium">
                  Processing your payment...
                </p>
                <p className="text-xs text-gray-400">
                  Please do not close this window
                </p>
              </div>
            )}

            {step === "success" && (
              <div className="p-10 flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">✅</span>
                </div>
                <p className="text-xl font-bold text-slate-800">
                  Payment Successful!
                </p>
                <p className="text-sm text-gray-500 text-center">
                  Welcome to Premium! All features are now unlocked.
                </p>
                <button
                  onClick={() => {
                    setShowModal(false);
                    setStep("payment");
                  }}
                  className="mt-2 bg-green-500 hover:bg-green-600 text-white px-8 py-2.5 rounded-lg font-medium text-sm transition-colors"
                >
                  Start Using Premium →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="text-center">
        <h2 className="text-slate-800 text-5xl font-bold">Choose Your Plan</h2>
        <p className="text-gray-500 max-w-2xl mx-auto mt-4">
          Choose a plan to unlock advanced AI content creation tools and boost
          your productivity.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-16">
        <div className="border rounded-2xl p-8 shadow-sm bg-white">
          <h3 className="text-2xl font-semibold text-slate-800">Free Plan</h3>
          <p className="text-gray-500 mt-3">
            Perfect for getting started with AI-powered content creation.
          </p>
          <div className="text-4xl font-bold mt-6">
            ₹0
            <span className="text-lg text-gray-500 font-normal"> / month</span>
          </div>
          <ul className="mt-6 space-y-3 text-gray-600">
            <li>
              ✓ AI Article Writer{" "}
              <span className="text-xs text-gray-400">(Limited)</span>
            </li>
            <li>
              ✓ Blog Title Generator{" "}
              <span className="text-xs text-gray-400">(Limited)</span>
            </li>
            <li>
              ✓ AI Image Generation{" "}
              <span className="text-xs text-gray-400">(Limited)</span>
            </li>
            <li>
              ✓ Background Removal{" "}
              <span className="text-xs text-gray-400">(Limited)</span>
            </li>
            <li>
              ✓ Object Removal{" "}
              <span className="text-xs text-gray-400">(Limited)</span>
            </li>
          </ul>
          <button className="w-full mt-8 border border-gray-300 py-3 rounded-lg font-medium text-gray-600">
            {isPremium ? "Basic Features" : "Current Plan"}
          </button>
        </div>

        <div
          className={`border-2 rounded-2xl p-8 shadow-md bg-white relative transition-all ${isPremium ? "border-green-500" : "border-indigo-500"}`}
        >
          <div
            className={`absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs font-semibold px-4 py-1 rounded-full ${isPremium ? "bg-green-500" : "bg-indigo-500"}`}
          >
            {isPremium ? "✓ ACTIVE" : "MOST POPULAR"}
          </div>
          <h3 className="text-2xl font-semibold text-slate-800">
            Premium Plan
          </h3>
          <p className="text-gray-500 mt-3">
            Unlock all advanced AI features without limits.
          </p>
          <div className="text-4xl font-bold mt-6">
            ₹499
            <span className="text-lg text-gray-500 font-normal"> / month</span>
          </div>
          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✓ Unlimited AI Article Writer</li>
            <li>✓ Unlimited Blog Title Generator</li>
            <li>✓ Unlimited AI Image Generation</li>
            <li>✓ Unlimited Background Removal</li>
            <li>✓ Unlimited Object Removal</li>
            <li>
              ✓ Resume Reviewer{" "}
              <span className="text-xs text-indigo-400 font-medium">
                (Premium Only)
              </span>
            </li>
            <li>✓ Priority Access</li>
          </ul>
          {isPremium ? (
            <button className="w-full mt-8 bg-green-500 text-white py-3 rounded-lg font-medium cursor-default">
              ✓ Premium Active
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="w-full mt-8 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors cursor-pointer"
            >
              Upgrade to Premium
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Plan;
