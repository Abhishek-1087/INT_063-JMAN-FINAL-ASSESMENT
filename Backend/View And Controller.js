const express = require("express");
const app = express();
const mongoose = require("mongoose");
app.use(express.json());
const cors = require("cors");
app.use(cors({ origin: 'http://localhost:3000' }));
const bcrypt = require("bcryptjs");
app.set("view engine", "ejs"); 
app.use(express.urlencoded({ extended: false }));

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");


const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";

const mongoUrl =
  "mongodb+srv://Abhishek_Kumar:abhi1234@cluster0.ssobpns.mongodb.net/JMAN?retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to database ! Champ");
  })
  .catch((e) => console.log(e));

require("./Models/userDetails");
require("./Models/eventDetails");
require("./Models/Certificate");
require("./Models/Projects");
require("./Models/skills")
require("./Models/userEvent")

const User = mongoose.model("UserInfo");
const Event = mongoose.model("Event");
const Certificate = mongoose.model("CertificateDetails");
const Project = mongoose.model("ProjectDetails");
const Skills = mongoose.model("SkillsDetails");
const UserEvent = mongoose.model("UserEvent");


app.post("/register", async (req, res) => {
  const { empId ,fname, lname, email, password, userType, dob, gender, phoneNo, address } = req.body;

  try {
    // Check if the user already exists
    const oldUser = await User.findOne({ email });
    if (oldUser) {
      return res.json({ error: "User Exists" });
    }

    // Hash the password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create the user
    await User.create({
      empId,
      fname,
      lname,
      email,
      password: encryptedPassword,
      userType,
      dob,
      gender,
      phoneNo,
      address
    });

    // Send email to user with their password
    await sendWelcomeEmail(email, fname, password);

    return res.json({ status: "ok" });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Function to send welcome email
async function sendWelcomeEmail(email, fname, password) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sak29193@gmail.com", 
        pass: "kuzr zgbh dswv ildc", 
      },
    });
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const resetLink = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    const emailMessage = `Click the link below to reset your password:\n${resetLink}`;

    const mailOptions = {
      from: "sak29193@gmail.com",
      to: email,
      subject: "Welcome to Our Website",
      text: `Hello ${fname},\n\nThank you for signing up! Your password is: ${password}\n\nPlease keep this password secure , and please change your password through this link ${emailMessage}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
}



app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const resetLink = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    const emailMessage = `Click the link below to reset your password:\n${resetLink}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sak29193@gmail.com",
        pass: "kuzr zgbh dswv ildc",
      },
    });

    var mailOptions = {
      from: "sak29193@gmail.com",
      to: email,
      subject: "Password Reset",
      text: emailMessage,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        return res.json({ status: "error", message: "Failed to send reset email" });
      } else {
        console.log("Email sent: " + info.response);
        return res.json({ status: "ok", message: "Reset email sent successfully" });
      }
    });
    console.log(resetLink);
  } catch (error) {
    console.error("Error sending reset email:", error);
    return res.json({ status: "error", message: "Failed to send reset email" });
  }
});



app.post("/login-user1", async (req, res) => {
  console.log("loginpage");
  const { email, password } = req.body;
 console.log("loginpage");
  const user = await User.findOne({ email });
 
  if (!user) {
    // alert("user not found");
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET, {
      expiresIn: "15m",
    });

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});



app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET, (err, res) => {
      if (err) {
        return "token expired";
      }
      return res;
    });
    console.log(user);
    if (user == "token expired") {
      return res.send({ status: "error", data: "token expired" });
    }

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(5000, () => {
  console.log("Server Started");
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  try {
    const oldUser = await User.findOne({ email });
    if (!oldUser) {
      return res.json({ status: "User Not Exists!!" });
    }
    const secret = JWT_SECRET + oldUser.password;
    const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
      expiresIn: "5m",
    });
    const link = `http://localhost:5000/reset-password/${oldUser._id}/${token}`;
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sak29193@gmail.com",
        pass: "kuzr zgbh dswv ildc",
      },
    });

    var mailOptions = {
      from: "sak29193@gmail.com",
      to: email,
      subject: "Password Reset",
      text: link,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
    console.log(link);
  } catch (error) {}
});

app.get("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  console.log(req.params);
  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    res.render("index", { email: verify.email, status: "Not Verified" });
  } catch (error) {
    console.log(error);
    res.send("Not Verified");
  }
});

app.post("/reset-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  const oldUser = await User.findOne({ _id: id });
  if (!oldUser) {
    return res.json({ status: "User Not Exists!!" });
  }
  const secret = JWT_SECRET + oldUser.password;
  try {
    const verify = jwt.verify(token, secret);
    const encryptedPassword = await bcrypt.hash(password, 10);
    await User.updateOne(
      {
        _id: id,
      },
      {
        $set: {
          password: encryptedPassword,
        },
      }
    );

    res.render("index", { email: verify.email, status: "verified" });
  } catch (error) {
    console.log(error);
    res.json({ status: "Something Went Wrong" });
  }
});

app.get("/getAllUser", async (req, res) => {
  let query = {};
  const searchData = req.query.search;
  if (searchData) {
    query = {
      $or: [
        { fname: { $regex: searchData, $options: "i" } },
        { email: { $regex: searchData, $options: "i" } },
      ],
    };
  }

  try {
    const allUser = await User.find(query);
    res.send({ status: "ok", data: allUser });
  } catch (error) {
    console.log(error);
  }
});

app.post("/deleteUser", async (req, res) => {
  const { userid } = req.body;
  try {
    User.deleteOne({ _id: userid }, function (err, res) {
      console.log(err);
    });
    res.send({ status: "Ok", data: "Deleted" });
  } catch (error) {
    console.log(error);
  }
});

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ Status: "ok" });
  } catch (error) {
    res.send({ Status: "error", data: error });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    await Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {}
});

app.get("/paginatedUsers", async (req, res) => {
  const allUser = await User.find({});
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const lastIndex = page * limit;

  const results = {};
  results.totalUser = allUser.length;
  results.pageCount = Math.ceil(allUser.length / limit);

  if (lastIndex < allUser.length) {
    results.next = {
      page: page + 1,
    };
  }
  if (startIndex > 0) {
    results.prev = {
      page: page - 1,
    };
  }
  results.result = allUser.slice(startIndex, lastIndex);
  res.json(results);
});




app.post("/getUserData", async (req, res) => {
  const { email } = req.body; // Assuming you're passing email directly instead of token
  try {
    // Find user by email directly, assuming you have a User model
    User.findOne({ email: email })
      .then((data) => {
        if (data) {
          res.send({ status: "ok", data: data });
        } else {
          res.send({ status: "error", data: "User not found" });
        }
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {
    res.send({ status: "error", data: error.message });
  }
});


app.post("/updateUserDetails", async (req, res) => {
  const { token, newData } = req.body;
  try {
    // Verify the JWT token
    const decodedToken = jwt.verify(token, JWT_SECRET);
    
    // Extract email from the decoded token
    const userEmail = decodedToken.email;
    
    // Find the user in the database and update their details
    await User.findOneAndUpdate({ email: userEmail }, newData);

    // Send a success response
    res.json({ status: "ok", message: "User details updated successfully" });
  } catch (error) {
    // Handle errors
    console.error("Error updating user details:", error);
    res.status(500).json({ status: "error", message: "Failed to update user details" });
  }
});

app.post('/CreateEventForm', async (req, res) => {
  try {
    // Create new event object using data from request body
    console.log("new event to be saved",req.body)
    const newEvent = new Event(req.body);
    console.log(newEvent);
    // Save the event to the database
    await newEvent.save();

    res.status(201).send('Event created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating event');
  }
});



app.get('/events', async (req, res) => {
  try {
    const { email } = req.query;

    // Fetch all events
    const events = await Event.find();

    // Fetch events registered by the user with the given email
    const registeredEvents = await UserEvent.find({ userEmail: email });

    // Filter out events that the user has not registered for
    const filteredEvents = events.filter(event => {
      // Check if the event is registered by the user
      return !registeredEvents.some(regEvent => regEvent.eventName === event.name);
    });

    console.log("registeredEvents", registeredEvents);

    res.json(filteredEvents);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching events');
  }
});

app.post('/addCertificate', async (req, res) => {
  const {
    Empid,
    Email,
    certificateName,
    issuingOrganization,
    issueDate,
    ExpireDate,
    credentialID,
    Status,
  } = req.body;
  
  try {
    const user = await User.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
 
    const certificateExist = await Certificate.findOne({
      certificateName: certificateName,
      Empid: user.Empid,
    });
    if (certificateExist && Empid) {
      console.log("Certificate already exists");
      return res.status(408).json({ error: "Certificate already exists" });
    }
 
    const newCertificate = new Certificate({
      Empid: Empid,
      certificateName: certificateName,
      issuingOrganization: issuingOrganization,
      issueDate: issueDate,
      ExpireDate: ExpireDate,
      credentialID: credentialID,
      Status: Status,
    });

    await newCertificate.save();

    // Nodemailer configuration
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "sak29193@gmail.com",
        pass: "kuzr zgbh dswv ildc",
      },
    });

    // Email options
    const mailOptions = {
      from: "sak29193@gmail.com",
      to: "recipient@example.com", // Replace with the recipient's email address
      subject: "Welcome to our platform",
      text: `${Empid} has added new certificate '${certificateName}'. Could you kindly verify it?\nThank you.`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("Certificate added successfully and email sent");
    return res.status(200).json({ message: "Certificate added successfully" });
  } catch (error) {
    console.error("Error adding certificate:", error);
    return res.status(500).json({ error: "Server error" });
  }
});
 
app.post('/getCertificate', async (req, res) =>{
  // const { Email } = req.body
  try {
    // const user = await UserDetails.findOne({ Email: Email });
    // if (!user) {
    //   return res.status(400).json({ error: "User does not exist" });
    // }
    // if (user.Role === "Admin") {
    //   const certificates = await Certificate.find();
    //   const Name=user.FirstName+" "+user.LastName
    //   return res.status(200).json({ certificates ,Name,});
    // }
    const certificates = await Certificate.find();
    return res.status(200).json({ certificates }); 
  } catch (error) {
    console.error("Error getting user certificates:", error);
    return res.status(500).json({ error: "Server error" });
  }
});




app.post('/updateCertificateStatus', async (req, res) => {
  const { empid, certificate, newStatus, CertificateId } = req.body;
  console.log(empid, " ", certificate, " ", newStatus , " " ,CertificateId);
  try {
    const certificateData = await Certificate.findOne({ Empid: empid, certificateName: certificate});

    if (!certificateData ) {
      return res.status(404).json({ error: "Certificate not found" });
    }

    console.log(certificateData);

    certificateData.Status = newStatus;
    await certificateData.save();

    return res.status(200).json({ message: "Certificate status updated successfully" });
  } catch (error) {
    console.error("Error updating certificate status:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


app.put('/events/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updatedEventData = req.body; // Data to update

    // Find the event by ID and update it with new data
    await Event.findByIdAndUpdate(id, updatedEventData);

    res.status(200).send('Event updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating event');
  }
});


// Delete Event
app.delete('/events/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      return res.status(404).json({ error: "Event not found" });
    }
    return res.status(200).json({ message: "Event deleted successfully" });
  } catch (error) {
    console.error("Error deleting event:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


app.post('/great', (req, res) => {
  const { email } = req.body;
  console.log('Received registration request for email:', email);
  // Process the registration (e.g., save to database, send confirmation email, etc.)
  // Respond with success or error message
  res.status(200).send('User registered successfully');
});

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'sak29193@gmail.com',
    pass: 'kuzr zgbh dswv ildc'
  }
});

// API endpoint for registering a user for an event
app.post('/events/register/:eventId', async (req, res) => {
  const { email } = req.body;
  const eventId = req.params.eventId;

  try {
    // Fetch event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }

    // Save user event details to the database
    const userEvent = new UserEvent({
      userEmail: email,
      eventName: event.name
    });
    await userEvent.save();

    // Send email to the user
    const mailOptions = {
      from: 'sak29193@gmail.com',
      to: email,
      subject: 'Event Registration Confirmation',
      text: `You have been registered for the event "${event.name}". Thank you!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Error sending email');
      } else {
        console.log('Email sent:', info.response);
        res.status(200).send('User registered successfully');
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Error registering user');
  }
});

app.post('/events/register/:eventId', async (req, res) => {
  const { email } = req.body;
  const eventId = req.params.eventId;

  try {
    // Check if the user is already registered for the event
    const existingRegistration = await UserEvent.findOne({ eventId, email });
    if (existingRegistration) {
      return res.status(400).send('User already registered for this event');
    }

    // Fetch event details
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).send('Event not found');
    }

    // Check if the event is full
    if (event.total_capacity <= 0) {
      return res.status(400).send('Event is full');
    }

    // Register the user for the event
    await UserEvent.create({ eventId, email });

    // Decrement total capacity
    await Event.findByIdAndUpdate(eventId, { $inc: { total_capacity: -1 } });

    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error('Error registering user for event:', error);
    res.status(500).send('Internal server error');
  }
});

// API endpoint to fetch registered events for a user
app.post('/user/registeredEvents', async (req, res) => {
  try {
    const { email } = req.body;

    // Find all userEvent documents with the given email and return the list of event IDs
    const userEvents = await UserEvent.find({ email });
    const registeredEvents = userEvents.map(event => event.eventId);

    res.status(200).json({ registeredEvents });
  } catch (error) {
    console.error('Error fetching registered events:', error);
    res.status(500).send('Internal server error');
  }
});

app.post('/Skills', async (req, res) => {
  const { employeeID, skills, rating } = req.body.data;
  try {
    console.log({ employeeID, skills, rating });

    const newSkills = new Skills({
      userId: employeeID,
      skills: skills,
      rating: rating
    });

    await newSkills.save();
    return res.status(200).send('Skills Added');
  } catch (error) {
    console.error('Error in sending Skills', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.post('/viewData', async (req, res) => {
  try {
      const { data } = req.body;
      console.log(data);
      const foundSkills = await Skills.find({ userId: data }).exec();

      if (foundSkills && foundSkills.length > 0) {
          const userData = await User.findOne({ empId: data }).exec();

          if(userData){
              console.log("User Name:", userData.dob);
          }

          const SkillsArray = [];
          const RatingArray = [];
          foundSkills.forEach(data => {
              console.log("Found skillsData:", data);
              SkillsArray.push(data.skills);
              RatingArray.push(data.rating);
          });

          res.status(200).json({
              skills: SkillsArray,
              rating: RatingArray,
              firstName: userData.fname,
              lastName: userData.lname,
              age: userData.dob,
              email: userData.email
          });
      } else {
          console.log(userData);
          res.status(404).send('No matching skillsData found');
      }
  } catch (error) {
      console.error('Error in retrieving and sending skills data:', error);
      res.status(500).send('Internal Server Error');
  }
});




app.post('/addProject', async (req, res) =>{
  // console.log("Check")
  const {
    Empid,
    Email,
    projectName,
    majorSkill,
    Status,
  } = req.body;
  try {
    const user = await User.findOne({ Email: Email });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }
 
    const projectExist = await Project.findOne({
      projectName: projectName,
      // Empid: user.Empid,
    });
    if (projectExist) {
      console.log("Project already exists");
      return res.status(408).json({ error: "Project already exists" });
    }
 
    const newProject = new Project({
      Empid: Empid,
      projectName: projectName,
      majorSkill:majorSkill,
      Status: Status,
    });
 
    await newProject.save();
    const mailOptions = {
      from: "sak29193@gmail.com",
      to: "sak29193@gmail.com",
      subject: "Welcome to our platform",
      text: `${User.fname} has added new project  '${projectName}'. Could you kindly verify it?
        Thank you. `,
    };
 
    console.log("add project");
    return res.status(200).json({ message: "Project added successfully" });
  } catch (error) {
    console.error("Error adding project:", error);
    return res.status(500).json({ error: "Server error" });
  }
})



 
app.post('/getProject', async (req, res) =>{
  try {
    const projects = await Project.find();
    return res.status(200).json({projects }); 
  } catch (error) {
    console.error("Error getting user projects:", error);
    return res.status(500).json({ error: "Server error" });
  }
});


app.post('/updateProjectStatus', async (req, res) => {
  const { projectId, newStatus } = req.body;
  try {
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    project.Status = newStatus;
    await project.save();
    return res.status(200).json({ message: "Project status updated successfully" });
  } catch (error) {
    console.error("Error updating project status:", error);
    return res.status(500).json({ error: "Server error" });
  }
});