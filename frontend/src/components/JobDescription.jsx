import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { toast } from 'sonner';

const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const [isApplied, setIsApplied] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const jobId = params.id;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));

          const alreadyApplied = res.data.job.applications.some(
            (application) => application.applicant === user?._id
          );

          setIsApplied(alreadyApplied);
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (jobId) {
      fetchSingleJob();
    }
  }, [jobId, dispatch, user?._id]);

  const applyJobHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${jobId}`,
        {},
        { withCredentials: true }
      );

      if (res.data.success) {
        setIsApplied(true);

        const updated = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user._id }],
        };

        dispatch(setSingleJob(updated));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.log(error);
    }
  };

  if (!singleJob) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[80vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">Job Not Found</h1>
            <p className="text-gray-600 mt-2">
              The job you are looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/jobs")} className="mt-4">
              Back to Jobs
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto my-10 px-4 mt-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-3xl">{singleJob?.title}</h1>

              <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">
                  {singleJob?.position} Positions
                </Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">
                  {singleJob?.jobType}
                </Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">
                  {singleJob?.salary} LPA
                </Badge>
              </div>
            </div>

            <Button
              disabled={isApplied}
              onClick={!isApplied ? applyJobHandler : null}
              className={`rounded-lg ${
                isApplied
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-[#7209b7] hover:bg-[#5f32ad]"
              }`}
            >
              {isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          <h1 className="border-b-2 border-gray-300 font-medium py-4 mt-6">
            Job Description
          </h1>

          <div className="my-6 space-y-4">
            <div className="flex">
              <h1 className="font-bold w-40">Role:</h1>
              <span>{singleJob?.title}</span>
            </div>

            <div className="flex">
              <h1 className="font-bold w-40">Location:</h1>
              <span>{singleJob?.location}</span>
            </div>

            <div className="flex">
              <h1 className="font-bold w-40">Description:</h1>
              <span>{singleJob?.description}</span>
            </div>

            <div className="flex">
              <h1 className="font-bold w-40">Experience:</h1>
              <span>{singleJob?.experience} yrs</span>
            </div>

            <div className="flex">
              <h1 className="font-bold w-40">Salary:</h1>
              <span>{singleJob?.salary} LPA</span>
            </div>

            <div className="flex">
              <h1 className="font-bold w-40">Total Applicants:</h1>
              <span>{singleJob?.applications?.length}</span>
            </div>

            <div className="flex">
              <h1 className="font-bold w-40">Posted Date:</h1>
              <span>{singleJob?.createdAt?.split("T")[0]}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescription;
