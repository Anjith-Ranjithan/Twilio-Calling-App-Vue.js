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
          await axios.post('https://vue-twilio-app-dot-project-2024-440809.el.r.appspot.com/make-call', {
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
