import JMAN_BG from './JMAN_BG.mp4'
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import './Certificate.css';

function Certificate() {
  const [certificateDetails, setCertificateDetails] = useState({
    Email: "",
    certificateName: "",
    issuingOrganization: "",
    issueDate: "",
    ExpireDate: "",
    credentialID: "",
    Status: "Pending",
  });

  const handleChange = (e, fieldName) => {
    const value = e.target.value;
    setCertificateDetails((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!certificateDetails.certificateName) {
      alert("Please fill in certificate Name");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/addCertificate",
        certificateDetails
      );

      if (response.status === 200) {
        alert("Certificate added successfully");
        // Resetting certificate details after successful addition
        setCertificateDetails({
          ...certificateDetails,
          Empid:"",
          certificateName: "",
          issuingOrganization: "",
          issueDate: "",
          ExpireDate: "",
          credentialID: "",
        });
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert(
        "Certificate already exists or there was an issue adding the certificate"
      );
    }
  };

  return (
    <>
    <video autoPlay muted loop id="bg-video">
    <source src={JMAN_BG} type="video/mp4" />
  </video>
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ marginRight: 'auto' }}>
        <Sidebar />
      </div>
      <div style={{ flex: '1' }}>
        <div className="container mt-4 p-4">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <form className="custom-form mt-4" onSubmit={handleSubmit}>
                <h2 className="mb-4" style={{ fontFamily: "monospace", fontWeight: "bold" }}>
                  Add Certificate
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
                          value={certificateDetails.Empid}
                          onChange={(e) => handleChange(e, "Empid")}
                          placeholder="Employee id ..."
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Certificate Name:</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="certificateName"
                          value={certificateDetails.certificateName}
                          onChange={(e) => handleChange(e, "certificateName")}
                          placeholder="Enter certificate name"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Issuing Organization:</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="issuingOrganization"
                          value={certificateDetails.issuingOrganization}
                          onChange={(e) => handleChange(e, "issuingOrganization")}
                          placeholder="Enter issuing organization"
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Issue Date:</td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          id="issueDate"
                          value={certificateDetails.issueDate}
                          onChange={(e) => handleChange(e, "issueDate")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Expire Date:</td>
                      <td>
                        <input
                          type="date"
                          className="form-control"
                          id="ExpireDate"
                          value={certificateDetails.ExpireDate}
                          onChange={(e) => handleChange(e, "ExpireDate")}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td style={{ fontWeight: "bold" }}>Credential ID:</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          id="credentialID"
                          value={certificateDetails.credentialID}
                          onChange={(e) => handleChange(e, "credentialID")}
                          placeholder="Enter credential ID"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
                <button type="submit" className="btn btn-primary btn-block mt-4">
                  Add Certificate
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

export default Certificate;
