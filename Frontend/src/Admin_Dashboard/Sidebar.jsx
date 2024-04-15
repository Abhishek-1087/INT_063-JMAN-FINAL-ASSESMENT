import React, { useEffect, useState } from "react";


import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
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

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#333">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
            Welcome {userData.fname}
          </a>
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink exact to="/profile" activeClassName="activeClicked">
              <CDBSidebarMenuItem icon="user">Profile</CDBSidebarMenuItem>
            </NavLink>

            {role === "Admin" ? (
              <a href="/Admin_Panel">
                <CDBSidebarMenuItem icon="users">Employee Details</CDBSidebarMenuItem>
              </a>
            ) : (
              <div>
              </div>
            )}

            {role === "Admin" ? (
              <a href="/sign-up">
                <CDBSidebarMenuItem icon="user-plus">Create User</CDBSidebarMenuItem>
              </a>
            ) : (
              <div>
              </div>
            )}
            {role === "Admin" ? (
              <a href="/Create">
                <CDBSidebarMenuItem icon="calendar-plus">Create Event</CDBSidebarMenuItem>
              </a>
            ) : (
              <div>
              </div>
            )}

            <a href="/Courses">
              <CDBSidebarMenuItem icon="certificate">View Events</CDBSidebarMenuItem>
            </a>

            {role === "Admin" ? (
              <a href="/View_Event">
                <CDBSidebarMenuItem icon="book">View Calender</CDBSidebarMenuItem>
              </a>
               ) : (
                <div>
                </div>
              )}
              {role === "User" ? (
            <a href="/add_skill"> 
              <CDBSidebarMenuItem icon="tools">Add Skills</CDBSidebarMenuItem>
            </a>
            ) : (
              <div>
              </div>
            )}

            {role === "Admin" ? (
              <a href="/Employee_data">
                <CDBSidebarMenuItem icon="calendar-plus">View Skills</CDBSidebarMenuItem>
              </a>
            ) : (
              <div>
              </div>
            )}
             <a href="/add_project"> 
              <CDBSidebarMenuItem icon="tools">Add Project</CDBSidebarMenuItem>
            </a>

            {role === "Admin" ? (
              <a href="/Verify_Project">
                <CDBSidebarMenuItem icon="calendar-plus">Verify Project</CDBSidebarMenuItem>
              </a>
            ) : (
              <div>
              </div>
            )}
             {role === "User" ? (
            <a href="/Certificate">
              <CDBSidebarMenuItem icon="plus">Add Certificate</CDBSidebarMenuItem>
            </a>) : (
              <div>
              </div>
            )}

            {role === "Admin" ? (
              <a href="/Verify_Certificate">
                <CDBSidebarMenuItem icon="check">Verify Certificate</CDBSidebarMenuItem>
              </a>
            ) : (
              <div>
              </div>
            )}
            <a href="/recommandation"> 
              <CDBSidebarMenuItem icon="tools">recommandation</CDBSidebarMenuItem>
            </a>

            
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div style={{ padding: '20px 5px', position: 'absolute', width: '100%', bottom: '30px' }}>
            <NavLink to="/sign-in" className="text-decoration-none" style={{ color: 'inherit' }}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </NavLink>
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    </div>
  );
};

export default Sidebar;
