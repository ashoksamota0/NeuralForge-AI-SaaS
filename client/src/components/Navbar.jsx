// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { assets, AiToolsData } from "../assets/assets";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { user } = useUser();
//   const { openSignIn, openSignUp } = useClerk();

//   const [activeSection, setActiveSection] = useState("home");
//   const [toolsOpen, setToolsOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

//   const toolsRef = useRef(null);

//   // =========================================================
//   // CLOSE MENUS
//   // =========================================================

//   const closeMenus = () => {
//     setToolsOpen(false);
//     setMobileOpen(false);
//     setMobileToolsOpen(false);
//   };

//   // =========================================================
//   // HOME
//   // =========================================================

//   const goHome = () => {
//     closeMenus();

//     if (location.pathname === "/") {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } else {
//       navigate("/");
//     }
//   };

//   // =========================================================
//   // SECTION NAVIGATION
//   // =========================================================

//   const scrollToSection = (id) => {
//     closeMenus();

//     if (location.pathname !== "/") {
//       navigate("/");

//       setTimeout(() => {
//         const section = document.getElementById(id);

//         if (section) {
//           section.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       }, 100);

//       return;
//     }

//     const section = document.getElementById(id);

//     if (section) {
//       section.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   // =========================================================
//   // PAGE NAVIGATION
//   // =========================================================

//   const goToPage = (path) => {
//     closeMenus();
//     navigate(path);
//   };

//   // =========================================================
//   // AI TOOL NAVIGATION
//   // =========================================================

//   const handleToolClick = (path) => {
//     closeMenus();

//     if (user) {
//       navigate(path);
//     } else {
//       openSignIn();
//     }
//   };

//   // =========================================================
//   // ACTIVE SECTION
//   // =========================================================

//   useEffect(() => {
//     if (location.pathname !== "/") {
//       if (location.pathname === "/about") {
//         setActiveSection("about");
//       } else {
//         setActiveSection("");
//       }

//       return;
//     }

//     const handleScroll = () => {
//       const sections = [
//         {
//           id: "features",
//           name: "features",
//         },
//         {
//           id: "ai-tools",
//           name: "ai-tools",
//         },
//         {
//           id: "pricing",
//           name: "pricing",
//         },
//       ];

//       const scrollPosition = window.scrollY + 150;

//       if (window.scrollY < 100) {
//         setActiveSection("home");
//         return;
//       }

//       let currentSection = "home";

//       sections.forEach((section) => {
//         const element = document.getElementById(section.id);

//         if (element && scrollPosition >= element.offsetTop) {
//           currentSection = section.name;
//         }
//       });

//       setActiveSection(currentSection);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [location.pathname]);

//   // =========================================================
//   // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
//   // =========================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (toolsRef.current && !toolsRef.current.contains(event.target)) {
//         setToolsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // =========================================================
//   // DESKTOP NAV ITEM
//   // =========================================================

//   const NavItem = ({ children, active, onClick }) => {
//     return (
//       <button
//         onClick={onClick}
//         className={`group relative py-2 text-sm font-semibold transition-colors duration-200 ${
//           active ? "text-primary" : "text-slate-700 hover:text-primary"
//         }`}
//       >
//         {children}

//         <span
//           className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
//             active
//               ? "w-5 opacity-100"
//               : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
//           }`}
//         />
//       </button>
//     );
//   };

//   return (
//     <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-100/80 bg-white/95 shadow-sm backdrop-blur-xl">
//       <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
//         {/* =====================================================
//             LOGO
//         ====================================================== */}

//         <button
//           onClick={goHome}
//           className="shrink-0 cursor-pointer"
//           aria-label="NeuralForge Home"
//         >
//           <img src={assets.logo} alt="NeuralForge" className="w-32 sm:w-36" />
//         </button>

//         {/* =====================================================
//             DESKTOP NAVIGATION
//         ====================================================== */}

//         <div className="hidden items-center gap-8 lg:flex">
//           {/* Home */}

//           <NavItem active={activeSection === "home"} onClick={goHome}>
//             Home
//           </NavItem>

//           {/* Features */}

//           {/* <NavItem
//             active={activeSection === "features"}
//             onClick={() => scrollToSection("features")}
//           >
//             Features
//           </NavItem> */}

//           {/* =================================================
//               AI TOOLS DROPDOWN
//           ================================================== */}

//           <div ref={toolsRef} className="relative">
//             <button
//               onClick={() => setToolsOpen((prev) => !prev)}
//               className={`group relative flex items-center gap-1.5 py-2 text-sm font-semibold transition-colors duration-200 ${
//                 activeSection === "ai-tools" || toolsOpen
//                   ? "text-primary"
//                   : "text-slate-700 hover:text-primary"
//               }`}
//             >
//               AI Tools
//               <ChevronDown
//                 className={`h-3.5 w-3.5 transition-transform duration-200 ${
//                   toolsOpen ? "rotate-180" : ""
//                 }`}
//               />
//               <span
//                 className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
//                   activeSection === "ai-tools" || toolsOpen
//                     ? "w-5 opacity-100"
//                     : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
//                 }`}
//               />
//             </button>

//             {/* =================================================
//                 AI TOOLS DROPDOWN
//             ================================================== */}

//             <div
//               className={`absolute left-1/2 top-full mt-4 w-[370px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_55px_rgba(15,23,42,0.13)] transition-all duration-200 ${
//                 toolsOpen
//                   ? "visible translate-y-0 opacity-100"
//                   : "invisible -translate-y-2 opacity-0"
//               }`}
//             >
//               {/* Top Accent */}

//               <div className="absolute left-1/2 top-0 h-0.5 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400" />

//               {/* Header */}

//               <div className="px-3 pb-2 pt-2.5">
//                 <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
//                   AI Creative Tools
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   Create faster with NeuralForge
//                 </p>
//               </div>

//               {/* Tools */}

//               <div className="grid grid-cols-2 gap-1">
//                 {AiToolsData.map((tool, index) => {
//                   const Icon = tool.Icon;

//                   return (
//                     <button
//                       key={tool.title || index}
//                       onClick={() => handleToolClick(tool.path)}
//                       className="group flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-slate-50"
//                     >
//                       {/* Icon */}

//                       <div
//                         className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
//                         style={{
//                           background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
//                         }}
//                       >
//                         <Icon className="h-4 w-4 text-white" />
//                       </div>

//                       {/* Text */}

//                       <div className="min-w-0 flex-1">
//                         <p className="text-[11px] font-semibold leading-4 text-slate-800 transition-colors group-hover:text-primary">
//                           {tool.title}
//                         </p>

//                         <p className="mt-0.5 line-clamp-2 text-[9px] leading-3.5 text-slate-400">
//                           {tool.description}
//                         </p>
//                       </div>

//                       {/* Arrow */}

//                       <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* View All */}

//               <button
//                 onClick={() => scrollToSection("ai-tools")}
//                 className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border-t border-slate-100 py-2.5 text-[11px] font-semibold text-primary transition hover:bg-purple-50"
//               >
//                 Explore all AI tools
//                 <ArrowRight className="h-3.5 w-3.5" />
//               </button>
//             </div>
//           </div>

//           {/* Pricing */}

//           <NavItem
//             active={activeSection === "pricing"}
//             onClick={() => scrollToSection("pricing")}
//           >
//             Pricing
//           </NavItem>

//           {/* About */}

//           <NavItem
//             active={activeSection === "about"}
//             onClick={() => goToPage("/about")}
//           >
//             About
//           </NavItem>
//         </div>

//         {/* =====================================================
//             DESKTOP RIGHT SIDE
//         ====================================================== */}

//         <div className="hidden items-center gap-3 sm:flex">
//           {!user ? (
//             <>
//               {/* Sign In */}

//               <button
//                 onClick={openSignIn}
//                 className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
//               >
//                 Login
//               </button>

//               {/* Get Started */}

//               <button
//                 onClick={openSignUp}
//                 className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:scale-95 sm:px-6"
//               >
//                 Sign Up
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             </>
//           ) : (
//             <UserButton />
//           )}
//         </div>

//         {/* =====================================================
//             MOBILE RIGHT SIDE
//         ====================================================== */}

//         <div className="flex items-center gap-2 sm:hidden">
//           {user ? (
//             <UserButton />
//           ) : (
//             <>
//               <button
//                 onClick={openSignIn}
//                 className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
//               >
//                 Sign In
//               </button>

//               <button
//                 onClick={() => setMobileOpen((prev) => !prev)}
//                 className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
//                 aria-label="Toggle menu"
//               >
//                 {mobileOpen ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Menu className="h-5 w-5" />
//                 )}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           MOBILE MENU
//       ====================================================== */}

//       <div
//         className={`border-t border-slate-100 bg-white transition-all duration-300 sm:hidden ${
//           mobileOpen
//             ? "max-h-[650px] opacity-100"
//             : "max-h-0 overflow-hidden opacity-0"
//         }`}
//       >
//         <div className="mx-auto max-w-7xl px-5 py-4">
//           <div className="space-y-1">
//             {/* Home */}

//             <button
//               onClick={goHome}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "home"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Home
//               {activeSection === "home" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* Features */}

//             <button
//               onClick={() => scrollToSection("features")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "features"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Features
//               {activeSection === "features" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* AI Tools */}

//             <button
//               onClick={() => setMobileToolsOpen((prev) => !prev)}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "ai-tools"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               <span>AI Tools</span>

//               <ChevronDown
//                 className={`h-4 w-4 transition-transform duration-200 ${
//                   mobileToolsOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {/* Mobile AI Tools */}

//             <div
//               className={`overflow-hidden transition-all duration-300 ${
//                 mobileToolsOpen
//                   ? "max-h-[500px] opacity-100"
//                   : "max-h-0 opacity-0"
//               }`}
//             >
//               <div className="ml-3 space-y-1 border-l border-purple-100 pl-3">
//                 {AiToolsData.map((tool, index) => {
//                   const Icon = tool.Icon;

//                   return (
//                     <button
//                       key={tool.title || index}
//                       onClick={() => handleToolClick(tool.path)}
//                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
//                     >
//                       {/* Icon */}

//                       <div
//                         className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
//                         style={{
//                           background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
//                         }}
//                       >
//                         <Icon className="h-3.5 w-3.5 text-white" />
//                       </div>

//                       {/* Title */}

//                       <span className="text-xs font-medium text-slate-700">
//                         {tool.title}
//                       </span>

//                       <ChevronRight className="ml-auto h-3.5 w-3.5 text-slate-300" />
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Pricing */}

//             <button
//               onClick={() => scrollToSection("pricing")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "pricing"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Pricing
//               {activeSection === "pricing" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* About */}

//             <button
//               onClick={() => goToPage("/about")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "about"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               About
//               {activeSection === "about" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>
//           </div>

//           {/* Mobile CTA */}

//           {!user && (
//             <button
//               onClick={openSignUp}
//               className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition active:scale-[0.98]"
//             >
//               Get Started
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { assets, AiToolsData } from "../assets/assets";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { user } = useUser();
//   const { openSignIn, openSignUp } = useClerk();

//   const [activeSection, setActiveSection] = useState("home");
//   const [toolsOpen, setToolsOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

//   const toolsRef = useRef(null);

//   // =========================================================
//   // CLOSE MENUS
//   // =========================================================

//   const closeMenus = () => {
//     setToolsOpen(false);
//     setMobileOpen(false);
//     setMobileToolsOpen(false);
//   };

//   // =========================================================
//   // HOME
//   // =========================================================

//   const goHome = () => {
//     closeMenus();

//     if (location.pathname === "/") {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } else {
//       navigate("/");
//     }
//   };

//   // =========================================================
//   // SECTION NAVIGATION
//   // =========================================================

//   const scrollToSection = (id) => {
//     closeMenus();

//     if (location.pathname !== "/") {
//       navigate("/");

//       setTimeout(() => {
//         const section = document.getElementById(id);

//         if (section) {
//           section.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       }, 100);

//       return;
//     }

//     const section = document.getElementById(id);

//     if (section) {
//       section.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   // =========================================================
//   // PAGE NAVIGATION
//   // =========================================================

//   const goToPage = (path) => {
//     closeMenus();
//     navigate(path);
//   };

//   // =========================================================
//   // AI TOOL NAVIGATION
//   // =========================================================

//   const handleToolClick = (path) => {
//     closeMenus();

//     if (user) {
//       navigate(path);
//     } else {
//       openSignIn();
//     }
//   };

//   // =========================================================
//   // ACTIVE SECTION
//   // =========================================================

//   useEffect(() => {
//     if (location.pathname !== "/") {
//       if (location.pathname === "/about") {
//         setActiveSection("about");
//       } else {
//         setActiveSection("");
//       }

//       return;
//     }

//     const handleScroll = () => {
//       const sections = [
//         {
//           id: "features",
//           name: "features",
//         },
//         {
//           id: "ai-tools",
//           name: "ai-tools",
//         },
//         {
//           id: "pricing",
//           name: "pricing",
//         },
//         {
//           id: "faq",
//           name: "faq",
//         },
//       ];

//       const scrollPosition = window.scrollY + 150;

//       if (window.scrollY < 100) {
//         setActiveSection("home");
//         return;
//       }

//       let currentSection = "home";

//       sections.forEach((section) => {
//         const element = document.getElementById(section.id);

//         if (element && scrollPosition >= element.offsetTop) {
//           currentSection = section.name;
//         }
//       });

//       setActiveSection(currentSection);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [location.pathname]);

//   // =========================================================
//   // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
//   // =========================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (toolsRef.current && !toolsRef.current.contains(event.target)) {
//         setToolsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // =========================================================
//   // DESKTOP NAV ITEM
//   // =========================================================

//   const NavItem = ({ children, active, onClick }) => {
//     return (
//       <button
//         onClick={onClick}
//         className={`group relative py-2 text-sm font-semibold transition-colors duration-200 ${
//           active ? "text-primary" : "text-slate-700 hover:text-primary"
//         }`}
//       >
//         {children}

//         <span
//           className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
//             active
//               ? "w-5 opacity-100"
//               : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
//           }`}
//         />
//       </button>
//     );
//   };

//   return (
//     <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-100/80 bg-white/95 shadow-sm backdrop-blur-xl">
//       <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
//         {/* =====================================================
//             LOGO
//         ====================================================== */}

//         <button
//           onClick={goHome}
//           className="shrink-0 cursor-pointer"
//           aria-label="NeuralForge Home"
//         >
//           <img src={assets.logo} alt="NeuralForge" className="w-32 sm:w-36" />
//         </button>

//         {/* =====================================================
//             DESKTOP NAVIGATION
//         ====================================================== */}

//         <div className="hidden items-center gap-8 lg:flex">
//           {/* Home */}

//           <NavItem active={activeSection === "home"} onClick={goHome}>
//             Home
//           </NavItem>

//           {/* Features */}

//           {/* <NavItem
//             active={activeSection === "features"}
//             onClick={() => scrollToSection("features")}
//           >
//             Features
//           </NavItem> */}

//           {/* =================================================
//               AI TOOLS DROPDOWN
//           ================================================== */}

//           <div ref={toolsRef} className="relative">
//             <button
//               onClick={() => setToolsOpen((prev) => !prev)}
//               className={`group relative flex items-center gap-1.5 py-2 text-sm font-semibold transition-colors duration-200 ${
//                 activeSection === "ai-tools" || toolsOpen
//                   ? "text-primary"
//                   : "text-slate-700 hover:text-primary"
//               }`}
//             >
//               AI Tools
//               <ChevronDown
//                 className={`h-3.5 w-3.5 transition-transform duration-200 ${
//                   toolsOpen ? "rotate-180" : ""
//                 }`}
//               />
//               <span
//                 className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
//                   activeSection === "ai-tools" || toolsOpen
//                     ? "w-5 opacity-100"
//                     : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
//                 }`}
//               />
//             </button>

//             {/* =================================================
//                 AI TOOLS DROPDOWN
//             ================================================== */}

//             <div
//               className={`absolute left-1/2 top-full mt-4 w-[370px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_55px_rgba(15,23,42,0.13)] transition-all duration-200 ${
//                 toolsOpen
//                   ? "visible translate-y-0 opacity-100"
//                   : "invisible -translate-y-2 opacity-0"
//               }`}
//             >
//               {/* Top Accent */}

//               <div className="absolute left-1/2 top-0 h-0.5 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400" />

//               {/* Header */}

//               <div className="px-3 pb-2 pt-2.5">
//                 <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
//                   AI Creative Tools
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   Create faster with NeuralForge
//                 </p>
//               </div>

//               {/* Tools */}

//               <div className="grid grid-cols-2 gap-1">
//                 {AiToolsData.map((tool, index) => {
//                   const Icon = tool.Icon;

//                   return (
//                     <button
//                       key={tool.title || index}
//                       onClick={() => handleToolClick(tool.path)}
//                       className="group flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-slate-50"
//                     >
//                       {/* Icon */}

//                       <div
//                         className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
//                         style={{
//                           background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
//                         }}
//                       >
//                         <Icon className="h-4 w-4 text-white" />
//                       </div>

//                       {/* Text */}

//                       <div className="min-w-0 flex-1">
//                         <p className="text-[11px] font-semibold leading-4 text-slate-800 transition-colors group-hover:text-primary">
//                           {tool.title}
//                         </p>

//                         <p className="mt-0.5 line-clamp-2 text-[9px] leading-3.5 text-slate-400">
//                           {tool.description}
//                         </p>
//                       </div>

//                       {/* Arrow */}

//                       <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* View All */}

//               <button
//                 onClick={() => scrollToSection("ai-tools")}
//                 className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border-t border-slate-100 py-2.5 text-[11px] font-semibold text-primary transition hover:bg-purple-50"
//               >
//                 Explore all AI tools
//                 <ArrowRight className="h-3.5 w-3.5" />
//               </button>
//             </div>
//           </div>

//           {/* Pricing */}

//           <NavItem
//             active={activeSection === "pricing"}
//             onClick={() => scrollToSection("pricing")}
//           >
//             Pricing
//           </NavItem>

//           {/* FAQ */}

//           <NavItem
//             active={activeSection === "faq"}
//             onClick={() => scrollToSection("faq")}
//           >
//             FAQ
//           </NavItem>

//           {/* About */}

//           <NavItem
//             active={activeSection === "about"}
//             onClick={() => goToPage("/about")}
//           >
//             About
//           </NavItem>
//         </div>

//         {/* =====================================================
//             DESKTOP RIGHT SIDE
//         ====================================================== */}

//         <div className="hidden items-center gap-3 sm:flex">
//           {!user ? (
//             <>
//               {/* Sign In */}

//               <button
//                 onClick={openSignIn}
//                 className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
//               >
//                 Login
//               </button>

//               {/* Get Started */}

//               <button
//                 onClick={openSignUp}
//                 className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:scale-95 sm:px-6"
//               >
//                 Sign Up
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             </>
//           ) : (
//             <UserButton />
//           )}
//         </div>

//         {/* =====================================================
//             MOBILE RIGHT SIDE
//         ====================================================== */}

//         <div className="flex items-center gap-2 sm:hidden">
//           {user ? (
//             <UserButton />
//           ) : (
//             <>
//               <button
//                 onClick={openSignIn}
//                 className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
//               >
//                 Sign In
//               </button>

//               <button
//                 onClick={() => setMobileOpen((prev) => !prev)}
//                 className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
//                 aria-label="Toggle menu"
//               >
//                 {mobileOpen ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Menu className="h-5 w-5" />
//                 )}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           MOBILE MENU
//       ====================================================== */}

//       <div
//         className={`border-t border-slate-100 bg-white transition-all duration-300 sm:hidden ${
//           mobileOpen
//             ? "max-h-[650px] opacity-100"
//             : "max-h-0 overflow-hidden opacity-0"
//         }`}
//       >
//         <div className="mx-auto max-w-7xl px-5 py-4">
//           <div className="space-y-1">
//             {/* Home */}

//             <button
//               onClick={goHome}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "home"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Home
//               {activeSection === "home" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* Features */}

//             <button
//               onClick={() => scrollToSection("features")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "features"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Features
//               {activeSection === "features" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* AI Tools */}

//             <button
//               onClick={() => setMobileToolsOpen((prev) => !prev)}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "ai-tools"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               <span>AI Tools</span>

//               <ChevronDown
//                 className={`h-4 w-4 transition-transform duration-200 ${
//                   mobileToolsOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {/* Mobile AI Tools */}

//             <div
//               className={`overflow-hidden transition-all duration-300 ${
//                 mobileToolsOpen
//                   ? "max-h-[500px] opacity-100"
//                   : "max-h-0 opacity-0"
//               }`}
//             >
//               <div className="ml-3 space-y-1 border-l border-purple-100 pl-3">
//                 {AiToolsData.map((tool, index) => {
//                   const Icon = tool.Icon;

//                   return (
//                     <button
//                       key={tool.title || index}
//                       onClick={() => handleToolClick(tool.path)}
//                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
//                     >
//                       {/* Icon */}

//                       <div
//                         className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
//                         style={{
//                           background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
//                         }}
//                       >
//                         <Icon className="h-3.5 w-3.5 text-white" />
//                       </div>

//                       {/* Title */}

//                       <span className="text-xs font-medium text-slate-700">
//                         {tool.title}
//                       </span>

//                       <ChevronRight className="ml-auto h-3.5 w-3.5 text-slate-300" />
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Pricing */}

//             <button
//               onClick={() => scrollToSection("pricing")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "pricing"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Pricing
//               {activeSection === "pricing" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* FAQ */}

//             <button
//               onClick={() => scrollToSection("faq")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "faq"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               FAQ
//               {activeSection === "faq" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* About */}

//             <button
//               onClick={() => goToPage("/about")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "about"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               About
//               {activeSection === "about" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>
//           </div>

//           {/* Mobile CTA */}

//           {!user && (
//             <button
//               onClick={openSignUp}
//               className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition active:scale-[0.98]"
//             >
//               Get Started
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import React, { useEffect, useRef, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
// import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
// import { assets, AiToolsData } from "../assets/assets";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { user } = useUser();
//   const { openSignIn, openSignUp } = useClerk();

//   const [activeSection, setActiveSection] = useState("home");
//   const [toolsOpen, setToolsOpen] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

//   const toolsRef = useRef(null);

//   // =========================================================
//   // CLOSE MENUS
//   // =========================================================

//   const closeMenus = () => {
//     setToolsOpen(false);
//     setMobileOpen(false);
//     setMobileToolsOpen(false);
//   };

//   // =========================================================
//   // HOME
//   // =========================================================

//   const goHome = () => {
//     closeMenus();

//     if (location.pathname === "/") {
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });
//     } else {
//       navigate("/");
//     }
//   };

//   // =========================================================
//   // SECTION NAVIGATION
//   // =========================================================

//   const scrollToSection = (id) => {
//     closeMenus();

//     if (location.pathname !== "/") {
//       navigate("/");

//       setTimeout(() => {
//         const section = document.getElementById(id);

//         if (section) {
//           section.scrollIntoView({
//             behavior: "smooth",
//             block: "start",
//           });
//         }
//       }, 100);

//       return;
//     }

//     const section = document.getElementById(id);

//     if (section) {
//       section.scrollIntoView({
//         behavior: "smooth",
//         block: "start",
//       });
//     }
//   };

//   // =========================================================
//   // PAGE NAVIGATION
//   // =========================================================

//   const goToPage = (path) => {
//     closeMenus();
//     navigate(path);
//   };

//   // =========================================================
//   // AI TOOL NAVIGATION
//   // =========================================================

//   const handleToolClick = (path) => {
//     closeMenus();

//     if (user) {
//       navigate(path);
//     } else {
//       openSignIn();
//     }
//   };

//   // =========================================================
//   // ACTIVE SECTION
//   // =========================================================

//   useEffect(() => {
//     if (location.pathname !== "/") {
//       if (location.pathname === "/about") {
//         setActiveSection("about");
//       } else if (location.pathname === "/faq") {
//         setActiveSection("faq");
//       } else {
//         setActiveSection("");
//       }

//       return;
//     }

//     const handleScroll = () => {
//       const sections = [
//         {
//           id: "features",
//           name: "features",
//         },
//         {
//           id: "ai-tools",
//           name: "ai-tools",
//         },
//         {
//           id: "pricing",
//           name: "pricing",
//         },
//       ];

//       const scrollPosition = window.scrollY + 150;

//       if (window.scrollY < 100) {
//         setActiveSection("home");
//         return;
//       }

//       let currentSection = "home";

//       sections.forEach((section) => {
//         const element = document.getElementById(section.id);

//         if (element && scrollPosition >= element.offsetTop) {
//           currentSection = section.name;
//         }
//       });

//       setActiveSection(currentSection);
//     };

//     handleScroll();

//     window.addEventListener("scroll", handleScroll, {
//       passive: true,
//     });

//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [location.pathname]);

//   // =========================================================
//   // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
//   // =========================================================

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (toolsRef.current && !toolsRef.current.contains(event.target)) {
//         setToolsOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);

//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   // =========================================================
//   // DESKTOP NAV ITEM
//   // =========================================================

//   const NavItem = ({ children, active, onClick }) => {
//     return (
//       <button
//         onClick={onClick}
//         className={`group relative py-2 text-sm font-semibold transition-colors duration-200 ${
//           active ? "text-primary" : "text-slate-700 hover:text-primary"
//         }`}
//       >
//         {children}

//         <span
//           className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
//             active
//               ? "w-5 opacity-100"
//               : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
//           }`}
//         />
//       </button>
//     );
//   };

//   return (
//     <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-100/80 bg-white/95 shadow-sm backdrop-blur-xl">
//       <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
//         {/* =====================================================
//             LOGO
//         ====================================================== */}

//         <button
//           onClick={goHome}
//           className="shrink-0 cursor-pointer"
//           aria-label="NeuralForge Home"
//         >
//           <img src={assets.logo} alt="NeuralForge" className="w-32 sm:w-36" />
//         </button>

//         {/* =====================================================
//             DESKTOP NAVIGATION
//         ====================================================== */}

//         <div className="hidden items-center gap-8 lg:flex">
//           {/* Home */}

//           <NavItem active={activeSection === "home"} onClick={goHome}>
//             Home
//           </NavItem>

//           {/* Features */}

//           {/* <NavItem
//             active={activeSection === "features"}
//             onClick={() => scrollToSection("features")}
//           >
//             Features
//           </NavItem> */}

//           {/* =================================================
//               AI TOOLS DROPDOWN
//           ================================================== */}

//           <div ref={toolsRef} className="relative">
//             <button
//               onClick={() => setToolsOpen((prev) => !prev)}
//               className={`group relative flex items-center gap-1.5 py-2 text-sm font-semibold transition-colors duration-200 ${
//                 activeSection === "ai-tools" || toolsOpen
//                   ? "text-primary"
//                   : "text-slate-700 hover:text-primary"
//               }`}
//             >
//               AI Tools
//               <ChevronDown
//                 className={`h-3.5 w-3.5 transition-transform duration-200 ${
//                   toolsOpen ? "rotate-180" : ""
//                 }`}
//               />
//               <span
//                 className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
//                   activeSection === "ai-tools" || toolsOpen
//                     ? "w-5 opacity-100"
//                     : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
//                 }`}
//               />
//             </button>

//             {/* =================================================
//                 AI TOOLS DROPDOWN
//             ================================================== */}

//             <div
//               className={`absolute left-1/2 top-full mt-4 w-[370px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_55px_rgba(15,23,42,0.13)] transition-all duration-200 ${
//                 toolsOpen
//                   ? "visible translate-y-0 opacity-100"
//                   : "invisible -translate-y-2 opacity-0"
//               }`}
//             >
//               {/* Top Accent */}

//               <div className="absolute left-1/2 top-0 h-0.5 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400" />

//               {/* Header */}

//               <div className="px-3 pb-2 pt-2.5">
//                 <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
//                   AI Creative Tools
//                 </p>

//                 <p className="mt-1 text-xs text-slate-400">
//                   Create faster with NeuralForge
//                 </p>
//               </div>

//               {/* Tools */}

//               <div className="grid grid-cols-2 gap-1">
//                 {AiToolsData.map((tool, index) => {
//                   const Icon = tool.Icon;

//                   return (
//                     <button
//                       key={tool.title || index}
//                       onClick={() => handleToolClick(tool.path)}
//                       className="group flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-slate-50"
//                     >
//                       {/* Icon */}

//                       <div
//                         className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
//                         style={{
//                           background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
//                         }}
//                       >
//                         <Icon className="h-4 w-4 text-white" />
//                       </div>

//                       {/* Text */}

//                       <div className="min-w-0 flex-1">
//                         <p className="text-[11px] font-semibold leading-4 text-slate-800 transition-colors group-hover:text-primary">
//                           {tool.title}
//                         </p>

//                         <p className="mt-0.5 line-clamp-2 text-[9px] leading-3.5 text-slate-400">
//                           {tool.description}
//                         </p>
//                       </div>

//                       {/* Arrow */}

//                       <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
//                     </button>
//                   );
//                 })}
//               </div>

//               {/* View All */}

//               <button
//                 onClick={() => scrollToSection("ai-tools")}
//                 className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border-t border-slate-100 py-2.5 text-[11px] font-semibold text-primary transition hover:bg-purple-50"
//               >
//                 Explore all AI tools
//                 <ArrowRight className="h-3.5 w-3.5" />
//               </button>
//             </div>
//           </div>

//           {/* Pricing */}

//           <NavItem
//             active={activeSection === "pricing"}
//             onClick={() => scrollToSection("pricing")}
//           >
//             Pricing
//           </NavItem>

//           {/* FAQ */}

//           <NavItem
//             active={activeSection === "faq"}
//             onClick={() => goToPage("/faq")}
//           >
//             FAQ
//           </NavItem>

//           {/* About */}

//           <NavItem
//             active={activeSection === "about"}
//             onClick={() => goToPage("/about")}
//           >
//             About
//           </NavItem>
//         </div>

//         {/* =====================================================
//             DESKTOP RIGHT SIDE
//         ====================================================== */}

//         <div className="hidden items-center gap-3 sm:flex">
//           {!user ? (
//             <>
//               {/* Sign In */}

//               <button
//                 onClick={openSignIn}
//                 className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
//               >
//                 Login
//               </button>

//               {/* Get Started */}

//               <button
//                 onClick={openSignUp}
//                 className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:scale-95 sm:px-6"
//               >
//                 Sign Up
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             </>
//           ) : (
//             <UserButton />
//           )}
//         </div>

//         {/* =====================================================
//             MOBILE RIGHT SIDE
//         ====================================================== */}

//         <div className="flex items-center gap-2 sm:hidden">
//           {user ? (
//             <UserButton />
//           ) : (
//             <>
//               <button
//                 onClick={openSignIn}
//                 className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
//               >
//                 Sign In
//               </button>

//               <button
//                 onClick={() => setMobileOpen((prev) => !prev)}
//                 className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
//                 aria-label="Toggle menu"
//               >
//                 {mobileOpen ? (
//                   <X className="h-5 w-5" />
//                 ) : (
//                   <Menu className="h-5 w-5" />
//                 )}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       {/* =====================================================
//           MOBILE MENU
//       ====================================================== */}

//       <div
//         className={`border-t border-slate-100 bg-white transition-all duration-300 sm:hidden ${
//           mobileOpen
//             ? "max-h-[650px] opacity-100"
//             : "max-h-0 overflow-hidden opacity-0"
//         }`}
//       >
//         <div className="mx-auto max-w-7xl px-5 py-4">
//           <div className="space-y-1">
//             {/* Home */}

//             <button
//               onClick={goHome}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "home"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Home
//               {activeSection === "home" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* Features */}

//             <button
//               onClick={() => scrollToSection("features")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "features"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Features
//               {activeSection === "features" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* AI Tools */}

//             <button
//               onClick={() => setMobileToolsOpen((prev) => !prev)}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "ai-tools"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               <span>AI Tools</span>

//               <ChevronDown
//                 className={`h-4 w-4 transition-transform duration-200 ${
//                   mobileToolsOpen ? "rotate-180" : ""
//                 }`}
//               />
//             </button>

//             {/* Mobile AI Tools */}

//             <div
//               className={`overflow-hidden transition-all duration-300 ${
//                 mobileToolsOpen
//                   ? "max-h-[500px] opacity-100"
//                   : "max-h-0 opacity-0"
//               }`}
//             >
//               <div className="ml-3 space-y-1 border-l border-purple-100 pl-3">
//                 {AiToolsData.map((tool, index) => {
//                   const Icon = tool.Icon;

//                   return (
//                     <button
//                       key={tool.title || index}
//                       onClick={() => handleToolClick(tool.path)}
//                       className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
//                     >
//                       {/* Icon */}

//                       <div
//                         className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
//                         style={{
//                           background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
//                         }}
//                       >
//                         <Icon className="h-3.5 w-3.5 text-white" />
//                       </div>

//                       {/* Title */}

//                       <span className="text-xs font-medium text-slate-700">
//                         {tool.title}
//                       </span>

//                       <ChevronRight className="ml-auto h-3.5 w-3.5 text-slate-300" />
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Pricing */}

//             <button
//               onClick={() => scrollToSection("pricing")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "pricing"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               Pricing
//               {activeSection === "pricing" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* FAQ */}

//             <button
//               onClick={() => goToPage("/faq")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "faq"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               FAQ
//               {activeSection === "faq" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>

//             {/* About */}

//             <button
//               onClick={() => goToPage("/about")}
//               className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
//                 activeSection === "about"
//                   ? "bg-purple-50 text-primary"
//                   : "text-slate-700 hover:bg-slate-50"
//               }`}
//             >
//               About
//               {activeSection === "about" && (
//                 <span className="h-1.5 w-1.5 rounded-full bg-primary" />
//               )}
//             </button>
//           </div>

//           {/* Mobile CTA */}

//           {!user && (
//             <button
//               onClick={openSignUp}
//               className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition active:scale-[0.98]"
//             >
//               Get Started
//               <ArrowRight className="h-4 w-4" />
//             </button>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowRight, ChevronDown, ChevronRight, Menu, X } from "lucide-react";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { assets, AiToolsData } from "../assets/assets";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useUser();
  const { openSignIn, openSignUp } = useClerk();

  const [activeSection, setActiveSection] = useState("home");
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const toolsRef = useRef(null);

  // =========================================================
  // CLOSE MENUS
  // =========================================================

  const closeMenus = () => {
    setToolsOpen(false);
    setMobileOpen(false);
    setMobileToolsOpen(false);
  };

  // =========================================================
  // HOME
  // =========================================================

  const goHome = () => {
    closeMenus();

    if (location.pathname === "/") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      navigate("/");
    }
  };

  // =========================================================
  // SECTION NAVIGATION
  // =========================================================

  const scrollToSection = (id) => {
    closeMenus();

    const scrollToElement = () => {
      const section = document.getElementById(id);

      if (section) {
        const navbarOffset = 100;

        const top =
          section.getBoundingClientRect().top + window.scrollY - navbarOffset;

        window.scrollTo({
          top,
          behavior: "smooth",
        });
      }
    };

    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(scrollToElement, 100);
      return;
    }

    scrollToElement();
  };

  // =========================================================
  // PAGE NAVIGATION
  // =========================================================

  const goToPage = (path) => {
    closeMenus();
    navigate(path);
  };

  // =========================================================
  // AI TOOL NAVIGATION
  // =========================================================

  const handleToolClick = (path) => {
    closeMenus();

    if (user) {
      navigate(path);
    } else {
      openSignIn();
    }
  };

  // =========================================================
  // ACTIVE SECTION
  // =========================================================

  useEffect(() => {
    if (location.pathname !== "/") {
      if (location.pathname === "/about") {
        setActiveSection("about");
      } else if (location.pathname === "/faq") {
        setActiveSection("faq");
      } else {
        setActiveSection("");
      }

      return;
    }

    const handleScroll = () => {
      const sections = [
        {
          id: "features",
          name: "features",
        },
        {
          id: "ai-tools",
          name: "ai-tools",
        },
        {
          id: "pricing",
          name: "pricing",
        },
      ];

      const scrollPosition = window.scrollY + 150;

      if (window.scrollY < 100) {
        setActiveSection("home");
        return;
      }

      let currentSection = "home";

      sections.forEach((section) => {
        const element = document.getElementById(section.id);

        if (element && scrollPosition >= element.offsetTop) {
          currentSection = section.name;
        }
      });

      setActiveSection(currentSection);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  // =========================================================
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // =========================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toolsRef.current && !toolsRef.current.contains(event.target)) {
        setToolsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // =========================================================
  // DESKTOP NAV ITEM
  // =========================================================

  const NavItem = ({ children, active, onClick }) => {
    return (
      <button
        onClick={onClick}
        className={`group relative py-2 text-sm font-semibold transition-colors duration-200 ${
          active ? "text-primary" : "text-slate-700 hover:text-primary"
        }`}
      >
        {children}

        <span
          className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
            active
              ? "w-5 opacity-100"
              : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
          }`}
        />
      </button>
    );
  };

  return (
    <nav className="fixed left-0 top-0 z-50 w-full border-b border-slate-100/80 bg-white/95 shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        {/* =====================================================
            LOGO
        ====================================================== */}

        <button
          onClick={goHome}
          className="shrink-0 cursor-pointer"
          aria-label="NeuralForge Home"
        >
          <img src={assets.logo} alt="NeuralForge" className="w-32 sm:w-36" />
        </button>

        {/* =====================================================
            DESKTOP NAVIGATION
        ====================================================== */}

        <div className="hidden items-center gap-8 lg:flex">
          {/* Home */}

          <NavItem active={activeSection === "home"} onClick={goHome}>
            Home
          </NavItem>

          {/* Features */}

          {/* <NavItem
            active={activeSection === "features"}
            onClick={() => scrollToSection("features")}
          >
            Features
          </NavItem> */}

          {/* =================================================
              AI TOOLS DROPDOWN
          ================================================== */}

          <div ref={toolsRef} className="relative">
            <button
              onClick={() => setToolsOpen((prev) => !prev)}
              className={`group relative flex items-center gap-1.5 py-2 text-sm font-semibold transition-colors duration-200 ${
                activeSection === "ai-tools" || toolsOpen
                  ? "text-primary"
                  : "text-slate-700 hover:text-primary"
              }`}
            >
              AI Tools
              <ChevronDown
                className={`h-3.5 w-3.5 transition-transform duration-200 ${
                  toolsOpen ? "rotate-180" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-1/2 h-0.5 -translate-x-1/2 rounded-full bg-primary transition-all duration-300 ${
                  activeSection === "ai-tools" || toolsOpen
                    ? "w-5 opacity-100"
                    : "w-0 opacity-0 group-hover:w-5 group-hover:opacity-100"
                }`}
              />
            </button>

            {/* =================================================
                AI TOOLS DROPDOWN
            ================================================== */}

            <div
              className={`absolute left-1/2 top-full mt-4 w-[370px] -translate-x-1/2 rounded-2xl border border-slate-100 bg-white p-2 shadow-[0_20px_55px_rgba(15,23,42,0.13)] transition-all duration-200 ${
                toolsOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-2 opacity-0"
              }`}
            >
              {/* Top Accent */}

              <div className="absolute left-1/2 top-0 h-0.5 w-16 -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-400" />

              {/* Header */}

              <div className="px-3 pb-2 pt-2.5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">
                  AI Creative Tools
                </p>

                <p className="mt-1 text-xs text-slate-400">
                  Create faster with NeuralForge
                </p>
              </div>

              {/* Tools */}

              <div className="grid grid-cols-2 gap-1">
                {AiToolsData.map((tool, index) => {
                  const Icon = tool.Icon;

                  return (
                    <button
                      key={tool.title || index}
                      onClick={() => handleToolClick(tool.path)}
                      className="group flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-all duration-200 hover:bg-slate-50"
                    >
                      {/* Icon */}

                      <div
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-sm transition-transform duration-200 group-hover:scale-105"
                        style={{
                          background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
                        }}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>

                      {/* Text */}

                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] font-semibold leading-4 text-slate-800 transition-colors group-hover:text-primary">
                          {tool.title}
                        </p>

                        <p className="mt-0.5 line-clamp-2 text-[9px] leading-3.5 text-slate-400">
                          {tool.description}
                        </p>
                      </div>

                      {/* Arrow */}

                      <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-slate-300 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </button>
                  );
                })}
              </div>

              {/* View All */}

              <button
                onClick={() => scrollToSection("ai-tools")}
                className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl border-t border-slate-100 py-2.5 text-[11px] font-semibold text-primary transition hover:bg-purple-50"
              >
                Explore all AI tools
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Pricing */}

          <NavItem
            active={activeSection === "pricing"}
            onClick={() => scrollToSection("pricing")}
          >
            Pricing
          </NavItem>

          {/* FAQ */}

          <NavItem
            active={activeSection === "faq"}
            onClick={() => goToPage("/faq")}
          >
            FAQ
          </NavItem>

          {/* About */}

          <NavItem
            active={activeSection === "about"}
            onClick={() => goToPage("/about")}
          >
            About
          </NavItem>
        </div>

        {/* =====================================================
            DESKTOP RIGHT SIDE
        ====================================================== */}

        <div className="hidden items-center gap-3 sm:flex">
          {!user ? (
            <>
              {/* Sign In */}

              <button
                onClick={openSignIn}
                className="rounded-xl border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-800 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
              >
                Login
              </button>

              {/* Get Started */}

              <button
                onClick={openSignUp}
                className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:scale-95 sm:px-6"
              >
                Sign Up
                <ArrowRight className="h-4 w-4" />
              </button>
            </>
          ) : (
            <UserButton />
          )}
        </div>

        {/* =====================================================
            MOBILE RIGHT SIDE
        ====================================================== */}

        <div className="flex items-center gap-2 sm:hidden">
          {user ? (
            <UserButton />
          ) : (
            <>
              <button
                onClick={openSignIn}
                className="rounded-lg border border-slate-200 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
              >
                Sign In
              </button>

              <button
                onClick={() => setMobileOpen((prev) => !prev)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-primary/30 hover:text-primary"
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* =====================================================
          MOBILE MENU
      ====================================================== */}

      <div
        className={`border-t border-slate-100 bg-white transition-all duration-300 sm:hidden ${
          mobileOpen
            ? "max-h-[650px] opacity-100"
            : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 py-4">
          <div className="space-y-1">
            {/* Home */}

            <button
              onClick={goHome}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === "home"
                  ? "bg-purple-50 text-primary"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Home
              {activeSection === "home" && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>

            {/* Features */}

            <button
              onClick={() => scrollToSection("features")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === "features"
                  ? "bg-purple-50 text-primary"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Features
              {activeSection === "features" && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>

            {/* AI Tools */}

            <button
              onClick={() => setMobileToolsOpen((prev) => !prev)}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === "ai-tools"
                  ? "bg-purple-50 text-primary"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <span>AI Tools</span>

              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${
                  mobileToolsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* Mobile AI Tools */}

            <div
              className={`overflow-hidden transition-all duration-300 ${
                mobileToolsOpen
                  ? "max-h-[500px] opacity-100"
                  : "max-h-0 opacity-0"
              }`}
            >
              <div className="ml-3 space-y-1 border-l border-purple-100 pl-3">
                {AiToolsData.map((tool, index) => {
                  const Icon = tool.Icon;

                  return (
                    <button
                      key={tool.title || index}
                      onClick={() => handleToolClick(tool.path)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-slate-50"
                    >
                      {/* Icon */}

                      <div
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                        style={{
                          background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
                        }}
                      >
                        <Icon className="h-3.5 w-3.5 text-white" />
                      </div>

                      {/* Title */}

                      <span className="text-xs font-medium text-slate-700">
                        {tool.title}
                      </span>

                      <ChevronRight className="ml-auto h-3.5 w-3.5 text-slate-300" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pricing */}

            <button
              onClick={() => scrollToSection("pricing")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === "pricing"
                  ? "bg-purple-50 text-primary"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              Pricing
              {activeSection === "pricing" && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>

            {/* FAQ */}

            <button
              onClick={() => goToPage("/faq")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === "faq"
                  ? "bg-purple-50 text-primary"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              FAQ
              {activeSection === "faq" && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>

            {/* About */}

            <button
              onClick={() => goToPage("/about")}
              className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-semibold transition ${
                activeSection === "about"
                  ? "bg-purple-50 text-primary"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              About
              {activeSection === "about" && (
                <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              )}
            </button>
          </div>

          {/* Mobile CTA */}

          {!user && (
            <button
              onClick={openSignUp}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition active:scale-[0.98]"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
