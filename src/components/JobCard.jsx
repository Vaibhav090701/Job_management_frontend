import { FaBriefcase, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa';

const JobCard = ({ job }) => {
  // Map company names to logo URLs (using Clearbit as an example)
  const getCompanyLogo = (company) => {
    switch (company.toLowerCase()) {
      case 'amazon':
        return 'https://logo.clearbit.com/amazon.com';
      case 'tesla':
        return 'https://logo.clearbit.com/tesla.com';
      case 'spotify':
        return 'https://logo.clearbit.com/spotify.com';
      default:
        return 'https://logo.clearbit.com/example.com'; // Fallback logo
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md relative">
      {/* Chip for "24h Ago" in the top-right corner */}
      <div className="absolute top-4 right-4 bg-sky-100 text-sky-800 text-xs font-medium px-3 py-1 rounded-full">
        24h Ago
      </div>

      {/* Company Logo */}
      <div className="mb-4">
        <img
          src={getCompanyLogo(job.companyName)}
          alt={`${job.companyName} logo`}
          className="w-16 h-16 object-contain"
          // onError={(e) => (e.target.src = 'https://logo.clearbit.com/example.com')} // Fallback on error
        />
      </div>

      {/* Job Title and Company Name */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">{job.jobTitle}</h2>
        <p className="text-sm text-gray-600">{job.companyName}</p>
      </div>

      {/* Job Details with Icons */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center space-x-2">
          <FaBriefcase className="text-gray-500" />
            <span>{!job.requirements || job.requirements === "0" ? "Entry level" : job.requirements}</span>

        </div>
        <div className="flex items-center space-x-2">
          <FaMapMarkerAlt className="text-gray-500" />
          <span>{job.jobType}</span>
        </div>
        <div className="flex items-center space-x-2">
          <FaMoneyBillWave className="text-gray-500" />
          <span>{(job.maxSalary / 100000).toFixed(0)} LPA</span>
        </div>
      </div>

      {/* Job Description */}
      <p className="text-sm text-gray-600 mb-4">{job.jobDescription}</p>

      {/* Full-Width Apply Button */}
      <button className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-200">
        Apply Now
      </button>
    </div>
  );
};

export default JobCard;