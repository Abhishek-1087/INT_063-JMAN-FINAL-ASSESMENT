
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Sidebar from '../Admin_Dashboard/Sidebar';
import JMAN_BG from './JMAN_BG.mp4'

export default function Skills() {
    const [data, setData] = useState({
        employeeID: "",
        skills: "",
        rating: 0
    });

    const handleEvent = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        console.log(data);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!data.employeeID || !data.skills || !data.rating) {
            alert('Please enter all values.');
            return;
        }
        const response = await fetch('http://localhost:5000/Skills', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data })
        });
        console.log(response);
        if (response.status === 500) {
            alert('Skills not saved');
        }
        if (response.status === 204) { 
            alert(`Employee ID: ${data.employeeID}, Skills: ${data.skills}, Rating: ${data.rating}`);
            window.location.reload(); // Refresh the page
        }
    };

    return (
        <>
        <video autoPlay muted loop id="bg-video">
        <source src={JMAN_BG} type="video/mp4" />
      </video>
        <div style={{ display: 'flex', height: '100vh' }}>
            <div style={{ marginRight: 'auto' }}>
                <Sidebar />
            </div>
            <div style={{ flex: '1' }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <Box sx={{ width: '400px', p: 4, bgcolor: 'white' }}>
                        <div>
                            <div>
                                <h1>SKILLS</h1>
                            <input type='text' label="EmployeeId" name="employeeID" variant="filled" placeholder='employeeid' onChange={handleEvent} fullWidth fullheight sx={{ height: '60px' }} />
                           
                                <FormControl fullWidth sx={{ mt: 2 }}>
                               
                                    <InputLabel id="demo-simple-select-label">Skills</InputLabel>
                                    
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="skills"
                                        onChange={handleEvent}
                                        fullWidth
                                    >
                                        <MenuItem value="HTML">HTML</MenuItem>
                                        <MenuItem value="CSS">CSS</MenuItem>
                                        <MenuItem value="JavaScript">JavaScript</MenuItem>
                                        <MenuItem value="React">React</MenuItem>
                                        <MenuItem value="Angular">Angular</MenuItem>
                                        <MenuItem value="Vue.js">Vue.js</MenuItem>
                                        <MenuItem value="Node.js">Node.js</MenuItem>
                                        <MenuItem value="Express.js">Express.js</MenuItem>
                                        <MenuItem value="MongoDB">MongoDB</MenuItem>
                                        <MenuItem value="MySQL">MySQL</MenuItem>
                                        <MenuItem value="PostgreSQL">PostgreSQL</MenuItem>
                                        <MenuItem value="Git">Git</MenuItem>
                                        <MenuItem value="Docker">Docker</MenuItem>
                                        <MenuItem value="Kubernetes">Kubernetes</MenuItem>
                                        <MenuItem value="AWS">AWS</MenuItem>
                                        <MenuItem value="Azure">Azure</MenuItem>
                                        <MenuItem value="Google Cloud Platform">Google Cloud Platform</MenuItem>
                                        <MenuItem value="RESTful API">RESTful API</MenuItem>
                                        <MenuItem value="GraphQL">GraphQL</MenuItem>
                                        <MenuItem value="CI/CD">CI/CD</MenuItem>
                                        <MenuItem value="Agile Methodologies">Agile Methodologies</MenuItem>
                                        <MenuItem value="Scrum">Scrum</MenuItem>
                                        <MenuItem value="Test-Driven Development">Test-Driven Development</MenuItem>
                                        <MenuItem value="Behavior-Driven Development">Behavior-Driven Development</MenuItem>
                                        <MenuItem value="DevOps">DevOps</MenuItem>
                                        <MenuItem value="Continuous Integration">Continuous Integration</MenuItem>
                                        <MenuItem value="Continuous Deployment">Continuous Deployment</MenuItem>
                                        <MenuItem value="Microservices">Microservices</MenuItem>
                                        <MenuItem value="Containerization">Containerization</MenuItem>
                                        <MenuItem value="Machine Learning">Machine Learning</MenuItem>
                                        <MenuItem value="Artificial Intelligence">Artificial Intelligence</MenuItem>
                                        <MenuItem value="Data Science">Data Science</MenuItem>
                                        <MenuItem value="Data Analysis">Data Analysis</MenuItem>
                                        <MenuItem value="Data Visualization">Data Visualization</MenuItem>
                                        <MenuItem value="Statistical Analysis">Statistical Analysis</MenuItem>
                                        <MenuItem value="Cybersecurity">Cybersecurity</MenuItem>
                                        <MenuItem value="Network Security">Network Security</MenuItem>
                                        <MenuItem value="Penetration Testing">Penetration Testing</MenuItem>
                                        <MenuItem value="Cryptography">Cryptography</MenuItem>
                                        <MenuItem value="Information Security">Information Security</MenuItem>
                                        <MenuItem value="UI/UX Design">UI/UX Design</MenuItem>
                                        <MenuItem value="Wireframing">Wireframing</MenuItem>
                                        <MenuItem value="Prototyping">Prototyping</MenuItem>
                                        <MenuItem value="User Research">User Research</MenuItem>
                                        <MenuItem value="Interaction Design">Interaction Design</MenuItem>
                                        <MenuItem value="Responsive Design">Responsive Design</MenuItem>
                                        <MenuItem value="Accessibility">Accessibility</MenuItem>
                                        <MenuItem value="Product Management">Product Management</MenuItem>
                                        <MenuItem value="Agile Product Management">Agile Product Management</MenuItem>
                                        <MenuItem value="Requirements Analysis">Requirements Analysis</MenuItem>
                                        <MenuItem value="User Stories">User Stories</MenuItem>
                                        <MenuItem value="Business Analysis">Business Analysis</MenuItem>
                                        <MenuItem value="Technical Writing">Technical Writing</MenuItem>
                                        <MenuItem value="Documentation">Documentation</MenuItem>
                                        <MenuItem value="Support">Support</MenuItem>
                                        <MenuItem value="Troubleshooting">Troubleshooting</MenuItem>
                                        <MenuItem value="Problem Solving">Problem Solving</MenuItem>
                                        <MenuItem value="Communication">Communication</MenuItem>
                                        <MenuItem value="Collaboration">Collaboration</MenuItem>
                                        <MenuItem value="Leadership">Leadership</MenuItem>
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth sx={{ mt: 2 }}>
                                    <InputLabel id="demo-simple-select-label">Rating</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        name="rating"
                                        onChange={handleEvent}
                                        fullWidth
                                    >
                                        <MenuItem value={1}>1</MenuItem>
                                        <MenuItem value={2}>2</MenuItem>
                                        <MenuItem value={3}>3</MenuItem>
                                        <MenuItem value={4}>4</MenuItem>
                                        <MenuItem value={5}>5</MenuItem>
                                    </Select>
                                </FormControl>
                                <Box sx={{ mt: 2 }}>
                                    <Button variant="outlined" onClick={handleSubmit} fullWidth>Submit</Button>
                                </Box>
                            </div>
                        </div>
                    </Box>
                </Box>
            </div>
        </div>
        </>
    );
}
