import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import JMAN_BG from './JMAN_BG.mp4';
import './Certificate.css'; // Import the CSS file

function Certificate() {
  const [userCertificates, setUserCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [certificatesPerPage] = useState(8); // Adjust the number of certificates per page as needed
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCertificates() {
      try {
        const response = await axios.post(
          "http://localhost:5000/getCertificate"
        );
        setUserCertificates(response.data.certificates);
        setLoading(false);
      } catch (error) {
        console.error("Error retrieving user certificates:", error);
        setError(
          "Error retrieving user certificates. Please try again later."
        );
        setLoading(false);
      }
    }
    fetchCertificates();
  }, []);

  const handleUpdateStatus = async (empid, certificate, newStatus) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/updateCertificateStatus",
        { empid, certificate, newStatus }
      );
      if (response.status === 200) {
        alert("Certificate status updated successfully");
      } else {
        throw new Error("Network response was not ok");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an issue updating the certificate status");
    }
  };

  // Logic for pagination...

  // Filtering certificates based on search term
  const filteredCertificates = userCertificates.filter((certificate) =>
    certificate.certificateName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
  };

  return (
    <>
      <video autoPlay muted loop id="bg-video">
        <source src={JMAN_BG} type="video/mp4" />
      </video>
      <div style={{ display: "flex", height: "100vh" }}>
        <div style={{ marginRight: "auto" }}>
          <Sidebar />
        </div>
        <div style={{ flex: "1" }}>
          <div className="container mt-5">
            <h1 className="certificate-heading" style={{color:"white"}}> CERTIFICATE TAB </h1>
            <div className="search-container">
              <input
                type="text"
                placeholder="Search by certificate name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-button" onClick={handleClearSearch}>
                  ×
                </button>
              )}
            </div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="error-message">{error}</p>
            ) : filteredCertificates.length > 0 ? (
              <div className="certificate-box">
                <table className="table certificate-table">
                  <thead>
                    <tr>
                      <th>Empid</th>
                      <th>Certificate Name</th>
                      <th>Issuing Organization</th>
                      <th>Issue Date</th>
                      <th>Expire Date</th>
                      <th>Credential ID</th>
                      <th>Status</th>
                      <th>Action</th> {/* New column for status update */}
                    </tr>
                  </thead>
                  <tbody>
                    {/* Rendering current page certificates */}
                    {filteredCertificates.slice((currentPage - 1) * certificatesPerPage, currentPage * certificatesPerPage).map((certificate) => (
                      <tr key={certificate._id}>
                        <td>
                          {certificate.certificateName
                            ? certificate.Empid
                            : ""}
                        </td>
                        <td>
                          {certificate.certificateName
                            ? certificate.certificateName.toUpperCase()
                            : ""}
                        </td>
                        <td>
                          {certificate.issuingOrganization
                            ? certificate.issuingOrganization.toUpperCase()
                            : ""}
                        </td>
                        <td>
                          {certificate.issueDate}
                        </td>
                        <td>
                          {certificate.ExpireDate}
                        </td>
                        <td>
                          {certificate.credentialID
                            ? certificate.credentialID.toUpperCase()
                            : ""}
                        </td>
                        <td>{certificate.Status ? certificate.Status.toUpperCase() : ""}</td>
                        <td>
                          {/* Dropdown to select status */}
                          <select
                            value={certificate.Status}
                            onChange={(e) =>
                              handleUpdateStatus(certificate.Empid, certificate.certificateName, e.target.value)
                            }
                          >
                            <option value="Pending">Pending</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {/* Pagination */}
                <div className="pagination">
                  <button onClick={prevPage} disabled={currentPage === 1}>
                    Previous
                  </button>
                  <span>Page {currentPage}</span>
                  <button onClick={nextPage} disabled={(currentPage * certificatesPerPage) >= filteredCertificates.length}>
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p>No Certificates To Show</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Certificate;
