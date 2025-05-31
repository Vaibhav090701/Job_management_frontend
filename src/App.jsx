import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import JobList from './components/JobList';
import JobForm from './components/JobForm';
import './index.css';
import { useState } from 'react';
import { Modal, Box } from '@mui/material';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <Router>
      <div>
        <Navbar onCreateJobClick={openModal} />
        <div className="mx-auto p-4">
          <Routes>
            <Route path="/" element={<JobList />} />
            <Route
              path="*"
              element={
                <p className="text-center mt-4">
                  Page not found. <a href="/" className="text-blue-500">Go to Home</a>
                </p>
              }
            />
          </Routes>
        </div>

        {/* MUI Modal */}
        <Modal open={isModalOpen} onClose={closeModal}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '90%',
              maxWidth: 700,
              maxHeight: '90vh',
              overflowY: 'auto',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
              borderRadius: 2,
              outline: 'none',
              
            }}
          >
            <JobForm onClose={closeModal} />
          </Box>
        </Modal>
      </div>
    </Router>
  );
}

export default App;
