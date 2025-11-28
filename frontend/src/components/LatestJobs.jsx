import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import useGetAllJobs from "../hooks/useGetAllJobs";

const LatestJobs = () => {
  useGetAllJobs(); // Fetch jobs on page load

  const { allJobs } = useSelector((store) => store.job);

  return (
    <div className="max-w-7xl mx-auto my-20 px-4">
      
      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
        <span className="text-blue-700">Latest & Top </span>
        Job Openings
      </h1>

      {/* Job Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-10">
        {allJobs.length === 0 ? (
          <span className="text-gray-500 text-lg">No Job Available</span>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobs;
