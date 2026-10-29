import React, { useEffect, useState } from "react";
import {
  FileText,
  Hash,
  Image,
  Eraser,
  Scissors,
  ClipboardList,
  History as HistoryIcon,
} from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const History = () => {
  const [creations, setCreations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");

  const { getToken } = useAuth();

  const filters = [
    {
      id: "all",
      label: "All",
      Icon: HistoryIcon,
    },
    {
      id: "article",
      label: "Articles",
      Icon: FileText,
    },
    {
      id: "blog-title",
      label: "Blog Titles",
      Icon: Hash,
    },
    {
      id: "image",
      label: "Images",
      Icon: Image,
    },
    {
      id: "background-removal",
      label: "Background Removal",
      Icon: Eraser,
    },
    {
      id: "object-removal",
      label: "Object Removal",
      Icon: Scissors,
    },
    {
      id: "resume-review",
      label: "Resume Reviews",
      Icon: ClipboardList,
    },
  ];

  const getHistory = async () => {
    try {
      const { data } = await axios.get("/api/user/get-user-creations", {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations(data.creations);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while loading history.",
      );
    }

    setLoading(false);
  };

  useEffect(() => {
    getHistory();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`/api/user/delete-creation/${id}`, {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      });

      if (data.success) {
        setCreations((prev) => prev.filter((item) => item.id !== id));
        toast.success("Creation deleted successfully.");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong while deleting the creation.",
      );
    }
  };

  const filteredCreations =
    activeFilter === "all"
      ? creations
      : creations.filter((item) => item.type === activeFilter);

  return (
    <div className="h-full overflow-y-scroll p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3C81F6] to-[#9234EA] text-white flex items-center justify-center">
            <HistoryIcon className="w-5 h-5" />
          </div>

          <div>
            <h1 className="text-xl font-semibold text-slate-800">
              Creation History
            </h1>

            <p className="text-sm text-gray-500 mt-0.5">
              View and manage your previous AI creations.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex gap-2 overflow-x-auto pb-1">
        {filters.map(({ id, label, Icon }) => {
          const isActive = activeFilter === id;

          return (
            <button
              key={id}
              type="button"
              onClick={() => setActiveFilter(id)}
              className={`flex items-center gap-2 shrink-0 px-4 py-2 rounded-lg border text-sm font-medium transition-all duration-200 ${
                isActive
                  ? "bg-gradient-to-r from-[#3C81F6] to-[#9234EA] border-transparent text-white shadow-sm"
                  : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-slate-800"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </button>
          );
        })}
      </div>

      {/* History Count */}
      {!loading && (
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-slate-700">
            {activeFilter === "all"
              ? "All History"
              : filters.find((filter) => filter.id === activeFilter)?.label}
          </p>

          <p className="text-xs text-gray-500">
            {filteredCreations.length}{" "}
            {filteredCreations.length === 1 ? "creation" : "creations"}
          </p>
        </div>
      )}

      {/* Loading */}
      {loading ? (
        <div className="flex justify-center items-center h-3/4">
          <div className="animate-spin rounded-full h-11 w-11 border-3 border-purple-500 border-t-transparent"></div>
        </div>
      ) : filteredCreations.length === 0 ? (
        /* Empty State */
        <div className="bg-white border border-gray-200 rounded-xl p-12 text-center">
          <div className="w-12 h-12 mx-auto rounded-full bg-purple-50 flex items-center justify-center">
            <HistoryIcon className="w-6 h-6 text-purple-500" />
          </div>

          <h2 className="mt-4 text-sm font-semibold text-slate-700">
            No history found
          </h2>

          <p className="mt-1 text-xs text-gray-400">
            You haven't created anything in this category yet.
          </p>
        </div>
      ) : (
        /* History List */
        <div className="space-y-3">
          {filteredCreations.map((item) => (
            <CreationItem key={item.id} item={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
};

export default History;
