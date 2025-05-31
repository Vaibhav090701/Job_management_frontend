import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import FilterForm from './FilterForm';
import JobCard from './JobCard';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ jobTitle: '', location: '', jobType: '', salaryRange: '0-50000' });

  // Fetch jobs only once on mount
  useEffect(() => {
    axios.get('http://localhost:8080/api/jobs')
      .then((response) => {
        setJobs(response.data);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setJobs([]);
      });
  }, []);

  // Memoized filter logic
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const { jobTitle, location, jobType, salaryRange } = filters;

      const matchesJobTitle = !jobTitle || (job.jobTitle?.toLowerCase().includes(jobTitle.toLowerCase()));
      const matchesLocation = !location || (job.location?.toLowerCase() === location.toLowerCase());
      const matchesJobType = !jobType || (job.jobType?.toLowerCase() === jobType.toLowerCase());

      // Salary Range Filter
      let matchesSalaryRange = true;
      if (salaryRange) {
        try {
          const [minFilter, maxFilter] = salaryRange.split('-').map(Number);

          let minJob = 0, maxJob = 0;
          const sr = job.salaryRange;

          if (sr.includes('-')) {
            [minJob, maxJob] = sr.split('-').map(Number);
          } else if (sr.includes(' to ')) {
            [minJob, maxJob] = sr.split(' to ').map(Number);
          } else if (sr.includes('K')) {
            [minJob, maxJob] = sr.split('-').map(val => Number(val.replace('K', '')) * 1000);
          } else {
            // Unrecognized format — skip salary filtering
            return true;
          }

          matchesSalaryRange = minJob <= maxFilter && maxJob >= minFilter;
        } catch {
          matchesSalaryRange = true; // On parse failure, don't filter out
        }
      }

      return matchesJobTitle && matchesLocation && matchesJobType && matchesSalaryRange;
    });
  }, [filters, jobs]);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
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
