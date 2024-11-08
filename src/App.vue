<template>
  <div id="app" :style="backgroundStyle">
    <MainNavbar />
    <h1>Welcome to Twilio Call App</h1>
    <!-- Create a row to wrap the two columns -->
    <div class="row">
      <div class="col-md-6 d-flex flex-column justify-content-between p-3">
        <div class="primaryclass">
          <h3>Make a call</h3>
          <input type="text" v-model="phoneNumber" placeholder="Mobile no. with Country code " class="form-control form-control-md phone-input"/>
          <!-- DialCall Component -->
          <DialCall :phoneNumber="phoneNumber" @callStatusUpdated="updateCallStatus" />
          <button class="btn btn-danger" @click="cancelCall" style="flex-grow: 1;width: 120px;">
            <i class="bi bi-x-circle"></i> Cancel
          </button>
          <!-- Call Status Display -->
          <CallStatus :status="callStatus" />
        </div>
      </div>
      <ModelPopup :isVisible="showCallingPage" @update:isVisible="showCallingPage = $event" />
      <div class="col-md-6 d-flex flex-column justify-content-between p-3">
        <div class="primaryclass">
          <!-- Receive Call Button Component -->
          <ReceiveCall @openCallingPage="openCallingPage" @callStatusUpdated="updateCallStatus" />
          <MuteButton @callStatusUpdated="updateCallStatus" />
          <PauseButton @callStatusUpdated="updateCallStatus" />
        </div>
      </div>
    </div>
    
  </div>
  <MainFooter />
</template>

<script>
import io from 'socket.io-client'; // Import socket.io client
import MuteButton from './components/MuteButton.vue';
import CallStatus from './components/CallStatus.vue';
import PauseButton from './components/PauseButton.vue';
import DialCall from './components/DialCall.vue';
import ReceiveCall from './components/ReceiveCall.vue';
import MainNavbar from './components/MainNavbar.vue';
import MainFooter from './components/MainFooter.vue';
import ModelPopup from './components/ModelPopup.vue';
import emitter from './event-bus.js';
import backgroundImage from '@/assets/Background.jpg'; // Importing image

export default {
  name: 'App',
  components: {
    DialCall,
    ReceiveCall,
    CallStatus,
    MuteButton,
    PauseButton,
    MainNavbar,
    MainFooter,
    ModelPopup,
  },
  data() {
    return {
      phoneNumber: '',
      callStatus: '', // Default status
      socket: null, // WebSocket client
      showCallingPage: false, // Controls visibility of CallingPage modal
      backgroundImage // Image path
    };
  },
  computed: {
    // Computed property to set dynamic background style
    backgroundStyle() {
      return {
        backgroundImage: `url(${this.backgroundImage})`,
        backgroundSize: 'cover',          // Ensure image covers the screen
        backgroundPosition: 'center',     // Center the background image
        backgroundAttachment: 'fixed',    // Fixed background for parallax effect
        width: '100%',                    // Make the background cover the full width
      };
    },
  },
  methods: {
    updateCallStatus(status) {
      this.callStatus = status;
    },
    cancelCall() {
      // Reset everything to its initial state
      this.phoneNumber = '';
      this.callStatus = '';
      this.socket.emit('cancelCall');  // Emit an event to handle cancellation at the server-side (if needed)
    },
    openCallingPage() {
      this.showCallingPage = true;  // Show the CallingPage modal
    },
    closeModal() {
      this.showCallingPage = false; // Close the modal
    },
  },
  mounted() {
    // Initialize WebSocket connection
    this.socket = io('https://2899-111-92-86-174.ngrok-free.app'); // Your server's URL here
    // Listen for events from the EventBus
    emitter.on('cancelCall', () => {
      this.cancelCall();  // Call cancelCall method when cancel event is triggered
    });

    // Listen for 'incomingCall' event from backend
    this.socket.on('incomingCall', (data) => {
      this.updateCallStatus(data.status);
    });
  }
};
</script>

<style src="./css/App.css"></style>
