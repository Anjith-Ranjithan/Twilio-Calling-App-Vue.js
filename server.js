require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');  // Import CORS

const app = express();
const port = process.env.PORT || 3000;

const client = twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
});

// Use CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:8081',  // Vue.js frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json());  // Use bodyParser.json() to parse JSON data

// Endpoint to make a call
app.post('/make-call', (req, res) => {
  const { to } = req.body;  // Extract 'to' from the request body

  if (!to) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  client.calls
    .create({
      to: to, // Phone number to dial
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      url: 'https://8199-111-92-86-174.ngrok-free.app/twiml', // TwiML URL to define what happens during the call
    })
    .then(call => {
      res.status(200).json({ message: 'Call initiated', callSid: call.sid });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// TwiML Endpoint (called during the call)
app.post('/twiml', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Hello! You have received a call from Twilio!');
  res.type('text/xml');
  res.send(twiml.toString());
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
