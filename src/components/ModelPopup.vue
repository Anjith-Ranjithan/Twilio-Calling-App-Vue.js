<!-- ModalPopup.vue -->
<template>
    <div v-if="isVisible" class="modal-overlay">
      <div class="modal-content">
        <button type="button" class="btn-close" @click="closeModal" aria-label="Close"></button>
        <!-- Pass down the closeModal event from parent to CallingPage -->
        <CallingPage @closeModal="closeModal" /> <!-- Pass closeModal handler to CallingPage -->
      </div>
    </div>
  </template>
  
  <script>
  import CallingPage from './CallingPage.vue';
  
  export default {
    name: 'ModalPopup',
    components: {
      CallingPage
    },
    props: {
      isVisible: Boolean // Prop to control visibility of the modal
    },
    methods: {
      closeModal() {
        this.$emit('update:isVisible', false); // Emit an event to hide the modal
      }
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.7); /* Dark background */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1050; /* Ensure modal is on top of other content */
  }
  
  .modal-content {
    background: rgba(255, 255, 255, 1);
    border-radius: 8px;
    padding: 20px;
    width: 100%;
    max-width: 500px; /* Restrict max width */
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    position: relative;
  }
  
  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    background: none;
    font-size: 1.5rem;
  }
  
  .modal-body {
    padding: 0;
  }
  </style>
  