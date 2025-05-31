import { useForm } from 'react-hook-form';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { useState, useEffect } from 'react';
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaMoneyBillWave } from 'react-icons/fa';

const FilterForm = ({ onFilter }) => {
  const { register, watch } = useForm();
  const [salaryRange, setSalaryRange] = useState([0, 50000]);

  // Use watch subscription to avoid infinite loop
  useEffect(() => {
    const subscription = watch((formData) => {
      const filterData = { ...formData, salaryRange: `${salaryRange[0]}-${salaryRange[1]}` };
      onFilter(filterData);
    });

    return () => subscription.unsubscribe(); // Cleanup
  }, [watch, salaryRange, onFilter]);

  const formatSalaryRange = (range) => {
    const min = range[0] / 1000;
    const max = range[1] / 1000;
    return `${min}K to ${max}K`;
  };

  return (
    <div className="mb-4 p-4 bg-white rounded-lg shadow-md">
      <div className="flex items-center space-x-6 flex-wrap gap-8">
        {/* Job Title Filter */}
        <div className="flex items-center space-x-2">
          <FaSearch className="text-gray-600" />
          <input
            {...register('jobTitle')}
            placeholder="Search By Job Title, Role"
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-auto"
          />
        </div>

        <div className="border-l border-gray-300 h-8"></div>

        {/* Location Filter */}
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-600" />
          <select
            {...register('location')}
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          >
            <option value="" disable selected>Preferred Location</option>
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
          <FaBriefcase className="text-gray-600" />
          <select
            {...register('jobType')}
            className="p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
          >
            <option value="" disble selected>Job Type</option>
            <option value="Internship">Internship</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>

        <div className="border-l border-gray-300 h-8"></div>

        {/* Salary Range Slider */}
        <div className="flex items-center space-x-4 px-7 flex-1">
          <div className="w-full">
            <div className="flex justify-between items-center space-x-1  mb-5">
              <label className="text-black font-bold">Salary Per Month</label>
              <span className="text-gray-600">{formatSalaryRange(salaryRange)}</span>
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
