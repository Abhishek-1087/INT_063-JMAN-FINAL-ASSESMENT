import React, { useEffect, useState } from "react";
// import AdminHome from "../Admin_Dashboard/admin_empcount";
import AdminHome from "../Admin_Dashboard/Dashboard";
import UserHome from "./userHome";

export default function UserDetails() {
  const [userData, setUserData] = useState(null);
  const [admin, setAdmin] = useState(false);

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
        }
        else{
          setAdmin(false)
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
  }, []);

  if (userData === null) {
    return <div>Loading...</div>;
  }

  // return admin ? <AdminHome /> : <UserHome userData={userData} />;

  return <AdminHome />
}
