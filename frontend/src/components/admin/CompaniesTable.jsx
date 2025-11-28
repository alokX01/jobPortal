import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CompaniesTable = () => {
  const navigate = useNavigate();
  const { companies, searchCompanyByText } = useSelector((store) => store.company);
  const [filterCompany, setFilterCompany] = useState(companies);

  useEffect(() => {
    const filteredCompany = companies.length >= 0 && companies.filter((company) => {
      if (!searchCompanyByText) {
        return true;
      }
      return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
    });
    setFilterCompany(filteredCompany);
  }, [companies, searchCompanyByText]);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <TableCaption className="text-gray-500">A list of your recent registered companies</TableCaption>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="font-semibold text-gray-900">Logo</TableHead>
            <TableHead className="font-semibold text-gray-900">Name</TableHead>
            <TableHead className="font-semibold text-gray-900">Date</TableHead>
            <TableHead className="text-right font-semibold text-gray-900">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!filterCompany || filterCompany.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-12 text-gray-500">
                No companies registered yet
              </TableCell>
            </TableRow>
          ) : (
            filterCompany.map((company) => (
              <TableRow key={company._id} className="hover:bg-gray-50">
                <TableCell>
                  <Avatar className="w-10 h-10">
                    <AvatarImage
                      src={company.logo}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </Avatar>
                </TableCell>
                <TableCell className="font-medium text-gray-900">{company.name}</TableCell>
                <TableCell className="text-gray-600">
                  {company.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger className="cursor-pointer hover:bg-gray-100 p-2 rounded-full transition-colors">
                      <MoreHorizontal className="text-gray-600" />
                    </PopoverTrigger>
                    <PopoverContent className="w-32 p-2 shadow-lg border border-gray-200 rounded-lg">
                      <div
                        onClick={() =>
                          navigate(`/admin/companies/${company._id}`)
                        }
                        className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 hover:text-blue-600 p-2 rounded transition-colors"
                      >
                        <Edit2 className="w-4" />
                        <span className="font-medium">Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CompaniesTable;