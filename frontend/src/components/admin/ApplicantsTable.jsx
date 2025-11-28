import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { toast } from 'sonner'
import axios from 'axios'
import { APPLICATION_API_END_POINT } from '@/utils/constant'

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status }, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update status");
        }
    }

    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <Table>
                <TableCaption className="text-gray-500">A list of recent applied users</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-900">Full Name</TableHead>
                        <TableHead className="font-semibold text-gray-900">Email</TableHead>
                        <TableHead className="font-semibold text-gray-900">Contact</TableHead>
                        <TableHead className="font-semibold text-gray-900">Resume</TableHead>
                        <TableHead className="font-semibold text-gray-900">Date</TableHead>
                        <TableHead className="text-right font-semibold text-gray-900">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        applicants && applicants?.applications?.map((item) => (
                            <TableRow key={item._id} className="hover:bg-gray-50">
                                <TableCell className="font-medium text-gray-900">{item?.applicant?.fullname}</TableCell>
                                <TableCell className="text-gray-600">{item?.applicant?.email}</TableCell>
                                <TableCell className="text-gray-600">{item?.applicant?.phoneNumber}</TableCell>
                                <TableCell>
                                    {
                                        item.applicant?.profile?.resume ? (
                                            <a 
                                                className="text-blue-600 hover:underline cursor-pointer" 
                                                href={item?.applicant?.profile?.resume} 
                                                target="_blank" 
                                                rel="noopener noreferrer"
                                            >
                                                {item?.applicant?.profile?.resumeOriginalName || "View Resume"}
                                            </a>
                                        ) : <span className="text-gray-400">NA</span>
                                    }
                                </TableCell>
                                <TableCell className="text-gray-600">{item?.applicant?.createdAt.split("T")[0]}</TableCell>
                                <TableCell className="text-right">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                                            <MoreHorizontal className="text-gray-600" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 p-2 shadow-lg border border-gray-200 rounded-lg">
                                            {
                                                shortlistingStatus.map((status, index) => (
                                                    <div 
                                                        key={index}
                                                        onClick={() => statusHandler(status, item?._id)} 
                                                        className='flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors'
                                                    >
                                                        <span className="font-medium">{status}</span>
                                                    </div>
                                                ))
                                            }
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}

export default ApplicantsTable