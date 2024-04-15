import React, { useEffect, useState } from "react";
import Sidebar from './Sidebar';
import './profile.css';
import JMAN_BG from './JMAN_BG.mp4'

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [admin, setAdmin] = useState(false);

  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    email: "",
    dob: "",
    gender: "",
    phoneNo: "",
    address: ""
  });

  const fetchUserData = () => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch user data");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "userData");
        if (data && data.data && data.data.userType === "Admin") {
          setAdmin(true);
        } else {
          setAdmin(false);
        }

        setUserData(data.data);

        if (data && data.data && data.data === "token expired") {
          alert("Token expired, please log in again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
    <video autoPlay muted loop id="bg-video">
    <source src={JMAN_BG} type="video/mp4" />
  </video>
    <div className="profile-container">
      <Sidebar />
      <div className="profile-details">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <div className="profile-info">
              <h1 style={{ textAlign: "center" }}>PROFILE</h1>
              <div className="profile-info-item">
                <h2>Name:</h2>
                <div>{userData.fname + " " + userData.lname}</div>
              </div>
              <div className="profile-info-item">
                <h2>Email:</h2>
                <div>{userData.email}</div>
              </div>
              <div className="profile-info-item">
                <h2>Date of Birth:</h2>
                <div>{userData.dob}</div>
              </div>
              <div className="profile-info-item">
                <h2>Gender:</h2>
                <div>{userData.gender}</div>
              </div>
              <div className="profile-info-item">
                <h2>Phone Number:</h2>
                <div>{userData.phoneNo}</div>
              </div>
              <div className="profile-info-item">
                <h2>Address:</h2>
                <div>{userData.address}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
