import { Link } from 'react-router-dom';

const Navbar = ({ onCreateJobClick }) => {
  return (
    <nav className="bg-white shadow-md p-4 rounded-full mx-auto mt-4 flex items-center w-250">
      <div className="flex justify-between items-center  space-x-15">
        <div className="text-2xl font-bold text-gray-800">
          <img className=' ml-2 w-10 h-10' src="https://media.licdn.com/dms/image/v2/D560BAQHpPblOaplcOQ/company-logo_200_200/company-logo_200_200/0/1694017343509/cybermind_works_logo?e=2147483647&v=beta&t=N13ljMg1CHgxKadTUGz5b35KPUjx9qKRVed2giPMM00"></img>
        </div>
        <Link to="/" className="text-black font-bold hover:text-gray-900">Home</Link>
        <Link to="/" className="text-black font-bold hover:text-gray-900">Find Jobs</Link>
        <Link to="/" className="text-black font-bold hover:text-gray-900">Find Talent</Link>
        <Link to="/" className="text-black font-bold hover:text-gray-900">About Us</Link>
        <Link to="/" className="text-black font-bold hover:text-gray-900">Testimonials</Link>
      <button
        onClick={onCreateJobClick}
        className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition-colors"
      >
        Create Job
      </button>
            </div>

    </nav>
  );
};

export default Navbar;