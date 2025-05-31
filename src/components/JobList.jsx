import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import FilterForm from './FilterForm';
import JobCard from './JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ jobTitle: '', location: '', jobType: '', salaryRange: '' });

  // Fetch jobs only once on mount
  useEffect(() => {
    axios.get('https://job-management-backend-8w1z.onrender.com/api/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        setJobs([]);
      });
  }, []);

  useEffect(() => {
  // fetch filtered jobs when filters change
  const fetchFilteredJobs = async () => {
    try {
      const params = new URLSearchParams(filters).toString();
      const response = await axios.get(`https://job-management-backend-8w1z.onrender.com/api/jobs/filter?${params}`);
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching filtered jobs:', error);
      setJobs([]);
    }
  };

  fetchFilteredJobs();
}, [filters]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div>
      <FilterForm onFilter={applyFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
       {jobs.length > 0 ? (
  jobs.map((job) => <JobCard key={job.id} job={job} />)
) : (
  <p className="text-center text-gray-600 col-span-full">
    Loading or No jobs found matching your criteria.
  </p>
)}
      </div>
    </div>
  );
};

export default JobList;
