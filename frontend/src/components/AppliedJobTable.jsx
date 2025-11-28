import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const AppliedJobTable = () => {
    const { allAppliedJobs } = useSelector(store => store.job);

    return (
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <Table>
                <TableCaption className="text-gray-500">A list of your applied jobs</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-50">
                        <TableHead className="font-semibold text-gray-900">Date</TableHead>
                        <TableHead className="font-semibold text-gray-900">Job Role</TableHead>
                        <TableHead className="font-semibold text-gray-900">Company</TableHead>
                        <TableHead className="text-right font-semibold text-gray-900">Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {!allAppliedJobs || allAppliedJobs.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                                You haven't applied to any jobs yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedJobs.map((appliedJob) => (
                            <TableRow key={appliedJob._id} className="hover:bg-gray-50">
                                <TableCell className="text-gray-600">
                                    {appliedJob?.createdAt?.split("T")[0]}
                                </TableCell>
                                <TableCell className="font-medium text-gray-900">
                                    {appliedJob?.job?.title}
                                </TableCell>
                                <TableCell className="text-gray-600">
                                    {appliedJob?.job?.company?.name}
                                </TableCell>
                                <TableCell className="text-right">
                                    <Badge 
                                        className={`
                                            ${appliedJob?.status === "rejected" 
                                                ? 'bg-red-100 text-red-700' 
                                                : appliedJob?.status === 'accepted' 
                                                ? 'bg-green-100 text-green-700' 
                                                : 'bg-gray-100 text-gray-700'
                                            }
                                        `}
                                    >
                                        {appliedJob?.status?.toUpperCase()}
                                    </Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    )
}

export default AppliedJobTable