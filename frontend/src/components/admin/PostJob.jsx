import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'

const PostJob = () => {
    useGetAllCompanies();
    
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post job");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className='max-w-4xl mx-auto px-4 py-10 pt-24'>
                <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
                    <h1 className='font-bold text-2xl text-gray-900 mb-6'>Post New Job</h1>
                    
                    <form onSubmit={submitHandler}>
                        <div className='grid grid-cols-2 gap-6'>
                            <div>
                                <Label className="text-gray-900 font-medium">Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={input.title}
                                    onChange={changeEventHandler}
                                    className="mt-2 border-gray-200 shadow-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-900 font-medium">Description</Label>
                                <Input
                                    type="text"
                                    name="description"
                                    value={input.description}
                                    onChange={changeEventHandler}
                                    className="mt-2 border-gray-200 shadow-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-900 font-medium">Requirements</Label>
                                <Input
                                    type="text"
                                    name="requirements"
                                    value={input.requirements}
                                    onChange={changeEventHandler}
                                    className="mt-2 border-gray-200 shadow-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-900 font-medium">Salary (LPA)</Label>
                                <Input
                                    type="text"
                                    name="salary"
                                    value={input.salary}
                                    onChange={changeEventHandler}
                                    className="mt-2 border-gray-200 shadow-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-900 font-medium">Location</Label>
                                <Input
                                    type="text"
                                    name="location"
                                    value={input.location}
                                    onChange={changeEventHandler}
                                    className="mt-2 border-gray-200 shadow-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-900 font-medium">Job Type</Label>
                                <Input
                                    type="text"
                                    name="jobType"
                                    value={input.jobType}
                                    onChange={changeEventHandler}
                                    className="mt-2 border-gray-200 shadow-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-900 font-medium">Experience Level (Years)</Label>
                                <Input
                                    type="text"
                                    name="experience"
                                    value={input.experience}
                                    onChange={changeEventHandler}
                                    className="mt-2 border-gray-200 shadow-sm"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-900 font-medium">No of Positions</Label>
                                <Input
                                    type="number"
                                    name="position"
                                    value={input.position}
                                    onChange={changeEventHandler}
                                    className="mt-2 border-gray-200 shadow-sm"
                                />
                            </div>
                            {companies.length > 0 && (
                                <div className="col-span-2">
                                    <Label className="text-gray-900 font-medium">Company</Label>
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="mt-2 border-gray-200 shadow-sm">
                                            <SelectValue placeholder="Select a Company" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {companies.map((company) => (
                                                    <SelectItem key={company._id} value={company?.name?.toLowerCase()}>
                                                        {company.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            )}
                        </div>

                        {companies.length === 0 && (
                            <p className='text-sm text-red-600 font-medium text-center my-4'>
                                *Please register a company first, before posting a job
                            </p>
                        )}

                        <div className='mt-8'>
                            {loading ? (
                                <Button disabled className="w-full bg-blue-600">
                                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                                </Button>
                            ) : (
                                <Button 
                                    type="submit" 
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
                                    disabled={companies.length === 0}
                                >
                                    Post New Job
                                </Button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PostJob