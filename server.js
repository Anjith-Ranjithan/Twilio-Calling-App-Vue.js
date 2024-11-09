require('dotenv').config();
const express = require('express');
const twilio = require('twilio');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const https = require('https'); 
const options = {
  key: fs.readFileSync('./certificates/private.key'),
  cert: fs.readFileSync('./certificates/certificate.crt'),
};
const server = https.createServer(options,app);
const socketIo = require('socket.io');
const io = socketIo(server, {
  transports: ['websocket', 'polling'],    // Fallback to polling if WebSocket is unavailable
});
const port = process.env.PORT || 3000;
// Serve static files or routes here if needed
app.get('/', (req, res) => {
  res.send('Hello, this is a secure WebSocket server!');
});
const client = twilio(process.env.TWILIO_API_KEY, process.env.TWILIO_API_SECRET, {
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
});

app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));  

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
      from: process.env.TWILIO_PHONE_NUMBER, 
      url: 'https://vue-twilio-app-437177769978.us-central1.run.app/twiml',
      statusCallback: 'https://vue-twilio-app-437177769978.us-central1.run.app/call-status', 
      statusCallbackMethod: 'POST', 
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


io.on('connection', (socket) => {
  console.log('A user connected');
  console.log(socket);

  // Simulate an incoming call event after a delay (for testing)
  /*setTimeout(() => {
    socket.emit('incomingCall', { status: 'ringing' });
  }, 2000);  // Emits after 2 seconds*/
});



// Endpoint to handle incoming call status updates from Twilio (statusCallback)
app.post('/incoming-call-status', (req, res) => {
    const callStatus = req.body.CallStatus;
    console.log(req.body);

  
    if (callStatus === 'ringing') {
          console.log(callStatus);
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
  

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });