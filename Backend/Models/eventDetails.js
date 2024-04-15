// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   startDate: {
//     type: Date,
//     required: true
//   },
//   endDate: {
//     type: Date,
//     required: true
//   },
//   teacher: {
//     type: String,
//     required: true
//   },
//   totalSeats: {
//     type: Number,
//     required: true
//   },
//   seatsLeft: {
//     type: Number,
//     required: true
//   }
// });

// const Event = mongoose.model('Event', eventSchema);

// module.exports = Event;

// models/Event.js

const mongoose = require('mongoose');

// Define the schema for the event document
const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  total_capacity: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  Trainee_Name: { type: String, required: true },
  mode: { type: String, required: true },
  meetingLink: { type: String },
  venue: { type: String },
//   uploads: { type: String } 
});

// Create a model for the event schema
const Event = mongoose.model('Event', eventSchema);

module.exports = Event;


