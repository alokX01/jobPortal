import React from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job?._id}`)}
      whileHover={{ scale: 1.03, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="p-5 sm:p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-300 cursor-pointer transition-all duration-300 relative overflow-hidden"
    >
      {/* Top Accent — Solid blue (No gradient) */}
      <div className="absolute top-0 left-0 w-full h-1 bg-blue-600" />

      {/* Company Name */}
      <div className="mb-3">
        <h1 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
          {job?.company?.name || "Unknown Company"}
          <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
        </h1>
        <p className="text-sm text-gray-500">📍 India</p>
      </div>

      {/* Title */}
      <div>
        <h2 className="font-bold text-xl text-blue-700 mb-1 truncate">
          {job?.title}
        </h2>

        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {job?.description?.length > 100
            ? job.description.slice(0, 100) + "..."
            : job?.description || "No job description provided."}
        </p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="bg-blue-50 text-blue-700 font-medium px-3 py-1 text-xs sm:text-sm rounded-full">
          {job?.position || 0} Positions
        </Badge>
        <Badge className="bg-indigo-50 text-indigo-700 font-medium px-3 py-1 text-xs sm:text-sm rounded-full">
          {job?.jobType || "N/A"}
        </Badge>
        <Badge className="bg-purple-50 text-purple-700 font-medium px-3 py-1 text-xs sm:text-sm rounded-full">
          {job?.salary ? `${job.salary} LPA` : "N/A"}
        </Badge>
      </div>

      {/* Button — Solid Blue */}
      <div className="mt-6">
        <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300">
          View Details
        </button>
      </div>
    </motion.div>
  );
};

export default LatestJobCards;
