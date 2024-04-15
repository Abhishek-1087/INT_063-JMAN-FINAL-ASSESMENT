import JMAN_BG from './JMAN_BG.mp4'
import Sidebar from './Sidebar';
import { useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardSubTitle,
  MDBCardText,
  MDBCardLink
} from 'mdb-react-ui-kit';


function ViewData() {
  const [data, setData] = useState('');
  const handleEvent = (e) => {
    setData(e.target.value);
    console.log("Data", data);
  };

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    Age: "",
    Email: "",
    Skills: "",
    Rating: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:5000/viewData', {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data })
    });
    if (response.status === 200) {
      const responseData = await response.json();
      console.log("Skills:", responseData.Skills);
      setUser({
        firstName: responseData.firstName,
        lastName: responseData.lastName,
        Age: responseData.age,
        Email: responseData.email,
        Skills: responseData.skills,
        Rating: responseData.rating
      });
      console.log("User:", user);
    }
  };

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
      return '';
    }
  
    const parts = dateOfBirth.split('-');
    if (parts.length !== 3) {
      return 'Invalid date format';
    }
  
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
  
    const today = new Date();
    const birthDate = new Date(year, month, day);
  
    if (isNaN(birthDate.getTime())) {
      return 'Invalid date';
    }
  
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };
  
  return (
    <>
    <video autoPlay muted loop id="bg-video">
    <source src={JMAN_BG} type="video/mp4" />
  </video>
    <div className="d-flex h-100">
    <div className="me-auto">
      <Sidebar />
    </div>
    <div className="flex-grow-1">

          {/* <div className="homepage"> */}
            {/* <div className="container-fluid text-center "> */}
              {/* <div className="row "> */}
                <div className="col-md-6 mx-auto mt-4">
                  <div className="searchBar mx-auto">
                    <h1 style={{color:"white"}}>View Skills</h1>
                    <input className="form-control me-2 mt-4" type="search" value={data} placeholder="Search Employee ID" aria-label="Search" onChange={(e) => handleEvent(e)}></input>
                    <button className="btn btn-success mt-3" type="submit" onClick={handleSubmit}>Search</button>
                  </div>
                  <div className="col-md-6 mx-auto mt-4">
                    <MDBCard className="shadow">
                      <MDBCardBody>
                        <MDBCardTitle>{user.firstName} {user.lastName}</MDBCardTitle>
                        <MDBCardSubTitle><strong>Age: {calculateAge(user.Age)} years</strong> </MDBCardSubTitle>
                        <MDBCardText>
                          <strong>Email:</strong> {user.Email}
                          <br />
                          <strong>Skills:</strong> <br />
                          {Array.isArray(user.Skills) && user.Skills.map((skill, index) => (
                            <div key={index}>
                              <span>{skill}: </span>
                              <div className="progressContainer" key={index}>
                                <div className="progress" role="progressbar" aria-label={`${skill} Progress`} aria-valuenow={user.Rating[index] * 20} aria-valuemin="0" aria-valuemax="100">
                                  <div className="progress-bar progress-bar-striped bg-success" style={{ width: `${user.Rating[index] * 20}%` }}></div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </MDBCardText>
                      </MDBCardBody>
                    </MDBCard>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}
        {/*  </div> */}
     {/* </div> */}
    </>
  );
}

export default ViewData;
