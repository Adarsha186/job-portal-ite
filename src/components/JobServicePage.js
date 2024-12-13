import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobDetails({ ...jobDetails, [name]: value });
  };

  const handleSubmit = async () => {
    const GITHUB_TOKEN = process.env.REACT_APP_GITHUB_TOKEN;
    const REPO_OWNER = "Adarsha186";
    const REPO_NAME = "innovate_tech_explorers";
    const FILE_PATH = "jobs.json";
  
    try {
      // Step 1: Fetch the current file
      const fileResponse = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
          },
        }
      );
  
      if (!fileResponse.ok) {
        throw new Error(`Failed to fetch current jobs file. Status: ${fileResponse.status}`);
      }
  
      const fileData = await fileResponse.json();
      const { sha, content } = fileData;
      console.log("hello")
      // Decode the current content
      let currentJobs = [];
      if (content) {
        const decodedContent = atob(content);
        try {
          currentJobs = JSON.parse(decodedContent.trim() || "[]");
        } catch (error) {
          console.warn("Failed to parse existing JSON. Assuming empty array.");
          currentJobs = [];
        }
      }
  
      // Step 2: Append new job
      const updatedJobs = [...currentJobs, jobDetails];
  
      // Encode updated content to Base64 using the polyfill
      const updatedContent = base64Encode(JSON.stringify(updatedJobs, null, 2));
  
      // Step 3: Update the file
      const updateResponse = await fetch(
        `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${GITHUB_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: "Added a new job entry",
            content: updatedContent,
            sha,
          }),
        }
      );
  
      if (!updateResponse.ok) {
        throw new Error("Failed to update the jobs file in GitHub.");
      }
  
      alert("Job added successfully!");
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };
  
  // Polyfill for Base64 encoding
  const base64Encode = (str) => {
    return btoa(unescape(encodeURIComponent(str)));
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

          <button type="submit" className="form-button">
            Submit
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
