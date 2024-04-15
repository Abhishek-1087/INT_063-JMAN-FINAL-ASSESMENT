// userEventDetails.js

const mongoose = require('mongoose');

// Define the schema for user event details
const userEventSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  eventName: { type: String, required: true },
});

const UserEvent = mongoose.model('UserEvent', userEventSchema);

module.exports = UserEvent;


// const mongoose = require('mongoose');

// const userEventSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   eventId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Event' },
//   status: { type: String, default: 'not registered' } // Default value set to 'not registered'
// });

// const UserEvent = mongoose.model('UserEvent', userEventSchema);

// module.exports = UserEvent;

