import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { ArrowRight, Users, Box, Zap, Star } from "lucide-react";

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleToolClick = (path) => {
    if (user) {
      navigate(path);
    }
  };

  return (
    <section
      id="ai-tools"
      className="relative w-full overflow-hidden bg-white px-4 pb-8 pt-6 sm:px-8 lg:px-12"
    >
      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute -left-40 top-10 h-80 w-80 rounded-full bg-blue-100/35 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 top-20 h-80 w-80 rounded-full bg-purple-100/35 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-pink-100/25 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* =================================================
            SECTION HEADING
        ================================================== */}

        <div className="mb-4 flex items-end justify-between px-1">
          <div>
            {/* Small heading */}
            <div className="mb-1 flex items-center gap-2">
              <span className="h-[3px] w-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500" />

              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-indigo-600 sm:text-xs">
                AI Tools
              </span>
            </div>

            <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-[27px]">
              Everything you need to create, in one place.
            </h2>
          </div>

          {/* View all */}
          <button
            onClick={() =>
              document.getElementById("ai-tools")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="hidden cursor-pointer items-center gap-2 text-sm font-medium text-indigo-600 transition hover:gap-3 sm:flex"
          >
            View All Tools
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        {/* =================================================
            AI TOOL CARDS
        ================================================== */}

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-3">
          {AiToolsData.map((tool, index) => (
            <div
              key={index}
              onClick={() => handleToolClick(tool.path)}
              className={`group relative h-[245px] cursor-pointer rounded-[18px] p-[5px] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl ${
                user ? "" : "cursor-default"
              }`}
              style={{
                background: `linear-gradient(145deg, ${tool.bg.from}35, #ffffff 42%, ${tool.bg.to}35)`,
              }}
            >
              {/* =================================================
                  CARD
              ================================================== */}

              <div className="relative flex h-full flex-col overflow-hidden rounded-[17px] border border-slate-100/80 bg-white/95 p-4 shadow-[0_4px_20px_rgba(15,23,42,0.035)] backdrop-blur-sm sm:p-5">
                {/* Soft bottom gradient */}
                <div
                  className="pointer-events-none absolute -bottom-12 -left-8 h-28 w-40 rounded-full opacity-50 blur-2xl transition-all duration-300 group-hover:opacity-80"
                  style={{
                    background: `linear-gradient(90deg, ${tool.bg.from}55, ${tool.bg.to}35)`,
                  }}
                />

                {/* =================================================
                    ICON
                ================================================== */}

                <div className="relative z-10">
                  <div
                    className="flex h-11 w-11 items-center justify-center rounded-xl shadow-[0_6px_15px_rgba(15,23,42,0.12)] transition-all duration-300 group-hover:-translate-y-1 group-hover:scale-105 sm:h-12 sm:w-12"
                    style={{
                      background: `linear-gradient(145deg, ${tool.bg.from}, ${tool.bg.to})`,
                    }}
                  >
                    <tool.Icon className="h-5.5 w-5.5 text-white sm:h-6 sm:w-6" />
                  </div>
                </div>

                {/* =================================================
                    TITLE
                ================================================== */}

                <h3 className="relative z-10 mt-4 text-[14px] font-semibold leading-5 text-slate-900 sm:text-[15px]">
                  {tool.title}
                </h3>

                {/* =================================================
                    DESCRIPTION
                ================================================== */}

                <p className="relative z-10 mt-2 text-[11px] leading-[1.55] text-slate-500 sm:text-xs">
                  {tool.description}
                </p>

                {/* =================================================
                    ARROW
                ================================================== */}

                {/* <div className="relative z-10 mt-auto flex justify-end pt-2">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(145deg, ${tool.bg.from}18, ${tool.bg.to}22)`,
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
                </div> */}

                <div className="absolute bottom-3.5 right-3.5 z-10">
                  <div
                    className="flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `linear-gradient(145deg, ${tool.bg.from}18, ${tool.bg.to}22)`,
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

                {/* Hover glow */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[17px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    boxShadow: `inset 0 0 0 1px ${tool.bg.from}25`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* =====================================================
            STATS
        ====================================================== */}

        <div className="mx-auto mt-5 flex max-w-5xl flex-wrap items-center justify-center rounded-2xl border border-slate-100 bg-white/75 py-2 backdrop-blur-sm">
          {/* Users */}
          <div className="flex min-w-[145px] flex-1 items-center justify-center gap-2.5 px-4 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-50">
              <Users className="h-[18px] w-[18px] text-indigo-600" />
            </div>

            <div>
              <p className="text-base font-semibold leading-4 text-slate-900">
                10K+
              </p>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                Active Users
              </p>
            </div>
          </div>

          {/* AI Tools */}
          <div className="flex min-w-[145px] flex-1 items-center justify-center gap-2.5 border-l border-slate-100 px-4 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-purple-50">
              <Box className="h-[18px] w-[18px] text-purple-600" />
            </div>

            <div>
              <p className="text-base font-semibold leading-4 text-slate-900">
                6
              </p>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                AI Tools
              </p>
            </div>
          </div>

          {/* Uptime */}
          <div className="flex min-w-[145px] flex-1 items-center justify-center gap-2.5 border-l border-slate-100 px-4 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50">
              <Zap className="h-[18px] w-[18px] text-blue-600" />
            </div>

            <div>
              <p className="text-base font-semibold leading-4 text-slate-900">
                99.9%
              </p>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                Uptime
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="flex min-w-[145px] flex-1 items-center justify-center gap-2.5 border-l border-slate-100 px-4 py-2">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-pink-50">
              <Star className="h-[18px] w-[18px] text-pink-500" />
            </div>

            <div>
              <p className="text-base font-semibold leading-4 text-slate-900">
                4.8/5
              </p>

              <p className="mt-1 text-[10px] text-slate-500 sm:text-xs">
                User Rating
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AiTools;
