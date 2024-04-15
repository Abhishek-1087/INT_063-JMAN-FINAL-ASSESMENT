
import React from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/login_component";
import SignUp from "./components/signup_component";
import ResetPassword from "./components/reset";
import UserDetails from "./components/userDetails";
import Profile from "./Admin_Dashboard/Profile";
import ImageUpload from "./components/imageUpload.";
import Dashboard from "./Admin_Dashboard/admin_empcount";
import Sidebar from "./Admin_Dashboard/Sidebar";
import CreateEventForm from "./Admin_Dashboard/make_event";
import Certificate from "./Admin_Dashboard/Certificate";
import Verify_Certificate from "./Admin_Dashboard/view_certificate";
import Event from "./User_DashBoard/Events";
import BigCalendarComponent from "./User_DashBoard/Calender";
// import Reference from "./User_DashBoard/Reference";
import EditEventForm from "./User_DashBoard/EditEventForm";
import Skills from "./User_DashBoard/skills";
import ViewData from "./Admin_Dashboard/ViewData";
import EventEdit from "./User_DashBoard/EventEdit";
import Project from "./User_DashBoard/Add_Project";
import Verify_Project from "./Admin_Dashboard/Verify_Project";
import RECOMMEND from "./Admin_Dashboard/recommandation";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            exact
            path="/"
            element={isLoggedIn === "true" ? <UserDetails /> : <Login />}
          />
          <Route path="/sign-in" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/userDetails" element={<UserDetails />} />
          <Route path="/Admin_Panel" element={<Dashboard />} />
          <Route path="/Sidebar" element={<Sidebar />} />
          <Route path="/reset" element={<ResetPassword />}/>
          <Route path="/profile" element={<Profile />} />
          <Route path="/events" element={<Event />} />
          <Route path="/make_events" element={<CreateEventForm />} />
          <Route path="/Create" element={<CreateEventForm />}/>
          <Route path="/Courses" element={<Event />} />
          <Route path="/Certificate" element={<Certificate />} />
          <Route path="/Verify_Certificate" element={<Verify_Certificate />} />
          <Route path="/View_Event" element={<BigCalendarComponent />} />
          {/* <Route path="/reference" element={<Reference />} /> */}
          <Route path="/add_skill" element={<Skills />} />
          <Route path="/Employee_data" element={<ViewData />} />
          <Route path="/editEvent/:eventId" element={<EventEdit />} />
          <Route path="/add_project" element={<Project />} />
          <Route path="/Verify_Project" element={<Verify_Project />} />
          <Route path="/recommandation" element={<RECOMMEND />} />

          {/* Redirect any other routes to the home page */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
