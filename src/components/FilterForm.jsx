import { useForm, useWatch } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';
import { CiLocationOn } from "react-icons/ci";
import { CiSearch } from "react-icons/ci";
import { BiUserVoice } from "react-icons/bi";


const FilterForm = ({ onFilter }) => {
  const [salaryRange, setSalaryRange] = useState([0, 50000]);

  const { control, register } = useForm();
  const formData = useWatch({ control }); // watches all form fields

  useEffect(() => {
    const filterData = { ...formData, salaryRange: `${salaryRange[0]}-${salaryRange[1]}` };
    console.log('Filter data being sent:', filterData); // Debug log
    onFilter(filterData);
  }, [formData, salaryRange, onFilter]);

  const formatSalaryRange = (range) => {
    const min = range[0] / 1000;
    const max = range[1] / 1000;
    return `₹${min}k - ₹${max}k`;
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-6 flex-wrap gap-8">
        {/* Job Title Filter */}
        <div className="flex items-center space-x-2">
          <CiSearch className="text-gray-600 text-2xl" />
          <input
            {...register('jobTitle')}
            placeholder="Search By Job Title, Role"
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto"
          />
        </div>

        <div className="border-l border-gray-300 h-8"></div>

        {/* Location Filter */}
        <div className="flex items-center space-x-2">
         
          <CiLocationOn className="text-gray-600 text-2xl" />
          <select
            {...register('location')}
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 text-gray-500"
          >
            <option value="">Preferred Location</option>
            <option value="Chennai">Chennai</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Hydrabad">Hydrabad</option>
            <option value="Bangalore">Bangalore</option>
          </select>
        </div>

        <div className="border-l border-gray-300 h-8"></div>

        {/* Job Type Filter */}
        <div className="flex items-center space-x-2">
          <BiUserVoice className="text-gray-600 text-2xl" />
          <select
            {...register('jobType')}
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48 text-gray-500"
          >
            <option value="">Job Type</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="border-l border-gray-300 h-8"></div>

        {/* Salary Range Slider */}
        <div className="flex items-center space-x-3 px-3 flex-1">
          <div className="w-full">
            <div className="flex justify-between items-center space-x-2 mb-5">
              <label className="text-black font-bold">Salary Per Month</label>
              <span className="text-black font-bold">{formatSalaryRange(salaryRange)}</span>
            </div>
            <Slider
              range
              min={0}
              max={100000}
              defaultValue={[0, 50000]}
              onChange={(value) => setSalaryRange(value)}
              trackStyle={{ backgroundColor: 'black' }}
              handleStyle={{ borderColor: 'black' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterForm;