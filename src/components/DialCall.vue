<template>
    <div>        
      <button class="btn btn-success" @click="dialCall" style="flex-grow: 1; width: 120px; margin-bottom: 10px;">
          <i class="bi bi-phone"></i> Start Call </button>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    phoneNumber: String
  },
  methods: {
    async dialCall() {
      if (this.phoneNumber) {
        try {
          // Send the call request to the backend
          await axios.post('https://2899-111-92-86-174.ngrok-free.app/make-call', {
            to: this.phoneNumber,
          });

          // Emit the initial status when the call is initiated
          this.$emit('callStatusUpdated', `Call initiated to ${this.phoneNumber}`);
          
        } catch (error) {
          this.$emit('callStatusUpdated', `Error: ${error.message}`);
        }
      } else {
        this.$emit('callStatusUpdated', 'Please enter a phone number.');
      }
    }
  }
};
</script>
