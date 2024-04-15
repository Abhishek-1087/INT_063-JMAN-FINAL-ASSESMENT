import React, { useState, useEffect } from "react";
import { faTrash, faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from './Sidebar';
import './admin_empcount.css';
import JMAN_BG from './JMAN_BG.mp4'

export default function AdminHome() {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 15; 

  useEffect(() => {
    getAllUser();
  }, [searchQuery]);

  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.data);
      });
  };

  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };

  function handleSearch(e) {
    setSearchQuery(e.target.value);
  }

  // Pagination handlers
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calculate indexes for slicing data array
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <>
    <video autoPlay muted loop id="bg-video">
    <source src={JMAN_BG} type="video/mp4" />
  </video>
    <div className="admin-home-container">
      <Sidebar />
      <div className="auth-wrapper">
        <div className="auth-inner">
          <h3>Employee Details</h3>
          <div className="search-container">
            {/* <FontAwesomeIcon icon={faSearch} className="search-icon" /> */}
            <input
              type="text"
              placeholder="Search..."
              onChange={handleSearch}
              className="search-input"
            />
            <span className="record-info">
              {searchQuery.length > 0
                ? `Records Found ${data.length}`
                : `Total Records ${data.length}`}
            </span>
          </div>
          <table className="user-table">
            <thead>
              <tr>
                <th>Emp_ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>User Type</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((i) => {
                return (
                  <tr key={i._id}>
                    <td>{i.empId}</td>
                    <td>{i.fname}</td>
                    <td>{i.email}</td>
                    <td>{i.userType}</td>
                    <td>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() => deleteUser(i._id, i.fname)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="pagination">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>Page {currentPage}</span>
            <button
              onClick={nextPage}
              disabled={
                currentPage === Math.ceil(data.length / usersPerPage)
              }
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
