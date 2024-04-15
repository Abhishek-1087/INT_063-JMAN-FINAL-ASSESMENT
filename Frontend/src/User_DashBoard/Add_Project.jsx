import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../Admin_Dashboard/Sidebar";
import JMAN_BG from './JMAN_BG.mp4'
import './add_project.css';

function Project() {
  const [projectDetails, setprojectDetails] = useState({
    Email: "",
    projectName: "",
    majorSkill: "",
    Status: "Pending",
  });

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setprojectDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!projectDetails.projectName) {
      alert("Please fill in Project Name");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/addProject",
        projectDetails
      );

      if (response.status === 200) {
        alert("Project added successfully");
        setprojectDetails({
          ...projectDetails,
          Empid:"",
          projectName: "",
          majorSkill: "",
        });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "There was an issue adding the Project Details"
      );
    }
  };

  return (
    <>
    <video autoPlay muted loop id="bg-video">
    <source src={JMAN_BG} type="video/mp4" />
  </video>
    <div style={{ display: 'flex',  height: '100vh' }}>
    <div style={{ marginRight: 'auto' }}>
      <Sidebar />
    </div>
    <div style={{ flex: '1'}}>
    <div className="container mt-4 p-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form className="custom-form mt-4" onSubmit={handleSubmit}>
            <h2
              className="mb-4"
              style={{ fontFamily: "monospace", fontWeight: "bold" }}
            >
              Add Project
            </h2>
            <table className="table table-borderless">
              <tbody>
              <tr>
                  <td style={{ fontWeight: "bold" }}>EmpId:</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="Empid"
                      value={projectDetails.Empid}
                      onChange={(e) => handleChange(e, "Empid")}
                      placeholder="Employee id ..."
                    />
                  </td>
                </tr>



                <tr>
                  <td style={{ fontWeight: "bold" }}>Project Name:</td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="projectName"
                      value={projectDetails.projectName}
                      onChange={(e) => handleChange(e, "projectName")}
                      placeholder="Enter project name"
                    />
                  </td>
                </tr>
                <tr>
                  <td style={{ fontWeight: "bold" }}>
                    Major Skills:
                  </td>
                  <td>
                    <input
                      type="text"
                      className="form-control"
                      id="issuingOrganization"
                      value={projectDetails.majorSkill}
                      onChange={(e) =>
                        handleChange(e, "majorSkill")
                      }
                      placeholder="Enter your skills "
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <button
              type="submit"
              className="btn btn-primary btn-block mt-4"
            >
              Add Project
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default Project;


