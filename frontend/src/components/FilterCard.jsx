import React, { useCallback, useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button"; // Optional: for clear filters button

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "40k-1L", "1L - 5L"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = useCallback((value) => {
    setSelectedValue(value);
  }, []);

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  const clearFilters = () => {
    setSelectedValue('');
    dispatch(setSearchedQuery(''));
  };

  return (
    <div className="w-full bg-white dark:bg-gray-900/60 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md p-5 transition-all duration-300">
      {/* Heading */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="font-extrabold text-xl text-gray-900 dark:text-gray-100 tracking-tight">
          Filters
        </h1>
        {selectedValue && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear
          </button>
        )}
      </div>
      <hr className="border-gray-200 dark:border-gray-700 mb-4" />

      {/* Single RadioGroup for all filters */}
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((section, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-semibold text-base sm:text-lg text-gray-800 dark:text-gray-200 mb-2">
              {section.filterType}
            </h2>
            <div className="space-y-2">
              {section.array.map((item, idx) => {
                const itemId = `id-${index}-${idx}`;
                return (
                  <div
                    key={itemId}
                    className="flex items-center space-x-3 group px-2 py-1.5 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800/40 transition-colors cursor-pointer"
                  >
                    <RadioGroupItem
                      value={item}
                      id={itemId}
                      className="border-gray-400 dark:border-gray-500 text-blue-600 focus:ring-blue-500"
                    />
                    <Label
                      htmlFor={itemId}
                      className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
            {index < filterData.length - 1 && (
              <hr className="my-4 border-gray-200 dark:border-gray-700" />
            )}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

FilterCard.displayName = "FilterCard";

export default FilterCard;