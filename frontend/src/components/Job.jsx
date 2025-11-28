import React from "react";
import { Button } from "./ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    if (!mongodbTime) return null;
    const createdAt = new Date(mongodbTime);
    if (isNaN(createdAt)) return null;
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  };

  const daysAgo = daysAgoFunction(job?.createdAt);

  return (
    <div className="p-5 rounded-md shadow-xl bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300">

      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {daysAgo === null
            ? "-"
            : daysAgo === 0
            ? "Today"
            : `${daysAgo} days ago`}
        </p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Company */}
      <div className="flex items-center gap-3 my-3">
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={job?.company?.logo || "https://via.placeholder.com/150"}
            alt={job?.company?.name || "Company"}
          />
          <AvatarFallback>🏢</AvatarFallback>
        </Avatar>

        <div>
          <h1 className="font-medium text-lg">
            {job?.company?.name || "Unknown Company"}
          </h1>
          <p className="text-sm text-gray-500">{job?.location || "India"}</p>
        </div>
      </div>

      {/* Job Info */}
      <div>
        <h1 className="font-bold text-lg my-2 text-[#333]">{job?.title}</h1>
        <p className="text-sm text-gray-600 line-clamp-2">
          {job?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {job?.position || 1} Position
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="ghost">
          {job?.salary} LPA
        </Badge>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Button
          onClick={() => {
            if (job?._id) navigate(`/description/${job._id}`);
          }}
          variant="outline"
        >
          Details
        </Button>

        <Button className="bg-[#7209b7] hover:bg-[#5d149e] text-white">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
