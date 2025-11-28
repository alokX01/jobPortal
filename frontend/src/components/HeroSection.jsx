import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const searchJobHandler = () => {
    if (!query.trim()) return;
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative overflow-hidden bg-blue-50 mt-16">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-indigo-200/40 rounded-full blur-3xl" />
      <div className="absolute -bottom-16 -right-16 w-72 h-72 bg-purple-200/50 rounded-full blur-3xl" />

      <div className="relative flex flex-col items-center justify-center text-center px-4 sm:px-6 md:px-10 py-20 sm:py-28">
        <span className="px-4 py-2 rounded-full bg-white/80 text-blue-700 font-semibold text-sm sm:text-base shadow-sm backdrop-blur-md">
           No. 1 Job Hunt Platform
        </span>

        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mt-6 text-gray-900">
          Find, Apply & Land Your{" "}
          <span className="text-blue-700 font-extrabold">Dream Job</span>
        </h1>

        <p className="text-gray-600 text-sm sm:text-base max-w-2xl mx-auto mt-4">
          Unlock opportunities across industries. Search jobs that match your passion and grow your career today.
        </p>

        <div className="mt-8 flex w-full sm:w-[80%] md:w-[60%] lg:w-[45%] mx-auto bg-white border border-gray-200 shadow-lg rounded-full items-center gap-3 pl-5 py-2 backdrop-blur-sm">
          <input
            type="text"
            placeholder="Search by title, company or skill..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && searchJobHandler()}
            className="outline-none border-none w-full text-sm sm:text-base text-gray-700 placeholder:text-gray-400"
          />
          <Button
            onClick={searchJobHandler}
            className="rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-sm px-5 py-2 flex items-center gap-2"
          >
            <Search className="h-5 w-5" />
            <span className="hidden sm:inline font-medium">Search</span>
          </Button>
        </div>

        <div className="mt-8 text-gray-500 text-sm sm:text-base">
          Trusted by <span className="text-blue-700 font-semibold">10,000+</span> job seekers every month.
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
