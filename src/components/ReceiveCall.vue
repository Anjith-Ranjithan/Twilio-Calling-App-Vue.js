<template>
  <div>
    <button 
      @click="receiveCall" 
      style="flex-grow: 1; width: 120px; margin-bottom: 10px;" 
      class="btn btn-secondary"
    >
      Receive Call
    </button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  methods: {
    async receiveCall() {
      // Send a POST request to the /incoming-call-status endpoint
      try {
        await axios.post('https://vue-twilio-app-437177769978.us-central1.run.app/incoming-call-status', {
          CallStatus: 'ringing',  // Hardcoding the CallStatus as 'ringing'
        });
        //const CallStatus ='ringing';
        //this.$emit('callFunction',CallStatus); 
        // Emit an event to update the frontend with the status
        //this.$emit('callStatusUpdated', 'Receiving call...');
      } catch (error) {
        console.error('Error updating call status:', error);
      }
    }
  }
}
</script>
