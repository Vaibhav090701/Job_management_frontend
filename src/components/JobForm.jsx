import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useState } from 'react';
import { FaAngleDoubleDown, FaArrowsAltH } from "react-icons/fa";
import { MdDoubleArrow } from "react-icons/md";

const JobForm = ({ onClose }) => {
  const { register, getValues, handleSubmit, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const [deadline, setDeadline] = useState(new Date());

  const onSubmit =  async (data) => {
    const jobData = {
      ...data,
      applicationDeadline: deadline.toISOString().split('T')[0],
    };

     try {
    await axios.post('https://job-management-backend-8w1z.onrender.com/api/jobs', jobData);
    alert('Job created successfully!');
    navigate('/', { state: { refresh: true } });
  } catch (error) {
    console.error('Error creating job:', error);
    alert('Failed to create job. Please try again.');
  }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex justify-center items-center mb-5">
        <h2 className="text-2xl font-semibold text-gray-800">Create Job Opening</h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Job Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Title</label>
            <input
              {...register('jobTitle', { required: 'Job Title is required' })}
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Full Stack Developer"
            />
            {errors.jobTitle && <p className="text-red-500 text-sm">{errors.jobTitle.message}</p>}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Company Name</label>
            <input
              {...register('companyName', { required: 'Company Name is required' })}
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              placeholder="e.g., Amazon"
            />
            {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <select
              {...register('location', { required: 'Location is required' })}
              defaultValue=""
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>Choose Preferred Location</option>
              <option value="Chennai">Chennai</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Pune">Pune</option>
              <option value="Hyderabad">Hyderabad</option>
            </select>
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          {/* Job Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Type</label>
            <select
              {...register('jobType', { required: 'Job Type is required' })}
              defaultValue=""
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
            >
              <option value="" disabled>Select Job Type</option>
              <option value="Internship">Internship</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
            </select>
            {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType.message}</p>}
          </div>

          {/* Salary Range */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Range (₹)</label>
            <div className="flex items-center space-x-3">
              <input
                type="number"
                {...register('minSalary', {
                  required: 'Minimum salary is required',
                  valueAsNumber: true,
                  min: { value: 0, message: 'Minimum salary cannot be negative' }
                })}
                className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
                placeholder="₹0"
              />
              <FaArrowsAltH className="text-gray-400" />
              <input
                type="number"
                {...register('maxSalary', {
                  required: 'Maximum salary is required',
                  valueAsNumber: true,
                  validate: (value) => {
                    const minSalary = getValues('minSalary');
                    return value > minSalary || 'Maximum salary must be greater than minimum salary';
                  }
                })}
                className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
                placeholder="₹1200000"
              />
            </div>
            <div className="flex flex-col">
              {errors.minSalary && <p className="text-red-500 text-sm">{errors.minSalary.message}</p>}
              {errors.maxSalary && <p className="text-red-500 text-sm">{errors.maxSalary.message}</p>}
            </div>
          </div>

          {/* Application Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Application Deadline</label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              required
            />
          </div>

          {/* Job Description */}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">Job Description</label>
            <textarea
              {...register('jobDescription', { required: 'Job Description is required' })}
              className="w-full p-3 border border-gray-200 rounded-lg shadow-sm focus:ring-2 focus:ring-purple-500"
              rows="3"
              placeholder="Describe the job role and responsibilities..."
            />
            {errors.jobDescription && <p className="text-red-500 text-sm">{errors.jobDescription.message}</p>}
          </div>

        </div>

        {/* Buttons */}
        <div className="flex justify-between space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 text-gray-700 border rounded-lg shadow-sm hover:bg-gray-200"
          >
            <span className='flex items-center gap-1'>
              Save Draft <FaAngleDoubleDown />
            </span>
          </button>

          <button
            type="submit"
            className="px-6 py-3 bg-blue-500 text-white rounded-lg shadow-sm hover:bg-purple-700"
          >
            <span className='flex items-center gap-1'>
              Publish <MdDoubleArrow />
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
