import React, { useEffect } from 'react'
import Navbar from './shared/Navbar'
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery } = useSelector(store => store.job); // ✅ Get searchedQuery
    const dispatch = useDispatch();

    useEffect(() => {
        return () => {
            dispatch(setSearchedQuery(""));
        }
    }, [dispatch]);

    // ✅ Filter jobs based on search
    const displayJobs = searchedQuery 
        ? allJobs.filter(job => 
            job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
            job.company?.name.toLowerCase().includes(searchedQuery.toLowerCase())
          )
        : allJobs;

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-7xl mx-auto my-10 px-4 pt-20'>
                <h1 className='font-bold text-xl my-10'>
                    Search Results ({displayJobs.length})
                </h1>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {
                        displayJobs.length === 0 ? (
                            <div className="col-span-full text-center py-12 text-gray-500">
                                No jobs found matching "{searchedQuery}"
                            </div>
                        ) : (
                            displayJobs.map((job) => {
                                return (
                                    <Job key={job._id} job={job} />
                                )
                            })
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Browse