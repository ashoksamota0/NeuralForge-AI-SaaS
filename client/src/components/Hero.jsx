// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useUser } from "@clerk/clerk-react";
// import {
//   ArrowRight,
//   Sparkles,
//   Users,
//   Zap,
//   ShieldCheck,
//   Infinity,
// } from "lucide-react";
// import { AiToolsData } from "../assets/assets";
// import neuralforgeIcon from "../assets/neuralforge-icon.png";

// const Hero = () => {
//   const navigate = useNavigate();
//   const { user } = useUser();

//   const [mouse, setMouse] = useState({ x: 0, y: 0 });

//   const handleMouseMove = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();

//     const x = (e.clientX - rect.left) / rect.width - 0.5;
//     const y = (e.clientY - rect.top) / rect.height - 0.5;

//     setMouse({
//       x: x * 12,
//       y: y * 12,
//     });
//   };

//   const handleMouseLeave = () => {
//     setMouse({ x: 0, y: 0 });
//   };

//   const handleToolClick = (path) => {
//     if (user) {
//       navigate(path);
//     }
//   };

//   return (
//     <section
//       id="features"
//       className="relative min-h-[calc(100vh-80px)] w-full overflow-visible bg-gradient-to-br from-white via-purple-50/40 to-blue-50/60 px-4 pb-8 pt-31 sm:px-8 lg:px-12"
//     >
//       {/* =====================================================
//           BACKGROUND GLOWS
//       ====================================================== */}

//       <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />

//       <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-200/25 blur-3xl" />

//       <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-200/20 blur-3xl" />

//       <div className="pointer-events-none absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" />

//       {/* =====================================================
//           MAIN CONTENT
//       ====================================================== */}

//       <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
//         {/* =================================================
//             LEFT SIDE
//         ================================================== */}

//         <div className="relative text-center lg:text-left">
//           {/* Badge */}
//           <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/80 px-4 py-2 text-xs font-medium text-indigo-700 shadow-sm backdrop-blur-md sm:text-sm">
//             <Sparkles className="h-4 w-4 text-orange-400" />
//             Empowering the Next Generation
//           </div>

//           {/* Heading */}
//           <h1 className="max-w-2xl text-4xl font-bold leading-[1.03] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[62px]">
//             Your All-in-One
//             <br />
//             AI{" "}
//             <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
//               Creative Suite
//             </span>
//           </h1>

//           {/* Description */}
//           <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
//             Write, design, edit and optimize with the power of AI.
//             <br className="hidden sm:block" />
//             Simple. Fast. Powerful.
//           </p>

//           {/* Buttons */}
//           <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
//             <button
//               onClick={() => navigate("/ai")}
//               className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
//             >
//               Start for Free
//               <ArrowRight className="h-4 w-4" />
//             </button>

//             <button
//               onClick={() =>
//                 document.getElementById("ai-tools")?.scrollIntoView({
//                   behavior: "smooth",
//                 })
//               }
//               className="cursor-pointer rounded-xl border border-slate-200 bg-white/85 px-7 py-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-md active:scale-95"
//             >
//               Explore Tools
//             </button>
//           </div>

//           {/* Trust */}
//           <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-500 sm:text-sm lg:justify-start">
//             <div className="flex -space-x-2">
//               <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-bold text-indigo-600">
//                 AI
//               </div>

//               <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-[10px] font-bold text-purple-600">
//                 NF
//               </div>

//               <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-pink-100 text-[10px] font-bold text-pink-600">
//                 +
//               </div>
//             </div>

//             <span>
//               <strong className="font-semibold text-slate-800">10K+</strong>{" "}
//               creators already using NeuralForge
//             </span>
//           </div>

//           {/* Benefits */}
//           <div className="mt-8 grid max-w-xl grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
//             <div className="flex items-center gap-2 text-xs text-slate-500">
//               <Zap className="h-4 w-4 shrink-0 text-indigo-600" />
//               <span>Fast & Reliable</span>
//             </div>

//             <div className="flex items-center gap-2 text-xs text-slate-500">
//               <ShieldCheck className="h-4 w-4 shrink-0 text-purple-600" />
//               <span>Privacy Focused</span>
//             </div>

//             <div className="flex items-center gap-2 text-xs text-slate-500">
//               <Users className="h-4 w-4 shrink-0 text-pink-500" />
//               <span>Loved by 10K+</span>
//             </div>

//             <div className="flex items-center gap-2 text-xs text-slate-500">
//               <Infinity className="h-4 w-4 shrink-0 text-indigo-600" />
//               <span>Always Improving</span>
//             </div>
//           </div>
//         </div>

//         {/* =================================================
//             RIGHT SIDE — AI TOOLS
//         ================================================== */}

//         <div
//           id="ai-tools"
//           onMouseMove={handleMouseMove}
//           onMouseLeave={handleMouseLeave}
//           className="relative mx-auto w-full max-w-[680px]"
//         >
//           {/* Soft 3D glow behind tools */}
//           <div
//             className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-200/35 via-purple-200/30 to-pink-200/25 blur-3xl transition-transform duration-300"
//             style={{
//               transform: `translate(calc(-50% + ${
//                 mouse.x * 0.2
//               }px), calc(-50% + ${mouse.y * 0.2}px))`,
//             }}
//           />

//           {/* =================================================
//               SUBTLE CENTRAL ORB
//           ================================================== */}

//           <div
//             className="pointer-events-none absolute left-1/2 top-1/2 hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 lg:block"
//             style={{
//               transform: `translate(calc(-50% + ${
//                 mouse.x * 0.35
//               }px), calc(-50% + ${mouse.y * 0.35}px))`,
//             }}
//           >
//             <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-purple-100/80 to-blue-200/70 shadow-[inset_-12px_-12px_25px_rgba(79,70,229,0.16),inset_8px_8px_20px_rgba(255,255,255,0.95),0_20px_45px_rgba(79,70,229,0.16)]" />

//             <div className="absolute inset-2 rounded-full border border-white/80" />

//             <div className="absolute inset-5 flex items-center justify-center rounded-full bg-white/35 backdrop-blur-sm">
//               <img
//                 src={neuralforgeIcon}
//                 alt="NeuralForge"
//                 className="h-16 w-16 object-contain drop-shadow-lg"
//               />
//             </div>

//             <div className="absolute left-5 top-4 h-6 w-10 rotate-[-25deg] rounded-full bg-white/70 blur-md" />
//           </div>

//           {/* =================================================
//               TOOL GRID
//           ================================================== */}

//           <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
//             {AiToolsData.map((tool, index) => (
//               <div
//                 key={index}
//                 onClick={() => handleToolClick(tool.path)}
//                 className={`group relative min-h-[150px] overflow-hidden rounded-[20px] p-[1px] transition-all duration-300 ${
//                   user
//                     ? "cursor-pointer hover:-translate-y-1.5"
//                     : "cursor-default"
//                 }`}
//                 style={{
//                   background: `linear-gradient(145deg, ${tool.bg.from}55, #ffffff 45%, ${tool.bg.to}45)`,
//                 }}
//               >
//                 <div className="relative flex h-full min-h-[150px] flex-col overflow-hidden rounded-[19px] border border-white/80 bg-white/90 p-4 shadow-[0_8px_25px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_18px_40px_rgba(79,70,229,0.12)] sm:p-5">
//                   {/* Bottom pastel wave */}
//                   <div
//                     className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-48 rounded-full opacity-50 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
//                     style={{
//                       background: `linear-gradient(90deg, ${tool.bg.from}45, ${tool.bg.to}35)`,
//                     }}
//                   />

//                   {/* Icon */}
//                   <div
//                     className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
//                     style={{
//                       background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
//                     }}
//                   >
//                     <tool.Icon className="h-5.5 w-5.5 text-white" />
//                   </div>

//                   {/* Title */}
//                   <h3 className="relative z-10 mt-3 text-sm font-semibold leading-5 text-slate-900">
//                     {tool.title}
//                   </h3>

//                   {/* Description */}
//                   <p className="relative z-10 mt-1.5 pr-8 text-[11px] leading-[1.5] text-slate-500 sm:text-xs">
//                     {tool.description}
//                   </p>

//                   {/* Arrow */}
//                   <div className="absolute bottom-3.5 right-3.5 z-10">
//                     <div
//                       className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110"
//                       style={{
//                         background: `linear-gradient(145deg, ${tool.bg.from}18, ${tool.bg.to}25)`,
//                         borderColor: `${tool.bg.from}30`,
//                       }}
//                     >
//                       <ArrowRight
//                         className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
//                         style={{
//                           color: tool.bg.from,
//                         }}
//                       />
//                     </div>
//                   </div>

//                   {/* Hover border */}
//                   <div
//                     className="pointer-events-none absolute inset-0 rounded-[19px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
//                     style={{
//                       boxShadow: `inset 0 0 0 1px ${tool.bg.from}35`,
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* =================================================
//               DECORATIVE DETAILS
//           ================================================== */}

//           <div className="pointer-events-none absolute -right-2 -top-8 rotate-[-4deg] text-right text-xs font-medium text-purple-600 sm:-right-6">
//             <p>6 Powerful Tools</p>
//             <p>Endless Possibilities</p>

//             <div className="mt-1 text-lg">↙</div>
//           </div>
//         </div>
//       </div>

//       {/* =====================================================
//           SCROLL INDICATOR
//       ====================================================== */}

//       <div className="pointer-events-none absolute bottom-[-32px] left-1/2 z-20 -translate-x-1/2 text-center">
//         <div className="flex flex-col items-center text-slate-400">
//           <span className="animate-bounce text-lg leading-none">⌄</span>

//           <span className="mt-0.5 text-[11px] font-medium tracking-wide">
//             Scroll below
//           </span>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useClerk, useUser } from "@clerk/clerk-react";
import {
  ArrowRight,
  Sparkles,
  Users,
  Zap,
  ShieldCheck,
  Infinity,
} from "lucide-react";
import { AiToolsData } from "../assets/assets";
import neuralforgeIcon from "../assets/neuralforge-icon.png";

const Hero = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { openSignIn } = useClerk();

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMouse({
      x: x * 12,
      y: y * 12,
    });
  };

  const handleMouseLeave = () => {
    setMouse({ x: 0, y: 0 });
  };

  const handleToolClick = (path) => {
    if (user) {
      navigate(path);
    } else {
      openSignIn();
    }
  };

  return (
    <section
      id="features"
      className="relative min-h-[calc(100vh-80px)] w-full overflow-visible bg-gradient-to-br from-white via-purple-50/40 to-blue-50/60 px-4 pb-8 pt-31 sm:px-8 lg:px-12"
    >
      {/* =====================================================
          BACKGROUND GLOWS
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-purple-200/25 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-blue-200/25 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-pink-200/20 blur-3xl" />

      <div className="pointer-events-none absolute right-1/4 top-1/3 h-80 w-80 rounded-full bg-indigo-200/20 blur-3xl" />

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10">
        {/* =================================================
            LEFT SIDE
        ================================================== */}

        <div className="relative text-center lg:text-left">
          {/* Badge */}

          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/80 px-4 py-2 text-xs font-medium text-indigo-700 shadow-sm backdrop-blur-md sm:text-sm">
            <Sparkles className="h-4 w-4 text-orange-400" />
            Empowering the Next Generation
          </div>

          {/* Heading */}

          <h1 className="max-w-2xl text-4xl font-bold leading-[1.03] tracking-tight text-slate-900 sm:text-5xl md:text-6xl lg:text-[58px] xl:text-[62px]">
            Your All-in-One
            <br />
            AI{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 bg-clip-text text-transparent">
              Creative Suite
            </span>
          </h1>

          {/* Description */}

          <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500 sm:text-base">
            Write, design, edit and optimize with the power of AI.
            <br className="hidden sm:block" />
            Simple. Fast. Powerful.
          </p>

          {/* Buttons */}

          <div className="mt-7 flex flex-wrap justify-center gap-3 lg:justify-start">
            <button
              onClick={() => navigate("/ai")}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-500 px-7 py-3 text-sm font-medium text-white shadow-lg shadow-purple-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl active:scale-95"
            >
              Start for Free
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() =>
                document.getElementById("ai-tools")?.scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="cursor-pointer rounded-xl border border-slate-200 bg-white/85 px-7 py-3 text-sm font-medium text-slate-800 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-200 hover:shadow-md active:scale-95"
            >
              Explore Tools
            </button>
          </div>

          {/* Trust */}

          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-500 sm:text-sm lg:justify-start">
            <div className="flex -space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-indigo-100 text-[10px] font-bold text-indigo-600">
                AI
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-purple-100 text-[10px] font-bold text-purple-600">
                NF
              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-pink-100 text-[10px] font-bold text-pink-600">
                +
              </div>
            </div>

            <span>
              <strong className="font-semibold text-slate-800">10K+</strong>{" "}
              creators already using NeuralForge
            </span>
          </div>

          {/* Benefits */}

          <div className="mt-8 grid max-w-xl grid-cols-2 gap-x-5 gap-y-4 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Zap className="h-4 w-4 shrink-0 text-indigo-600" />
              <span>Fast & Reliable</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <ShieldCheck className="h-4 w-4 shrink-0 text-purple-600" />
              <span>Privacy Focused</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Users className="h-4 w-4 shrink-0 text-pink-500" />
              <span>Loved by 10K+</span>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Infinity className="h-4 w-4 shrink-0 text-indigo-600" />
              <span>Always Improving</span>
            </div>
          </div>
        </div>

        {/* =================================================
            RIGHT SIDE — AI TOOLS
        ================================================== */}

        <div
          id="ai-tools"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative mx-auto w-full max-w-[680px]"
        >
          {/* Soft 3D glow behind tools */}

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-br from-indigo-200/35 via-purple-200/30 to-pink-200/25 blur-3xl transition-transform duration-300"
            style={{
              transform: `translate(calc(-50% + ${
                mouse.x * 0.2
              }px), calc(-50% + ${mouse.y * 0.2}px))`,
            }}
          />

          {/* =================================================
              SUBTLE CENTRAL ORB
          ================================================== */}

          <div
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-32 w-32 -translate-x-1/2 -translate-y-1/2 lg:block"
            style={{
              transform: `translate(calc(-50% + ${
                mouse.x * 0.35
              }px), calc(-50% + ${mouse.y * 0.35}px))`,
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-purple-100/80 to-blue-200/70 shadow-[inset_-12px_-12px_25px_rgba(79,70,229,0.16),inset_8px_8px_20px_rgba(255,255,255,0.95),0_20px_45px_rgba(79,70,229,0.16)]" />

            <div className="absolute inset-2 rounded-full border border-white/80" />

            <div className="absolute inset-5 flex items-center justify-center rounded-full bg-white/35 backdrop-blur-sm">
              <img
                src={neuralforgeIcon}
                alt="NeuralForge"
                className="h-16 w-16 object-contain drop-shadow-lg"
              />
            </div>

            <div className="absolute left-5 top-4 h-6 w-10 rotate-[-25deg] rounded-full bg-white/70 blur-md" />
          </div>

          {/* =================================================
              TOOL GRID
          ================================================== */}

          <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {AiToolsData.map((tool, index) => (
              <div
                key={index}
                onClick={() => handleToolClick(tool.path)}
                className="group relative min-h-[150px] cursor-pointer overflow-hidden rounded-[20px] p-[1px] transition-all duration-300 hover:-translate-y-1.5"
                style={{
                  background: `linear-gradient(145deg, ${tool.bg.from}55, #ffffff 45%, ${tool.bg.to}45)`,
                }}
              >
                <div className="relative flex h-full min-h-[150px] flex-col overflow-hidden rounded-[19px] border border-white/80 bg-white/90 p-4 shadow-[0_8px_25px_rgba(15,23,42,0.05)] backdrop-blur-xl transition-all duration-300 group-hover:shadow-[0_18px_40px_rgba(79,70,229,0.12)] sm:p-5">
                  {/* Bottom pastel wave */}

                  <div
                    className="pointer-events-none absolute -bottom-10 -left-8 h-24 w-48 rounded-full opacity-50 blur-2xl transition-opacity duration-300 group-hover:opacity-80"
                    style={{
                      background: `linear-gradient(90deg, ${tool.bg.from}45, ${tool.bg.to}35)`,
                    }}
                  />

                  {/* Icon */}

                  <div
                    className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl shadow-md transition-all duration-300 group-hover:-translate-y-0.5 group-hover:scale-105"
                    style={{
                      background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
                    }}
                  >
                    <tool.Icon className="h-5.5 w-5.5 text-white" />
                  </div>

                  {/* Title */}

                  <h3 className="relative z-10 mt-3 text-sm font-semibold leading-5 text-slate-900">
                    {tool.title}
                  </h3>

                  {/* Description */}

                  <p className="relative z-10 mt-1.5 pr-8 text-[11px] leading-[1.5] text-slate-500 sm:text-xs">
                    {tool.description}
                  </p>

                  {/* Arrow */}

                  <div className="absolute bottom-3.5 right-3.5 z-10">
                    <div
                      className="flex h-8 w-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `linear-gradient(145deg, ${tool.bg.from}18, ${tool.bg.to}25)`,
                        borderColor: `${tool.bg.from}30`,
                      }}
                    >
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                        style={{
                          color: tool.bg.from,
                        }}
                      />
                    </div>
                  </div>

                  {/* Hover border */}

                  <div
                    className="pointer-events-none absolute inset-0 rounded-[19px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 0 1px ${tool.bg.from}35`,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* =================================================
              DECORATIVE DETAILS
          ================================================== */}

          <div className="pointer-events-none absolute -right-2 -top-8 rotate-[-4deg] text-right text-xs font-medium text-purple-600 sm:-right-6">
            <p>6 Powerful Tools</p>
            <p>Endless Possibilities</p>

            <div className="mt-1 text-lg">↙</div>
          </div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
      ====================================================== */}

      <div className="pointer-events-none absolute bottom-[-32px] left-1/2 z-20 -translate-x-1/2 text-center">
        <div className="flex flex-col items-center text-slate-400">
          <span className="animate-bounce text-lg leading-none">⌄</span>

          <span className="mt-0.5 text-[11px] font-medium tracking-wide">
            Scroll below
          </span>
        </div>
      </div>
    </section>
  );
};

export default Hero;