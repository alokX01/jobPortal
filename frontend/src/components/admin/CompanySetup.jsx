import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'

const CompanySetup = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null
  })
  
  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value})
  }
  
  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({...input, file})
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      setLoading(true);
      const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/companies");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to update company");
    } finally {
      setLoading(false);
    }
  }

  // Auto-fill data on page load
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const res = await axios.get(`${COMPANY_API_END_POINT}/get/${params.id}`, {
          withCredentials: true
        });
        if (res.data.success) {
          const company = res.data.company;
          setInput({
            name: company.name || "",
            description: company.description || "",
            website: company.website || "",
            location: company.location || "",
            file: null
          });
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load company data");
      }
    };

    fetchCompanyData();
  }, [params.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar/>
      <div className="max-w-3xl mx-auto px-4 py-10 pt-24">
        <form onSubmit={submitHandler}>
          <div className='bg-white rounded-2xl shadow-sm border border-gray-200 p-8'>
            <div className='flex items-center gap-5 mb-8'>
              <Button 
                onClick={() => navigate("/admin/companies")} 
                variant="outline" 
                className='flex items-center gap-2 border-gray-200'
                type="button"
              >
                <ArrowLeft/>
                <span>Back</span>
              </Button>
              <h1 className='font-bold text-2xl text-gray-900'>Company Setup</h1>
            </div>
            
            <div className='grid grid-cols-2 gap-6'>
              <div>
                <Label className="text-gray-900 font-medium">Company Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={input.name}
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
                <Label className="text-gray-900 font-medium">Website</Label>
                <Input
                  type="text"
                  name="website"
                  value={input.website}
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
                <Label className="text-gray-900 font-medium">Logo</Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="mt-2 border-gray-200 shadow-sm"
                />
              </div>
            </div>

            <div className='mt-8'>
              {
                loading ? (
                  <Button disabled className="w-full bg-blue-600">
                    <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait
                  </Button>
                ) : (
                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-sm">
                    Update
                  </Button>
                )
              }
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CompanySetup