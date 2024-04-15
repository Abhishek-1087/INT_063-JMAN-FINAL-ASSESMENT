import React, { useEffect, useState } from "react";
import { faTrash,faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JMAN_BG from './JMAN_BG.mp4'

export default function AdminHome({}) {
  //setting state
  const [data, setData] = useState([]);
  const [searchQuery,setSearchQuery]=useState("")
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




  useEffect(() => {
    getAllUser();
  },[searchQuery]);

  //fetching all user
  const getAllUser = () => {
    fetch(`http://localhost:5000/getAllUser?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  //logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  //deleting user
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
  function handleSearch(e){
    setSearchQuery(e.target.value)

  }

  return (
    <>
    <video autoPlay muted loop id="bg-video">
    <source src={JMAN_BG} type="video/mp4" />
  </video>
    <div className="auth-wrapper" style={{ height: "auto", marginTop: 50 }}>
      <div className="auth-inner" style={{ width: "fit-content" }}>
        <h3>Welcome Admin</h3>
        <div style={{ position: "relative", marginBottom: 10 }}>
          <FontAwesomeIcon
            icon={faSearch}
            style={{ position: "absolute", left: 10, top: 13, color: "black" }}
          />
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            style={{
              padding: "8px 32px 8px 32px",
              borderRadius: "4px",
              border: "1px solid #ccc",
              width: "100%",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{ position: "absolute", right: 10, top: 8, color: "#aaa" }}
          >
           {searchQuery.length>0?`Records Found ${data.length}`:`Total Records ${data.length}`} 
          </span>
        </div>
        <table style={{ width: 700 }}>
          <tr style={{ textAlign: "center" }}>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Delete</th>
          </tr>
          {data.map((i) => {
            return (
              <tr style={{ textAlign: "center" }}>
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
        </table>

        <button
          onClick={logOut}
          className="btn btn-primary"
          style={{ marginTop: 10 }}
        >
          Log Out
        </button>
      </div>
    </div>
    </>
  );
}
