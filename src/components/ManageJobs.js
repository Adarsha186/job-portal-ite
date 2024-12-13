import React, { useState, useEffect } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/ManageJob.css"; // Import the CSS file

function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "jobs"));
        const jobsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(), // Spread the data, including jobDetails and dateCreated
        }));
        setJobs(jobsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "jobs", id));
      setJobs(jobs.filter((job) => job.id !== id));
      alert("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      alert("Failed to delete the job.");
    }
  };

  return (
    <div className="page-container">
      <div className="flex justify-between items-center mb-6">
        <h2 className="form-title">Manage Jobs</h2>
        {/* Back to Home Button */}
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition"
          onClick={() => navigate("/job-portal-ite")} // Navigate back to home page
        >
          Back to Home
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : jobs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Job Title</th>
              <th>Client</th>
              <th>Location</th>
              <th>Date Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job.id}>
                <td>{job.jobDetails?.title}</td>
                <td>{job.jobDetails?.clientName}</td>
                <td>{job.jobDetails?.location}</td>
                <td>
                  {job.dateCreated
                    ? job.dateCreated.toDate().toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  <button onClick={() => navigate(`/edit-job/${job.id}`)}>
                    Edit
                  </button>
                  <button onClick={() => handleDelete(job.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No jobs found.</p>
      )}
    </div>
  );
}

export default ManageJobs;
