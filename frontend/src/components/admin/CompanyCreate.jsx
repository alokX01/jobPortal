import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/companySlice'
import { toast } from 'sonner'

const CompanyCreate = () => {
  const [companyName, setCompanyName] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const registerNewCompany = async () => {
    if (!companyName.trim()) {
      toast.error("Company name is required");
      return;
    }

    try {
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to create company");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className='max-w-4xl mx-auto px-4 py-10 pt-24'>
        <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
          <div className='mb-8'>
            <h1 className='font-bold text-2xl text-gray-900 mb-2'>Your Company Name</h1>
            <p className='text-gray-500'>What would you like to give your company name? You can change this later.</p>
          </div>

          <div className='mb-6'>
            <Label className="text-gray-900 font-medium">Company Name</Label>
            <Input
              type="text"
              className="mt-2 border-gray-200 shadow-sm"
              placeholder="e.g. tcs, wipro"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />
          </div>

          <div className='flex items-center gap-4'>
            <Button 
              variant="outline" 
              onClick={() => navigate("/admin/companies")}
              className="border-gray-200"
            >
              Cancel
            </Button>
            <Button 
              onClick={registerNewCompany}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CompanyCreate