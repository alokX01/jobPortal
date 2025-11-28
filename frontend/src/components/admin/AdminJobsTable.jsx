import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminJobsTable = () => {
  const navigate = useNavigate();
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);

  useEffect(() => {
    const filteredJobs =
      allAdminJobs.length >= 0 &&
      allAdminJobs.filter((job) => {
        if (!searchJobByText) return true;

        return (
          job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
          job?.company?.name?.toLowerCase().includes(searchJobByText.toLowerCase())
        );
      });

    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <TableCaption className="text-gray-500">A list of your recent posted jobs</TableCaption>

        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-900">Company Name</TableHead>
            <TableHead className="font-semibold text-gray-900">Role</TableHead>
            <TableHead className="font-semibold text-gray-900">Date</TableHead>
            <TableHead className="text-right font-semibold text-gray-900">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {!filterJobs || filterJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                No jobs posted yet
              </TableCell>
            </TableRow>
          ) : (
            filterJobs.map((job) => (
              <TableRow key={job._id} className="hover:bg-gray-50">

                <TableCell className="font-medium text-gray-900">
                  {job?.company?.name}
                </TableCell>

                <TableCell className="text-gray-600">
                  {job?.title}
                </TableCell>

                <TableCell className="text-gray-600">
                  {job?.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                      <MoreHorizontal className="text-gray-600" />
                    </PopoverTrigger>

                    <PopoverContent className="w-32 p-2 shadow-lg border border-gray-200 rounded-lg">
                      
                      {/* ✅ FIXED: Edit Page Route */}
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/edit`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 p-2 rounded transition-colors"
                      >
                        <Edit2 className="w-4" />
                        <span className="font-medium">Edit</span>
                      </div>

                      {/* Applicants */}
                      <div
                        onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                        className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 p-2 rounded transition-colors mt-1"
                      >
                        <Eye className="w-4" />
                        <span className="font-medium">Applicants</span>
                      </div>

                    </PopoverContent>
                  </Popover>
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminJobsTable;
