import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Button } from "@/components/ui/button";
import { User2, LogOut, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const user = useSelector((store) => store.auth?.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false); // mobile menu toggle

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <div className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6">

        {/* Logo */}
        <h1 className="text-2xl font-extrabold tracking-tight">
          Job<span className="text-blue-600">Portal</span>
        </h1>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden flex items-center"
          onClick={() => setOpen(!open)}
        >
          <Menu size={26} className="text-gray-700" />
        </button>

        {/* Desktop Navigation */}
        <div className="hidden sm:flex items-center gap-10">
          <ul className="flex gap-6 font-medium items-center text-gray-700">
            {user && user.role === "recruiter" ? (
              <>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  <Link to="/admin/companies">Companies</Link>
                </li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  <Link to="/admin/jobs">Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  <Link to="/">Home</Link>
                </li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  <Link to="/jobs">Jobs</Link>
                </li>
                <li className="hover:text-blue-600 transition-colors cursor-pointer">
                  <Link to="/browse">Browse</Link>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons / Avatar */}
          {!user ? (
            <div className="flex gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="w-9 h-9 cursor-pointer">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://github.com/shadcn.png"
                    }
                    alt="User"
                    className="w-9 h-9 rounded-full"
                  />
                  <AvatarFallback className="w-9 h-9 flex items-center justify-center bg-gray-200 text-sm font-semibold rounded-full">
                    {user?.fullname?.charAt(0) || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 p-4 rounded-lg border border-gray-200 shadow-lg bg-white">
                {/* User Info */}
                <div className="flex gap-3 items-center">
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="User"
                    />
                    <AvatarFallback className="w-10 h-10 flex items-center justify-center bg-gray-200 text-sm font-semibold rounded-full">
                      {user?.fullname?.charAt(0) || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">{user?.email}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex flex-col gap-2">
                  {user?.role === "student" && (
                    <Link to="/profile">
                      <Button
                        variant="link"
                        className="p-0 h-auto text-blue-600 hover:underline flex items-center gap-2 justify-start"
                      >
                        <User2 size={16} /> View Profile
                      </Button>
                    </Link>
                  )}

                  <Button
                    variant="link"
                    onClick={logoutHandler}
                    className="p-0 h-auto text-blue-600 hover:underline flex items-center gap-2 justify-start"
                  >
                    <LogOut size={16} /> Logout
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {open && (
        <div className="sm:hidden bg-white border-t border-gray-200 py-3 px-4 space-y-3 shadow-md">

          {/* Mobile Links */}
          {user && user.role === "recruiter" ? (
            <>
              <Link className="block text-gray-700 font-medium" to="/admin/companies">Companies</Link>
              <Link className="block text-gray-700 font-medium" to="/admin/jobs">Jobs</Link>
            </>
          ) : (
            <>
              <Link className="block text-gray-700 font-medium" to="/">Home</Link>
              <Link className="block text-gray-700 font-medium" to="/jobs">Jobs</Link>
              <Link className="block text-gray-700 font-medium" to="/browse">Browse</Link>
            </>
          )}

          {/* Auth Buttons */}
          {!user ? (
            <>
              <Link to="/login">
                <Button className="w-full mt-1" variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-blue-600 text-white mt-1">Signup</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile">
                <Button variant="outline" className="w-full">Profile</Button>
              </Link>

              <Button onClick={logoutHandler} className="w-full bg-red-500 text-white">
                Logout
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
