import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import FilterCard from './FilterCard'
import Job from './Job';
import { motion } from 'framer-motion';
import { useSelector } from "react-redux";

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector((store) => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) => {
                return (
                    job.title?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.description?.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                    job.location?.toLowerCase().includes(searchedQuery.toLowerCase())
                );
            });
            setFilterJobs(filtered);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="max-w-7xl mx-auto mt-20 px-4 py-5">
                <div className="flex flex-col lg:flex-row gap-5">

                    {/* Filter Sidebar */}
                    <div className="w-full lg:w-1/4">
                        <FilterCard />
                    </div>

                    {/* Job Cards Area */}
                    <div className="flex-1">
                        {filterJobs.length === 0 ? (
                            <div className="flex items-center justify-center h-[60vh]">
                                <span className="text-xl text-gray-500">No Jobs Found</span>
                            </div>
                        ) : (
                            <div className="h-[85vh] overflow-y-auto pb-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                                    {filterJobs.map((job) => (
                                        <motion.div
                                            key={job?._id}
                                            initial={{ opacity: 0, x: 100 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Job job={job} />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
