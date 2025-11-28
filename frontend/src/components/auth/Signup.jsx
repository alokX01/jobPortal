import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) formData.append("file", input.file);

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 PROTECTION → If user already logged in, block signup and redirect
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* Clean Solid Background */}
      <div className="flex items-center justify-center min-h-screen bg-blue-50 pt-24 sm:pt-28 px-4">
        <div className="w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200">

          {/* Header */}
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 sm:mb-8">
            <span className="text-gray-800">Create</span>{" "}
            <span className="text-blue-700">Account</span>
          </h1>

          {/* Form */}
          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={submitHandler}>

            {/* Full Name */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-700 font-medium">Full Name</Label>
              <Input
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                placeholder="John Doe"
                className="h-10 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-700 font-medium">Email Address</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="johndoe@example.com"
                className="h-10 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-700 font-medium">Phone Number</Label>
              <Input
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="+91 8080808080"
                className="h-10 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label className="text-gray-700 font-medium">Password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="h-10 border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role + Upload */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-8 mt-2">

              {/* Role */}
              <div className="w-full sm:w-1/2">
                <Label className="text-gray-700 font-medium">Select Role</Label>
                <RadioGroup className="flex justify-between mt-1">
                  
                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      id="student"
                      name="role"
                      value="student"
                      checked={input.role === "student"}
                      onChange={changeEventHandler}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="student">Student</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Input
                      type="radio"
                      id="recruiter"
                      name="role"
                      value="recruiter"
                      checked={input.role === "recruiter"}
                      onChange={changeEventHandler}
                      className="cursor-pointer"
                    />
                    <Label htmlFor="recruiter">Recruiter</Label>
                  </div>

                </RadioGroup>
              </div>

              {/* Profile Upload */}
              <div className="w-full sm:w-1/2">
                <Label className="text-gray-700 font-medium">Profile Picture</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer border-gray-300"
                />
              </div>

            </div>

            {/* Submit */}
            {loading ? (
              <Button disabled className="w-full flex justify-center items-center gap-2 mt-5">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mt-5 bg-blue-600 hover:bg-blue-700 text-white h-11 sm:h-12 rounded-md text-sm sm:text-base font-semibold tracking-wide shadow-sm"
              >
                Sign Up
              </Button>
            )}

          </form>

          {/* Footer */}
          <p className="text-sm sm:text-base text-gray-600 text-center mt-6">
            Already have an account?{" "}
            <Link className="text-blue-600 hover:underline font-medium" to="/login">
              Login
            </Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default Signup;
