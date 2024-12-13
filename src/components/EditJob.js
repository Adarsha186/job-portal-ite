import React, { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useParams, useNavigate } from "react-router-dom";

function EditJob() {
  const { id } = useParams(); // Get the job ID from the URL
  const navigate = useNavigate(); // Navigate back to the manage jobs page
  const [jobDetails, setJobDetails] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch the job details on component mount
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const docRef = doc(db, "jobs", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setJobDetails(docSnap.data().jobDetails);
        } else {
          console.error("No such job exists!");
        }
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleUpdate = async () => {
    setIsSubmitting(true);
    try {
      const docRef = doc(db, "jobs", id);
      await updateDoc(docRef, {jobDetails}); // Update job details in Firestore
      alert("Job updated successfully!");
      navigate("/manage-jobs"); // Navigate back to the manage jobs page
    } catch (error) {
      console.error("Error updating job:", error);
      alert("Failed to update the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!jobDetails) {
    return <p>Loading job details...</p>;
  }

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Edit Job</h2>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdate();
          }}
        >
          <label htmlFor="title" className="form-label">
            Job Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter the job title"
            value={jobDetails.title}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="description" className="form-label">
            Job Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Enter the job description"
            value={jobDetails.description}
            onChange={handleChange}
            className="form-textarea"
            rows="4"
            required
          ></textarea>

          <label htmlFor="location" className="form-label">
            Location
          </label>
          <input
            id="location"
            name="location"
            type="text"
            placeholder="Enter the job location"
            value={jobDetails.location}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="email" className="form-label">
            HR Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter the HR email"
            value={jobDetails.email}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="jobType" className="form-label">
            Job Type
          </label>
          <select
            id="jobType"
            name="jobType"
            value={jobDetails.jobType}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Job Type</option>
            <option value="Full-time">Full-time</option>
            <option value="Contractor">Contractor</option>
            <option value="Intern">Intern</option>
            <option value="Part-time">Part-time</option>
          </select>

          <label htmlFor="workNature" className="form-label">
            Work Nature
          </label>
          <select
            id="workNature"
            name="workNature"
            value={jobDetails.workNature}
            onChange={handleChange}
            className="form-select"
            required
          >
            <option value="">Select Work Nature</option>
            <option value="On-site">On-site</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Remote">Remote</option>
          </select>

          <label htmlFor="clientName" className="form-label">
            Client
          </label>
          <input
            id="clientName"
            name="clientName"
            type="text"
            placeholder="Enter the client's name"
            value={jobDetails.clientName}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="jobDuration" className="form-label">
            Job Duration (in months)
          </label>
          <input
            id="jobDuration"
            name="jobDuration"
            type="number"
            placeholder="Enter the duration in months"
            value={jobDetails.jobDuration}
            onChange={handleChange}
            className="form-input"
            required
          />

          <label htmlFor="payPerHour" className="form-label">
            Pay Per Hour (in USD)
          </label>
          <input
            id="payPerHour"
            name="payPerHour"
            type="number"
            placeholder="Enter the pay per hour"
            value={jobDetails.payPerHour}
            onChange={handleChange}
            className="form-input"
            required
          />

          <button type="submit" className="form-button" disabled={isSubmitting}>
            {isSubmitting ? "Updating..." : "Update Job"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditJob;
