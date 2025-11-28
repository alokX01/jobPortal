import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Button } from './ui/button'
import { Mail, Phone, FileText, Edit } from 'lucide-react'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJobs'

const Profile = () => {
    useGetAppliedJobs(); // ✅ Add this hook
    const [open, setOpen] = useState(false);
    const user = useSelector(store => store.auth?.user);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <div className='max-w-4xl mx-auto mt-20 px-4 py-8'>
                
                <div className='bg-white border border-gray-200 rounded-2xl p-8 shadow-sm'>
                    <div className='flex justify-between items-start mb-6'>
                        <div className='flex items-center gap-4'>
                            <img 
                                src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} 
                                alt="profile" 
                                className='h-24 w-24 rounded-full object-cover'
                            />
                            <div>
                                <h1 className='font-bold text-2xl'>{user?.fullname || "Your Name"}</h1>
                                <p className='text-gray-600 mt-1'>{user?.profile?.bio || "Add your bio"}</p>
                            </div>
                        </div>

                        <Button 
                            onClick={() => setOpen(true)} 
                            variant="outline" 
                            className="flex items-center gap-2"
                        >
                            <Edit size={16} />
                            Edit
                        </Button>
                    </div>

                    <div className='space-y-3 mb-6'>
                        <div className='flex items-center gap-3 text-gray-700'>
                            <Mail size={20} />
                            <span>{user?.email || "Add email"}</span>
                        </div>
                        <div className='flex items-center gap-3 text-gray-700'>
                            <Phone size={20} />
                            <span>{user?.phoneNumber || "Add phone number"}</span>
                        </div>
                    </div>

                    <div className='mb-6'>
                        <h2 className='font-bold text-lg mb-3'>Skills</h2>
                        <div className='flex flex-wrap gap-2'>
                            {user?.profile?.skills?.length > 0 ? (
                                user.profile.skills.map((skill, index) => (
                                    <span 
                                        key={index}
                                        className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'
                                    >
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className='text-gray-500'>No skills added</span>
                            )}
                        </div>
                    </div>

                    <div>
                        <h2 className='font-bold text-lg mb-3'>Resume</h2>

                        {user?.profile?.resume ? (
                            <a 
                                href={user.profile.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className='flex items-center gap-2 text-blue-600 hover:underline'
                            >
                                <FileText size={20} />
                                {user.profile.resumeOriginalName || "View Resume"}
                            </a>
                        ) : (
                            <span className='text-gray-500'>No resume uploaded</span>
                        )}
                    </div>

                </div>

                <div className='bg-white rounded-2xl p-8 mt-5 shadow-sm'>
                    <h2 className='font-bold text-xl mb-4'>Applied Jobs</h2>
                    <AppliedJobTable/>
                </div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen}/>
        </div>
    )
}

export default Profile