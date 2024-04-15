import React, { useEffect, useState } from "react";
import Sidebar from './Sidebar';
import JMAN_BG from './JMAN_BG.mp4'
import './Dashboard.css'

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const [admin, setAdmin] = useState(false);
  const [role, setRole] = useState('');

  useEffect(() => {
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
        setRole(data.data.userType);

        if (data && data.data && data.data.userType === "token expired") {
          alert("Token expired, please log in again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  return (

    role === "Admin" ? (
      <div style={{ display: 'flex', height: '100vh', margin: '0', padding: '0' }}>
        <div style={{ flex: '0 0 auto' }}>
          <Sidebar />
        </div>
        <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <iframe title="powerbi" width="100%" height="100%" src="https://app.powerbi.com/reportEmbed?reportId=763b0c44-088b-4418-a935-e1c7d22b9d0f&autoAuth=true&ctid=2800c0a0-70e9-49be-8733-faeaa6aced99" frameBorder="0" allowFullScreen="true"></iframe>
        </div>
      </div>
    ) : (
      <>
      <video autoPlay muted loop id="bg-video">
      <source src={JMAN_BG} type="video/mp4" />
    </video>
      <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
        <div style={{ marginRight: 'auto' }}>
          <Sidebar />
        </div>
        <div style={{ flex: '1', textAlign: 'center' }}>
         <h1 style={{ fontSize: '48px' }}>Welcome to JMAN Learn</h1> 
        </div>
      </div>
      </>
    )
  );
};

export default Dashboard;

