// import { Check, Clipboard, Edit, Sparkles } from "lucide-react";
// import React, { useState } from "react";
// import axios from "axios";
// import { useAuth } from "@clerk/clerk-react";
// import toast from "react-hot-toast";
// import Markdown from "react-markdown";

// axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// const WriteArticle = () => {
//   const articleLength = [
//     { length: 800, text: "Short (500-800 words)" },
//     { length: 1200, text: "Medium (800-1200 words)" },
//     { length: 1600, text: "Long (1200+ words)" },
//   ];

//   const [selectedLength, setSelectedLength] = useState(articleLength[0]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [content, setContent] = useState("");
//   const [copied, setCopied] = useState(false);

//   const { getToken } = useAuth();

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();

//     // Prevent multiple requests
//     if (loading) return;

//     setLoading(true);
//     setCopied(false);

//     try {
//       const prompt = `Write an article about ${input} in ${selectedLength.text}`;

//       const { data } = await axios.post(
//         "/api/ai/generate-article",
//         {
//           prompt,
//           length: selectedLength.length,
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${await getToken()}`,
//           },
//         },
//       );

//       if (data.success) {
//         setContent(data.content);
//       } else {
//         toast.error(data.message);
//       }
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "Something went wrong while generating the article.",
//       );
//     } finally {
//       // Enable button only after request is completed
//       setLoading(false);
//     }
//   };

//   const handleCopy = async () => {
//     if (!content) return;

//     try {
//       await navigator.clipboard.writeText(content);

//       setCopied(true);
//       toast.success("Article copied successfully!");

//       setTimeout(() => {
//         setCopied(false);
//       }, 2000);
//     } catch (error) {
//       toast.error("Failed to copy article.");
//     }
//   };

//   return (
//     <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
//       {/* Left column */}
//       <form
//         onSubmit={onSubmitHandler}
//         className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200"
//       >
//         <div className="flex items-center gap-3">
//           <Sparkles className="w-6 text-[#4A7AFF]" />
//           <h1 className="text-xl font-semibold">Article Configuration</h1>
//         </div>

//         <p className="mt-6 text-sm font-medium">Article Topic</p>

//         <input
//           onChange={(e) => setInput(e.target.value)}
//           value={input}
//           type="text"
//           className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300"
//           placeholder="The future of artificial intelligence is..."
//           required
//           disabled={loading}
//         />

//         <p className="mt-4 text-sm font-medium">Article Length</p>

//         <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
//           {articleLength.map((item, index) => (
//             <span
//               onClick={() => {
//                 if (!loading) {
//                   setSelectedLength(item);
//                 }
//               }}
//               className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${
//                 selectedLength.text === item.text
//                   ? "bg-blue-50 text-blue-700"
//                   : "text-gray-500 border-gray-300"
//               } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
//               key={index}
//             >
//               {item.text}
//             </span>
//           ))}
//         </div>

//         <br />

//         <button
//           type="submit"
//           disabled={loading}
//           className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg ${
//             loading ? "cursor-not-allowed opacity-90" : "cursor-pointer"
//           }`}
//         >
//           {loading ? (
//             <>
//               <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
//               Generating...
//             </>
//           ) : (
//             <>
//               <Edit className="w-5" />
//               Generate article
//             </>
//           )}
//         </button>
//       </form>

//       {/* Right column */}
//       <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]">
//         {/* Generated article header */}
//         <div className="flex items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <Edit className="w-5 h-5 text-[#4A7AFF]" />
//             <h1 className="text-xl font-semibold">Generated article</h1>
//           </div>

//           {content && (
//             <button
//               type="button"
//               onClick={handleCopy}
//               className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-200 ${
//                 copied
//                   ? "border-green-200 bg-green-50 text-green-600"
//                   : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-slate-800"
//               }`}
//             >
//               {copied ? (
//                 <>
//                   <Check className="w-3.5 h-3.5" />
//                   Copied
//                 </>
//               ) : (
//                 <>
//                   <Clipboard className="w-3.5 h-3.5" />
//                   Copy
//                 </>
//               )}
//             </button>
//           )}
//         </div>

//         {!content ? (
//           <div className="flex-1 flex justify-center items-center">
//             <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
//               <Edit className="w-9 h-9" />
//               <p>Enter a topic and click “Generate article” to get started</p>
//             </div>
//           </div>
//         ) : (
//           <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
//             <div className="reset-tw">
//               <Markdown>{content}</Markdown>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default WriteArticle;

import { Check, Clipboard, Edit, Sparkles } from "lucide-react";
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

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    // Prevent multiple requests
    if (loading) return;

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
      // Enable button only after request is completed
      setLoading(false);
    }
  };

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
          disabled={loading}
        />

        <p className="mt-4 text-sm font-medium">Article Length</p>

        <div className="mt-3 flex gap-3 flex-wrap sm:max-w-9/11">
          {articleLength.map((item, index) => (
            <span
              onClick={() => {
                if (!loading) {
                  setSelectedLength(item);
                }
              }}
              className={`text-xs px-4 py-1 border rounded-full ${
                selectedLength.text === item.text
                  ? "bg-blue-50 text-blue-700"
                  : "text-gray-500 border-gray-300"
              } ${
                loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
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
          disabled={loading}
          className={`w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg ${
            loading ? "cursor-not-allowed opacity-90" : "cursor-pointer"
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
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium border transition-all duration-200 ${
                copied
                  ? "border-green-200 bg-green-50 text-green-600"
                  : "border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-slate-800"
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
          )}
        </div>

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
