// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { ArrowRight, Sparkles, ChevronRight } from "lucide-react";
// import axios from "axios";
// import toast from "react-hot-toast";
// import { assets } from "../assets/assets";

// const Footer = () => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubscribe = async () => {
//     if (!email) return toast.error("Please enter your email");

//     setLoading(true);

//     try {
//       const { data } = await axios.post(
//         `${import.meta.env.VITE_BASE_URL}/api/newsletter-subscribe`,
//         { email },
//       );

//       if (data.success) {
//         toast.success("Subscribed successfully!");
//         setEmail("");
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error("Something went wrong");
//     }

//     setLoading(false);
//   };

//   const scrollToTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });
//   };

//   return (
//     <footer
//       id="about"
//       className="relative mt-16 overflow-hidden border-t border-slate-100 bg-white px-5 pt-14 sm:px-8 lg:px-10"
//     >
//       {/* =====================================================
//           BACKGROUND
//       ====================================================== */}

//       <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-purple-100/35 blur-3xl" />

//       <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-indigo-100/30 blur-3xl" />

//       <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-pink-50/30 blur-3xl" />

//       {/* Subtle top accent */}
//       <div className="pointer-events-none absolute left-1/2 top-0 h-px w-40 -translate-x-1/2 bg-gradient-to-r from-transparent via-purple-300 to-transparent" />

//       <div className="relative z-10 mx-auto max-w-7xl">
//         {/* =====================================================
//             MAIN FOOTER
//         ====================================================== */}

//         <div className="grid gap-10 border-b border-slate-100 pb-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1fr]">
//           {/* =================================================
//               BRAND
//           ================================================== */}

//           <div>
//             <img
//               src={assets.logo}
//               alt="NeuralForge"
//               className="w-36"
//             />

//             <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
//               Experience the power of AI with NeuralForge. Transform your
//               content creation with powerful AI tools designed to help you
//               create more, faster.
//             </p>

//             {/* Mini Badge */}
//             <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50/80 px-4 py-2 text-xs font-medium text-slate-600 shadow-sm">
//               <Sparkles className="h-3.5 w-3.5 text-primary" />
//               AI-powered creativity
//             </div>
//           </div>

//           {/* =================================================
//               COMPANY
//           ================================================== */}

//           <div>
//             <h2 className="text-sm font-bold text-slate-900">
//               Company
//             </h2>

//             <ul className="mt-4 space-y-1.5 text-sm text-slate-500">
//               <li>
//                 <Link
//                   to="/"
//                   onClick={scrollToTop}
//                   className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary"
//                 >
//                   Home
//                   <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
//                 </Link>
//               </li>

//               <li>
//                 <button
//                   onClick={() => {
//                     const section = document.getElementById("ai-tools");

//                     if (section) {
//                       section.scrollIntoView({
//                         behavior: "smooth",
//                       });
//                     }
//                   }}
//                   className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary"
//                 >
//                   AI Tools
//                   <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
//                 </button>
//               </li>

//               <li>
//                 <Link
//                   to="/about"
//                   className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary"
//                 >
//                   About us
//                   <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/contact"
//                   className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary"
//                 >
//                   Contact us
//                   <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
//                 </Link>
//               </li>

//               <li>
//                 <Link
//                   to="/privacy"
//                   className="group inline-flex items-center gap-1 transition-colors duration-200 hover:text-primary"
//                 >
//                   Privacy policy
//                   <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
//                 </Link>
//               </li>
//             </ul>
//           </div>

//           {/* =================================================
//               NEWSLETTER
//           ================================================== */}

//           <div>
//             <div className="relative overflow-hidden rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/70 via-white to-indigo-50/70 p-5 shadow-sm">
//               {/* Card Glow */}
//               <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full bg-purple-200/30 blur-2xl" />

//               <div className="relative z-10">
//                 <div className="flex items-center gap-2">
//                   <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
//                     <Sparkles className="h-4 w-4 text-primary" />
//                   </div>

//                   <h2 className="text-sm font-bold text-slate-900">
//                     Stay in the loop
//                   </h2>
//                 </div>

//                 <p className="mt-3 text-sm leading-6 text-slate-500">
//                   Get the latest AI tips, product updates, and useful
//                   resources delivered straight to your inbox.
//                 </p>

//                 {/* Newsletter Input */}
//                 <div className="mt-4 flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-sm transition-all duration-200 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-indigo-50">
//                   <input
//                     className="h-9 min-w-0 flex-1 bg-transparent px-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
//                     type="email"
//                     placeholder="Enter your email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />

//                   <button
//                     onClick={handleSubscribe}
//                     disabled={loading}
//                     className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:px-4"
//                   >
//                     {loading ? "..." : "Subscribe"}

//                     {!loading && (
//                       <ArrowRight className="h-3.5 w-3.5" />
//                     )}
//                   </button>
//                 </div>

//                 <p className="mt-2 text-[10px] text-slate-400">
//                   No spam. Only useful updates.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* =====================================================
//             BOTTOM
//         ====================================================== */}

//         <div className="flex flex-col items-center justify-between gap-3 py-5 text-center text-xs text-slate-400 sm:flex-row sm:text-left">
//           <p>
//             Copyright 2026 © NeuralForge. All Right Reserved.
//           </p>

//           <div className="flex items-center gap-1.5">
//             <span>Built with AI & creativity</span>
//             <span className="text-sm">✨</span>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  ChevronRight,
  Zap,
  ShieldCheck,
  WandSparkles,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import { assets } from "../assets/assets";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    if (!email) return toast.error("Please enter your email");

    setLoading(true);

    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/newsletter-subscribe`,
        { email },
      );

      if (data.success) {
        toast.success("Subscribed successfully!");
        setEmail("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer
      id="about"
      className="relative mt-16 overflow-hidden border-t border-slate-100 bg-white px-5 pt-14 sm:px-8 lg:px-10"
    >
      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-purple-100/35 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-indigo-100/30 blur-3xl" />

      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-pink-50/30 blur-3xl" />

      {/* Top Accent */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[2px] w-52 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =====================================================
            BRAND + HIGHLIGHTS
        ====================================================== */}

        <div className="grid gap-10 border-b border-slate-100 pb-10 md:grid-cols-2 lg:grid-cols-[1.25fr_0.65fr_1fr]">
          {/* Brand */}
          <div>
            <img
              src={assets.logo}
              alt="NeuralForge"
              className="w-36"
            />

            <p className="mt-4 max-w-md text-sm leading-6 text-slate-500">
              Experience the power of AI with NeuralForge. Transform your
              content creation with powerful AI tools designed to help you
              create more, faster.
            </p>

            {/* Feature Badges */}
            <div className="mt-5 flex flex-wrap gap-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-purple-50/80 px-3.5 py-2 text-xs font-medium text-slate-600 shadow-sm">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                AI-powered creativity
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/70 px-3.5 py-2 text-xs font-medium text-slate-600">
                <ShieldCheck className="h-3.5 w-3.5 text-indigo-500" />
                Privacy focused
              </div>
            </div>

            {/* Mini Highlights */}
            <div className="mt-7 flex flex-wrap gap-x-7 gap-y-3">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-50">
                  <Zap className="h-3.5 w-3.5 text-indigo-500" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-700">
                    Fast & Reliable
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Built for productivity
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-50">
                  <WandSparkles className="h-3.5 w-3.5 text-purple-500" />
                </div>

                <div>
                  <p className="text-[11px] font-semibold text-slate-700">
                    AI Powered
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Smarter creative tools
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Company */}
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Company
            </h2>

            <ul className="mt-4 space-y-1">
              <li>
                <Link
                  to="/"
                  onClick={scrollToTop}
                  className="group flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition-all duration-200 hover:bg-purple-50 hover:text-primary"
                >
                  Home

                  <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="group flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition-all duration-200 hover:bg-purple-50 hover:text-primary"
                >
                  About us

                  <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="group flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition-all duration-200 hover:bg-purple-50 hover:text-primary"
                >
                  Contact us

                  <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>

              <li>
                <Link
                  to="/privacy"
                  className="group flex w-fit items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-slate-500 transition-all duration-200 hover:bg-purple-50 hover:text-primary"
                >
                  Privacy policy

                  <ChevronRight className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <div className="relative overflow-hidden rounded-3xl border border-purple-100/80 bg-gradient-to-br from-purple-50/80 via-white to-indigo-50/70 p-5 shadow-[0_8px_30px_rgba(79,70,229,0.06)]">
              {/* Newsletter Glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-purple-200/35 blur-3xl" />

              <div className="pointer-events-none absolute -bottom-10 -left-10 h-28 w-28 rounded-full bg-indigo-200/25 blur-3xl" />

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white shadow-sm">
                    <Sparkles className="h-4 w-4 text-primary" />
                  </div>

                  <div>
                    <h2 className="text-sm font-bold text-slate-900">
                      Stay in the loop
                    </h2>

                    <p className="mt-0.5 text-[10px] text-slate-400">
                      Get useful updates
                    </p>
                  </div>
                </div>

                <p className="mt-3 text-sm leading-5 text-slate-500">
                  Get the latest AI tips, product updates, and useful
                  resources delivered straight to your inbox.
                </p>

                {/* Newsletter Input */}
                <div className="mt-4 flex items-center gap-1.5 rounded-xl border border-slate-200/80 bg-white p-1.5 shadow-sm transition-all duration-200 focus-within:border-primary/40 focus-within:ring-4 focus-within:ring-indigo-50">
                  <input
                    className="h-9 min-w-0 flex-1 bg-transparent px-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <button
                    onClick={handleSubscribe}
                    disabled={loading}
                    className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3.5 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0 sm:px-4"
                  >
                    {loading ? "..." : "Subscribe"}

                    {!loading && (
                      <ArrowRight className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                {/* Trust Text */}
                <div className="mt-3 flex items-center gap-1.5 text-[10px] text-slate-400">
                  <ShieldCheck className="h-3 w-3 text-emerald-500" />
                  No spam. Only useful updates.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================
            BOTTOM BAR
        ====================================================== */}

        <div className="flex flex-col items-center justify-between gap-4 py-5 text-center sm:flex-row sm:text-left">
          <p className="text-xs text-slate-400">
            Copyright 2026 © NeuralForge. All Right Reserved.
          </p>

          <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-white px-3.5 py-1.5 shadow-sm">
            <span className="text-[11px] text-slate-400">
              Built with AI & creativity
            </span>

            <span className="text-sm">✨</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;