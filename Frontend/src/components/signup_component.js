import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JMAN_BG from "./JMAN_BG.mp4";
import Sidebar from '../Admin_Dashboard/Sidebar';
import './signup.css';

function SignUp() {
  const navigate = useNavigate();

  const [empId, setEmpId] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [dob, setdob] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const generatedPassword = generateRandomPassword();
    setPassword(generatedPassword);
  }, []);

  const generateRandomPassword = () => {
    const length = 8;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === "Admin" && secretKey !== fname + "2000") {
      alert("Invalid Admin");
    } else {
      console.log("Submitting form...");
      fetch("http://localhost:5000/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          empId,
          fname,
          email,
          lname,
          password,
          userType,
          dob,
          gender,
          phoneNo,
          address
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "ok") {
            alert("Registration Successful");
            console.log("Redirecting to login page...");
            navigate("/"); // Redirect to login page
          } else {
            alert("Something went wrong");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', height: '100vh' }}>
      <div style={{ marginRight: 'auto' }}>
        <Sidebar />
      </div>
      <div style={{ flex: '1', textAlign: 'center' }}>
        <video autoPlay muted loop id="bg-video">
          <source src={JMAN_BG} type="video/mp4" />
        </video>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <form onSubmit={handleSubmit}>
              <h3>Sign Up</h3>
              <div className="mb-3">
                <label>Employee ID</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Employee ID"
                  onChange={(e) => setEmpId(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%' }}>
                  <div className="mb-3">
                    <label>First name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="First name"
                      onChange={(e) => setFname(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div style={{ width: '48%' }}>
                  <div className="mb-3">
                    <label>Last name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name"
                      onChange={(e) => setLname(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <label style={{ marginRight: '10px' }}>Register As</label>
    <input
      type="radio"
      name="UserType"
      value="User"
      onChange={(e) => setUserType(e.target.value)}
      required
    />
    <label style={{ marginRight: '10px', marginLeft: '5px' }}>User</label>
    <input
      type="radio"
      name="UserType"
      value="Admin"
      onChange={(e) => setUserType(e.target.value)}
      required
    />
    <label style={{ marginLeft: '5px' }}>Admin</label>
  </div>
</div>
{userType === "Admin" && (
  <div className="mb-3">
    <label>Secret Key</label>
    <input
      type="text"
      className="form-control"
      placeholder="Secret Key"
      onChange={(e) => setSecretKey(e.target.value)}
      required
    />
  </div>
)}


              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%' }}>
                  <div className="mb-3">
                    <label>DOB</label>
                    <input
                      type="date"
                      className="form-control"
                      placeholder="Date of Birth"
                      onChange={(e) => setdob(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div style={{ width: '48%' }}>
                  <div className="mb-3">
                    <label>Gender</label>
                    <select
                      className="form-control"
                      onChange={(e) => setGender(e.target.value)}
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ width: '48%' }}>
                  <div className="mb-3">
                    <label>Phone Number</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Phone Number"
                      onChange={(e) => setPhoneNo(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div style={{ width: '48%' }}>
                  <div className="mb-3">
                    <label>Email address</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter email"
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label>Address</label>
                <textarea
                  className="form-control"
                  placeholder="Address"
                  onChange={(e) => setAddress(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary">
                  Sign Up
                </button>
              </div>
              <p className="forgot-password text-right">
                Already registered <a href="/sign-in">sign in?</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
