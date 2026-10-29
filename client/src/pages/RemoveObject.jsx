import { Scissors, Sparkles } from "lucide-react";
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObject = () => {
  const [input, setInput] = useState(null);
  const [object, setObject] = useState("");

  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  const { getToken } = useAuth();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const trimmedObject = object.trim();

    // Validate before starting loading
    if (!trimmedObject) {
      return toast.error("Please enter an object name");
    }

    if (trimmedObject.split(/\s+/).length > 1) {
      return toast.error("Please enter only one object name");
    }

    if (!input) {
      return toast.error("Please select an image");
    }

    try {
      setLoading(true);
      setContent("");

      const formData = new FormData();
      formData.append("image", input);
      formData.append("object", trimmedObject);

      const { data } = await axios.post(
        "/api/ai/remove-image-object",
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
          },
        },
      );

      if (data.success) {
        // Wait until the processed image is completely loaded
        const processedImage = new window.Image();

        processedImage.src = data.content;

        await new Promise((resolve, reject) => {
          processedImage.onload = resolve;
          processedImage.onerror = reject;
        });

        setContent(data.content);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while removing the object",
      );
    } finally {
      setLoading(false);
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
          <h1 className="text-xl font-semibold">Object Removal</h1>
        </div>

        <p className="mt-6 text-sm font-medium">Upload image</p>

        <div className="mt-2">
          <label
            htmlFor="object-image-upload"
            className={`flex items-center justify-between gap-3 w-full px-3 py-2.5 rounded-md border border-gray-300 text-sm text-gray-600 transition ${
              loading
                ? "opacity-60 cursor-not-allowed bg-gray-50"
                : "cursor-pointer hover:border-gray-400"
            }`}
          >
            <span className="truncate">
              {input ? input.name : "No image selected"}
            </span>

            <span
              className={`shrink-0 px-3 py-1.5 rounded-md font-medium ${
                loading
                  ? "bg-gray-100 text-gray-400"
                  : "bg-slate-100 text-slate-700"
              }`}
            >
              Choose image
            </span>
          </label>

          <input
            id="object-image-upload"
            onChange={(e) => setInput(e.target.files?.[0] || null)}
            type="file"
            accept="image/*"
            className="hidden"
            required
            disabled={loading}
          />
        </div>

        <p className="mt-6 text-sm font-medium">
          Describe object name to remove
        </p>

        <input
          type="text"
          onChange={(e) => setObject(e.target.value)}
          value={object}
          disabled={loading}
          className="w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed"
          placeholder="e.g., human, watch, spoon"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#417DF6] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin"></span>
          ) : (
            <Scissors className="w-5" />
          )}

          {loading ? "Removing..." : "Remove object"}
        </button>
      </form>

      {/* Right column */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96">
        <div className="flex items-center gap-3">
          <Scissors className="w-5 h-5 text-[#4A7AFF]" />
          <h1 className="text-xl font-semibold">Processed Image</h1>
        </div>

        {loading ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-4 text-gray-400 text-center">
              <span className="w-9 h-9 rounded-full border-3 border-purple-500 border-t-transparent animate-spin"></span>

              <p>Removing object...</p>

              <p className="text-xs text-gray-400">
                This may take a few moments
              </p>
            </div>
          </div>
        ) : !content ? (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400 text-center">
              <Scissors className="w-9 h-9" />

              <p>Upload an image and click "Remove Object" to get started</p>
            </div>
          </div>
        ) : (
          <img
            src={content}
            alt="Processed image"
            className="mt-3 w-full h-full object-contain rounded-md"
          />
        )}
      </div>
    </div>
  );
};

export default RemoveObject;
