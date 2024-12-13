import './App.css';
import JobServicePage from './components/JobServicePage';
import { Routes, BrowserRouter, Route } from 'react-router-dom';
import EditJob from './components/EditJob';
import ManageJobs from './components/ManageJobs';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/job-portal-ite" element={<JobServicePage />} />
        <Route path="/manage-jobs" element={<ManageJobs />} />
        <Route path="/edit-job/:id" element={<EditJob />} />
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
