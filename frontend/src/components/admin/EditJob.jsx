import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { JOB_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import Navbar from "../shared/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    description: "",
    salary: "",
    jobType: "",
    location: "",
    position: "",
    requirements: "",
    experience: "",
    companyId: ""
  });

  // Load Job
  const getJobDetails = async () => {
    try {
      const res = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        const j = res.data.job;

        setJob({
          title: j.title,
          description: j.description,
          salary: j.salary,
          jobType: j.jobType,
          location: j.location,
          position: j.position,
          requirements: j.requirements.join(","), // 👈 convert to string
          experience: j.experienceLevel, // 👈 backend stores experienceLevel
          companyId: j.company?._id || "" // 👈 REQUIRED
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load job details");
    }
  };

  useEffect(() => {
    getJobDetails();
  }, []);

  const changeHandler = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  // Update Job
  const submitHandler = async (e) => {
    e.preventDefault();

    const payload = {
      title: job.title,
      description: job.description,
      requirements: job.requirements, // 👈 string, backend will split
      salary: job.salary,
      location: job.location,
      jobType: job.jobType,
      experience: job.experience, // 👈 backend expects "experience"
      position: job.position,
      companyId: job.companyId // 👈 MUST include
    };

    try {
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        payload,
        { withCredentials: true }
      );

      if (res.data.success) {
        toast.success("Job updated successfully");
        navigate("/admin/jobs");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating job");
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-24 p-6 bg-white shadow-md rounded-xl border border-gray-200">
        <h1 className="text-2xl font-bold mb-5">Edit Job</h1>

        <form className="flex flex-col gap-4" onSubmit={submitHandler}>
          <div>
            <Label>Job Title</Label>
            <Input name="title" value={job.title} onChange={changeHandler} />
          </div>

          <div>
            <Label>Description</Label>
            <Input name="description" value={job.description} onChange={changeHandler} />
          </div>

          <div>
            <Label>Salary</Label>
            <Input name="salary" value={job.salary} onChange={changeHandler} />
          </div>

          <div>
            <Label>Job Type</Label>
            <Input name="jobType" value={job.jobType} onChange={changeHandler} />
          </div>

          <div>
            <Label>Location</Label>
            <Input name="location" value={job.location} onChange={changeHandler} />
          </div>

          <div>
            <Label>No. of Positions</Label>
            <Input name="position" value={job.position} onChange={changeHandler} />
          </div>

          <div>
            <Label>Requirements (comma-separated)</Label>
            <Input
              name="requirements"
              value={job.requirements}
              onChange={changeHandler}
              placeholder="React, Node, MongoDB"
            />
          </div>

          <div>
            <Label>Experience Level</Label>
            <Input
              name="experience"
              value={job.experience}
              onChange={changeHandler}
              placeholder="Fresher / Mid / Senior"
            />
          </div>

          <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white">
            Save Changes
          </Button>
        </form>
      </div>
    </>
  );
};

export default EditJob;
