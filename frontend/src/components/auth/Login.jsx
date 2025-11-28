import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setLoading, setUser } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));

      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success(res.data.message);
        navigate("/"); // redirect after login
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  // 🔥 PROTECTION: If user is already logged in, redirect HOME
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <>
      {/* NAVBAR FIXED */}
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
        <Navbar />
      </div>

      {/* CLEAN BLUE BACKGROUND */}
      <div className="flex items-center justify-center min-h-screen bg-blue-50 pt-24 sm:pt-28 px-4">
        <div className="w-full max-w-md sm:max-w-lg bg-white/95 backdrop-blur-md shadow-lg rounded-2xl p-6 sm:p-8 border border-gray-200">
          
          <h1 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 sm:mb-8">
            <span className="text-slate-800">Welcome</span>{" "}
            <span className="text-blue-700">Back</span>
          </h1>

          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={submitHandler}>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email" className="text-gray-700 font-medium">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="johndoe@example.com"
                className="h-10 text-sm sm:text-base border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="password" className="text-gray-700 font-medium">
                Password
              </Label>
              <Input
                type="password"
                id="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder="••••••••"
                className="h-10 text-sm sm:text-base border-gray-300 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Role */}
            <div className="w-full flex flex-col gap-2 mt-2">
              <Label className="text-gray-700 font-medium">Select Role</Label>
              <RadioGroup className="flex gap-6">
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

            <div className="text-right text-sm sm:text-base">
              <Link to="/forgot-password" className="text-blue-600 hover:underline font-medium">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            {loading ? (
              <Button disabled className="w-full flex justify-center items-center gap-2">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait...
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white h-11 sm:h-12 text-sm sm:text-base font-semibold tracking-wide rounded-md shadow-sm transition-all duration-200"
              >
                Login
              </Button>
            )}
          </form>

          <p className="text-sm sm:text-base text-gray-600 text-center mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 font-medium hover:underline">
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </>
  );
};

export default Login;
