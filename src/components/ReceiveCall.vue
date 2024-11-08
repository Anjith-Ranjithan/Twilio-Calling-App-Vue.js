<template>
    <div>
      <button @click="receiveCall" style="flex-grow: 1; width: 120px; margin-bottom: 10px;" class="btn btn-secondary">Receive Call</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      receiveCall() {
        this.$emit('openCallingPage'); 
        // Trigger the backend to handle the incoming call
        this.$emit('callStatusUpdated', 'Receiving call...');

      }
    }
  };
  </script>
  