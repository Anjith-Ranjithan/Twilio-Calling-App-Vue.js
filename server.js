require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const http = require('http'); // Add this line to import the http module
const server = http.createServer(app);
const socketIo = require('socket.io');
const io = socketIo(server);
const port = process.env.PORT || 3000;

const client = twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
});

// Use CORS to allow requests from your frontend
app.use(cors({
  origin: 'http://localhost:8081', // Vue.js frontend URL
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json()); // for JSON requests
app.use(bodyParser.urlencoded({ extended: true }));  // for form-encoded data (Twilio status updates)

// Endpoint to make a call
app.post('/make-call', (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({ error: 'Phone number is required.' });
  }

  // Initiate the call with the TwiML URL
  client.calls
    .create({
      to: to,
      from: process.env.TWILIO_PHONE_NUMBER, // Your Twilio number
      url: 'https://2899-111-92-86-174.ngrok-free.app/twiml',
      statusCallback: 'https://2899-111-92-86-174.ngrok-free.app/call-status', // URL for the status updates
      statusCallbackMethod: 'POST', // TwiML URL for the call flow
    })
    .then(call => {
      res.status(200).json({ message: 'Call initiated', callSid: call.sid });
    })
    .catch(error => {
      res.status(500).json({ error: error.message });
    });
});

// TwiML endpoint for handling call flow
app.post('/twiml', (req, res) => {
  const twiml = new twilio.twiml.VoiceResponse();
  twiml.say('Hello! You have received a call from Twilio!');
  res.type('text/xml');
  res.send(twiml.toString());
});
// Backend (Server-Side) Code Update

io.on('connection', (socket) => {
    console.log('A user connected');
    
    // Listen for events sent from the frontend
    socket.on('disconnect', () => {
      console.log('A user disconnected');
    });
  });


// Endpoint to handle incoming call status updates from Twilio (statusCallback)
app.post('/incoming-call-status', (req, res) => {
    const callStatus = req.body.CallStatus;
  
    if (callStatus === 'ringing') {
      // Trigger frontend to update that the call is ringing
      io.emit('incomingCall', { status: 'Ringing' });
    } else if (callStatus === 'completed') {
      io.emit('incomingCall', { status: 'Call completed' });
    } else if (callStatus === 'busy') {
      io.emit('incomingCall', { status: 'Line is busy' });
    } else if (callStatus === 'no-answer') {
      io.emit('incomingCall', { status: 'No answer' });
    }
  
    res.status(200).send('OK');
  });

  app.post('/cancel-call', (req, res) => {
    const { callSid } = req.body;
  
    if (!callSid) {
      return res.status(400).json({ error: 'Call SID is required.' });
    }
  
    client.calls(callSid)
      .update({ status: 'completed' })
      .then(call => {
        res.status(200).json({ message: 'Call cancelled successfully', callSid: call.sid });
      })
      .catch(error => {
        res.status(500).json({ error: error.message });
      });
  });
  

// Start the server and listen on the specified port
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });

