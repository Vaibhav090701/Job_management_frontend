import { useState, useEffect } from 'react';
import axios from 'axios';
import FilterForm from './FilterForm';
import JobCard from './JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [filters, setFilters] = useState({ jobTitle: '', location: '', jobType: '', salaryRange: '0-50000' });

  // Fetch all jobs on component mount (runs only once)
  useEffect(() => {
    axios.get('https://job-management-backend-8w1z.onrender.com/api/jobs')
      .then((response) => {
        console.log('Fetched jobs:', response.data); // Debug log
        setJobs(response.data);
        setFilteredJobs(response.data); // Initially, show all jobs
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setJobs([]);
        setFilteredJobs([]);
      });
  }, []); // Empty dependency array to run only once on mount

  // Apply filters whenever filters change (client-side filtering)
  useEffect(() => {
    console.log('Applying filters:', filters); // Debug log
    const filtered = jobs.filter((job) => {
      const { jobTitle, location, jobType, salaryRange } = filters;

      // Job Title filter (case-insensitive partial match)
      const matchesJobTitle = !jobTitle || (job.jobTitle && job.jobTitle.toLowerCase().includes(jobTitle.toLowerCase()));

      // Location filter (exact match, case-insensitive)
      const matchesLocation = !location || (job.location && job.location.toLowerCase() === location.toLowerCase());

      // Job Type filter (exact match, case-insensitive)
      const matchesJobType = !jobType || (job.jobType && job.jobType.toLowerCase() === jobType.toLowerCase());

      // Salary Range filter
      const matchesSalaryRange = !salaryRange || salaryRange === '0-50000' || (() => {
        try {
          const [minFilter, maxFilter] = salaryRange.split('-').map(Number);
          const [minJob, maxJob] = job.salaryRange.split('-').map(Number);
          // Check if the job's salary range overlaps with the filter range
          return minJob <= maxFilter && maxJob >= minFilter;
        } catch (error) {
          console.error('Error parsing salary range for job:', job, error);
          return true; // If parsing fails, don't filter out the job
        }
      })();

      const matches = matchesJobTitle && matchesLocation && matchesJobType && matchesSalaryRange;
      // Removed per-job console log to reduce noise
      return matches;
    });

    console.log('Filtered jobs:', filtered); // Debug log
    setFilteredJobs(filtered);
  }, [filters, jobs]);

  const applyFilters = (newFilters) => {
    // Only update filters if they have actually changed (shallow comparison)
    if (
      newFilters.jobTitle !== filters.jobTitle ||
      newFilters.location !== filters.location ||
      newFilters.jobType !== filters.jobType ||
      newFilters.salaryRange !== filters.salaryRange
    ) {
      setFilters(newFilters);
    }
  };

  return (
    <div>
      <FilterForm onFilter={applyFilters} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredJobs.length > 0 ? (
          filteredJobs.map((job) => <JobCard key={job.id} job={job} />)
        ) : (
          <p className="text-center text-gray-600 col-span-full">
            {jobs.length === 0 ? 'Loading jobs...' : 'No jobs found matching your criteria.'}
          </p>
        )}
      </div>
    </div>
  );
};

export default JobList;