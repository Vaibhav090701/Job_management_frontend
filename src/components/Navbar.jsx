import { Link } from 'react-router-dom';

const Navbar = ({ onCreateJobClick }) => {
  return (
    <nav className="bg-white shadow-md p-4 rounded-full mx-auto mt-4 w-220">
      <div className="flex justify-between items-center font-[11px] font-semibold">
        <div className="text-2xl font-semibold text-gray-800">
          <img className=' ml-2 w-10 h-10' src="https://media.licdn.com/dms/image/v2/D560BAQHpPblOaplcOQ/company-logo_200_200/company-logo_200_200/0/1694017343509/cybermind_works_logo?e=2147483647&v=beta&t=N13ljMg1CHgxKadTUGz5b35KPUjx9qKRVed2giPMM00"></img>
        </div>
        <Link to="/" className="text-gray-800  hover:text-gray-900">Home</Link>
        <Link to="/" className="text-gray-800  hover:text-gray-900">Find Jobs</Link>
        <Link to="/" className="text-gray-800  hover:text-gray-900">Find Talents</Link>
        <Link to="/" className="text-gray-800  hover:text-gray-900">About us</Link>
        <Link to="/" className="text-gray-800 font-weight:[20px] hover:text-gray-900">Testimonials</Link>
      <button
        onClick={onCreateJobClick}
          className="bg-gradient-to-t from-purple-700 to-purple-500 text-white px-5 mr-2 py-2 rounded-full font-semibold hover:from-purple-800 hover:to-purple-600 transition-all"
      >
        Create Jobs
      </button>
            </div>

    </nav>
  );
};

export default Navbar;