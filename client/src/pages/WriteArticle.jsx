import {
  Check,
  Clipboard,
  Edit,
  Sparkles,
  RefreshCw,
  WandSparkles,
} from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import Markdown from "react-markdown";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
  const articleLength = [
    { length: 800, text: "Short (500-800 words)" },
    { length: 1200, text: "Medium (800-1200 words)" },
    { length: 1600, text: "Long (1200+ words)" },
  ];

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [copied, setCopied] = useState(false);

  const [improveMode, setImproveMode] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [improving, setImproving] = useState(false);

  const { getToken } = useAuth();

  // Generate article
  const generateArticle = async () => {
    if (loading || improving) return;

    setLoading(true);
    setCopied(false);

    try {
      const prompt = `Write an article about ${input} in ${selectedLength.text}`;

      const { data } = await axios.post(
        "/api/ai/generate-article",
        {
          prompt,
          length: selectedLength.length,
        },
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
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while generating the article.",
      );
    } finally {
      setLoading(false);
    }
  };

  // Generate article from form
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (loading || improving) return;

    await generateArticle();
  };

  // Regenerate article
  const handleRegenerate = async () => {
    if (!input) {
      toast.error("Please enter an article topic first.");
      return;
    }

    if (loading || improving) return;

    await generateArticle();
  };

  // Improve article
  const handleImprove = async () => {
    if (!content) {
      toast.error("Please generate an article first.");
      return;
    }

    if (!instruction.trim()) {
      toast.error("Please enter an improvement instruction.");
      return;
    }

    if (loading || improving) return;

    setImproving(true);
    setCopied(false);

    try {
      const { data } = await axios.post(
        "/api/ai/improve-article",
        {
          content,
          instruction: instruction.trim(),
        },
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (data.success) {
        setContent(data.content);
        setInstruction("");
        setImproveMode(false);
        toast.success("Article improved successfully!");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while improving the article.",
      );
    } finally {
      setImproving(false);
    }
  };

  // Copy article
  const handleCopy = async () => {
    if (!content) return;

    try {
      await navigator.clipboard.writeText(content);

      setCopied(true);
      toast.success("Article copied successfully!");

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      toast.error("Failed to copy article.");
    }
  };

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left column */}
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
      >
        <div className="flex items-center gap-3">
          <Sparkles className="w-6 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Article Configuration</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Article Topic</p>

        <input
          onChange={(e) => setInput(e.target.value)}
          value={input}
          type="text"
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          placeholder="The future of artificial intelligence is..."
          required
          disabled={loading || improving}
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <span
              onClick={() => {
                if (!loading && !improving) {
                  setSelectedLength(item);
                }
              }}
              className={`text-xs px-4 py-1 border rounded-full ${
                selectedLength.text === item.text
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 border-gray-300"
              } ${
                loading || improving
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>

        <br />

        <button
          type="submit"
          disabled={loading || improving}
          className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg ${
            loading || improving
              ? "cursor-not-allowed opacity-90"
              : "cursor-pointer"
          }`}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
              Generating...
            </>
          ) : (
            <>
              <Edit className="w-5" />
              Generate article
            </>
          )}
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
        {/* Generated article header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Edit className="w-5 h-5 text-[#4A7AFF]" />
            <h1 className="text-xl font-semibold">Generated article</h1>
          </div>

          {content && (
            <div className="flex items-center gap-2">
              {/* Copy */}
              <button
                type="button"
                onClick={handleCopy}
                disabled={loading || improving}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-200 ${
                  copied
                    ? "border-green-200 bg-green-50 text-green-600"
                    : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-slate-800"
                } ${
                  loading || improving
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    Copied
                  </>
                ) : (
                  <>
                    <Clipboard className="w-3.5 h-3.5" />
                    Copy
                  </>
                )}
              </button>

              {/* Regenerate */}
              <button
                type="button"
                onClick={handleRegenerate}
                disabled={loading || improving}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-blue-200 bg-blue-50 text-blue-600 hover:bg-blue-100 transition-all duration-200 ${
                  loading || improving
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <RefreshCw
                  className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`}
                />
                Regenerate
              </button>

              {/* Improve */}
              <button
                type="button"
                onClick={() => {
                  if (!loading && !improving) {
                    setImproveMode(!improveMode);
                  }
                }}
                disabled={loading || improving}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border border-purple-200 bg-purple-50 text-purple-600 hover:bg-purple-100 transition-all duration-200 ${
                  loading || improving
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
              >
                <WandSparkles className="w-3.5 h-3.5" />
                Improve
              </button>
            </div>
          )}
        </div>

        {/* Improve article section */}
        {content && improveMode && !loading && (
          <div className="mt-3 p-3 rounded-lg border border-purple-100 bg-purple-50/50">
            <p className="text-xs font-medium text-slate-700 mb-2">
              How would you like to improve the article?
            </p>

            <textarea
              value={instruction}
              onChange={(e) => setInstruction(e.target.value)}
              disabled={improving}
              rows={3}
              placeholder="Example: Make it more professional and SEO friendly."
              className="w-full p-2.5 text-xs rounded-md border border-purple-200 bg-white outline-none resize-none focus:border-purple-400 disabled:bg-gray-100"
            />

            <div className="flex justify-end gap-2 mt-2">
              <button
                type="button"
                onClick={() => {
                  setImproveMode(false);
                  setInstruction("");
                }}
                disabled={improving}
                className="px-3 py-1.5 text-xs font-medium rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleImprove}
                disabled={improving}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md bg-purple-600 text-white ${
                  improving
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:bg-purple-700 cursor-pointer"
                }`}
              >
                {improving ? (
                  <>
                    <span className="w-3.5 h-3.5 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
                    Improving...
                  </>
                ) : (
                  <>
                    <WandSparkles className="w-3.5 h-3.5" />
                    Improve Article
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Article content */}
        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center">
              <span className="w-9 h-9 rounded-full border-3 border-blue-500 border-t-transparent animate-spin"></span>

              <p>Generating article...</p>

              <p className="text-xs text-gray-400">
                This may take a few moments
              </p>
            </div>
          </div>
        ) : improving ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center">
              <span className="w-9 h-9 rounded-full border-3 border-purple-500 border-t-transparent animate-spin"></span>

              <p>Improving article...</p>

              <p className="text-xs text-gray-400">
                This may take a few moments
              </p>
            </div>
          </div>
        ) : !content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Edit className="w-9 h-9" />
              <p>Enter a topic and click “Generate article” to get started</p>
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

export default WriteArticle;
