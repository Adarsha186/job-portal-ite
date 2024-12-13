import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../config/firebase"
import "../styles/JobServicePage.css";

function JobServicePage() {
  const [jobDetails, setJobDetails] = useState({
    title: "",
    description: "",
    location: "",
    email: "",
    jobType: "",
    workNature: "",
    clientName: "",
    jobDuration: "",
    payPerHour: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "jobs"), jobDetails); // "jobs" is the Firestore collection name
      alert("Job posted successfully!");
      setJobDetails({
        title: "",
        description: "",
        location: "",
        email: "",
        jobType: "",
        workNature: "",
        clientName: "",
        jobDuration: "",
        payPerHour: "",
      });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to post the job. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-container">
        <h2 className="form-title">Post a Job</h2>
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
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
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
      <footer className="footer">
        <p>&copy; 2024 Innovative Tech Explorers. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default JobServicePage;
