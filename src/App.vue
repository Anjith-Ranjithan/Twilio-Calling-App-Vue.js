<template>
  <div id="app">
    <h1>Twilio Call App</h1>
    <div class="toolbar">
      <button @click="dialCall">Dial Call</button>
      <button @click="receiveCall">Receive Call</button>
      <button @click="muteCall">Mute</button>
      <button @click="unmuteCall">Unmute</button>
      <button @click="pauseCall">Pause</button>
      <button @click="continueCall">Continue</button>
    </div>
    <div v-if="callStatus">Status: {{ callStatus }}</div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data() {
    return {
      callStatus: null,
      currentCallSid: null,
    };
  },
  methods: {
    async dialCall() {
  const phoneNumber = prompt('Enter the phone number to dial');
  if (phoneNumber) {
    try {
      const response = await axios.post('https://8199-111-92-86-174.ngrok-free.app/make-call', {
        to: phoneNumber,
      });
      this.callStatus = `Call initiated to ${phoneNumber}`;
      this.currentCallSid = response.data.callSid;
    } catch (error) {
      this.callStatus = `Error: ${error.message}`;
    }
  }
},
    receiveCall() {
      this.callStatus = 'Receiving call (simulated)...';
      // You can integrate receiving calls here as well (requires Twilio configuration)
    },
    muteCall() {
      this.callStatus = 'Muted';
    },
    unmuteCall() {
      this.callStatus = 'Unmuted';
    },
    pauseCall() {
      this.callStatus = 'Call paused';
    },
    continueCall() {
      this.callStatus = 'Call continued';
    },
  },
};
</script>

<style scoped>
.toolbar {
  display: flex;
  gap: 10px;
}
button {
  padding: 10px;
  font-size: 16px;
}
</style>
