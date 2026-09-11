import { useAuth, useUser } from "@clerk/clerk-react";
import { Hash, Sparkles, Crown, Lock, ArrowRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {
  const navigate = useNavigate();

  const { user } = useUser();
  const { getToken } = useAuth();

  const isPremium = user?.publicMetadata?.plan === "premium";

  const blogCategories = [
    "General",
    "Technology",
    "Business",
    "Health",
    "Lifestyle",
    "Education",
    "Travel",
    "Food",
  ];

  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!isPremium) {
      toast.error("Blog Title Generator is available only on Premium.");
      return;
    }

    console.log("Generate clicked");

    try {
      setLoading(true);

      const prompt = `Generate a blog title for the keyword ${input} in the category ${selectedCategory}`;

      const { data } = await axios.post(
        "/api/ai/generate-blog-title",
        { prompt },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (data.success) {
        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }

    setLoading(false);
  };

  // =========================================================
  // PREMIUM LOCK SCREEN
  // =========================================================

  if (!isPremium) {
    return (
      <div className="flex h-full min-h-[500px] items-center justify-center overflow-y-scroll p-6">
        <div className="w-full max-w-lg rounded-2xl border border-purple-100 bg-white p-8 text-center shadow-sm">
          {/* Icon */}

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-purple-100">
            <Crown className="h-8 w-8 text-white" />
          </div>

          {/* Heading */}

          <h1 className="mt-5 text-2xl font-bold text-slate-900">
            Premium Feature
          </h1>

          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-500">
            The Blog Title Generator is available exclusively for Premium users.
            Upgrade your plan to unlock this powerful AI tool.
          </p>

          {/* Feature */}

          <div className="mx-auto mt-6 flex max-w-sm items-center gap-3 rounded-xl border border-purple-100 bg-purple-50/60 px-4 py-3 text-left">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
              <Hash className="h-4 w-4 text-primary" />
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-800">
                Blog Title Generator
              </p>

              <p className="text-xs text-slate-500">
                Generate catchy AI-powered blog titles
              </p>
            </div>

            <Lock className="ml-auto h-4 w-4 shrink-0 text-primary" />
          </div>

          {/* Upgrade Button */}

          <button
            onClick={() => navigate("/ai/plan")}
            className="mx-auto mt-6 flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-indigo-700 hover:shadow-xl active:scale-95"
          >
            Upgrade to Premium
            <ArrowRight className="h-4 w-4" />
          </button>

          <p className="mt-3 text-xs text-slate-400">
            Unlock Blog Title Generator and other premium benefits.
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // PREMIUM BLOG TITLE GENERATOR
  // =========================================================

  return (
    <div className="flex h-full flex-wrap items-start gap-4 overflow-y-scroll p-6 text-slate-700">
      {/* Left col */}

      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg rounded-lg border border-gray-200 bg-white p-4"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#8E37EB]" />

          <h1 className="text-xl font-semibold">AI Title Generator</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Keyword</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="mt-2 w-full rounded-md border border-gray-300 p-2 px-3 text-sm outline-none"
          placeholder="The future of artificial intelligence is..."
          required
        />

        <p className="mt-4 text-sm font-medium">Category</p>

        <div className="mt-3 flex flex-wrap gap-3 sm:max-w-9/11">
          {blogCategories.map((item) => (
            <span
              onClick={() => setSelectedCategory(item)}
              className={`cursor-pointer rounded-full border px-4 py-1 text-xs ${
                selectedCategory === item
                  ? "bg-purple-50 text-purple-700"
                  : "border-gray-300 text-gray-500"
              }`}
              key={item}
            >
              {item}
            </span>
          ))}
        </div>

        <br />

        <button
          disabled={loading}
          className="mt-6 flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-[#C341F6] to-[#8E37EB] px-4 py-2 text-sm text-white"
        >
          {loading ? (
            <span className="my-1 h-4 w-4 animate-spin rounded-full border-2 border-t-transparent"></span>
          ) : (
            <Hash className="w-5" />
          )}
          Generate title
        </button>
      </form>

      {/* Right col */}

      <div className="flex min-h-96 w-full max-w-lg flex-col rounded-lg border border-gray-200 bg-white p-4">
        <div className="flex items-center gap-3">
          <Hash className="h-5 w-5 text-[#8E37EB]" />

          <h1 className="text-xl font-semibold">Generated titles</h1>
        </div>

        {!content ? (
          <div className="flex flex-1 items-center justify-center">
            <div className="flex flex-col items-center gap-5 text-sm text-gray-400">
              <Hash className="h-9 w-9" />

              <p>Enter a topic and click “Generated title” to get started</p>
            </div>
          </div>
        ) : (
          <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
            <div className="reset-tw">
              <Markdown>{content}</Markdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogTitles;
