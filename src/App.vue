<template>
    <div id="app" :style="backgroundStyle">
        <MainNavbar />
        <h1>Welcome to Twilio Call App</h1>
        <div class="row">
            <div class="col-md-6 d-flex flex-column justify-content-between p-3">
                <div class="primaryclass">
                    <h3>Make a call</h3>
                    <input type="text" v-model="phoneNumber" placeholder="Mobile no. with Country code " class="form-control form-control-md phone-input" />
                    <DialCall :phoneNumber="phoneNumber" @callStatusUpdated="updateCallStatus" />
                    <button class="btn btn-danger" @click="cancelCall" style="flex-grow: 1;width: 120px;">
                        <i class="bi bi-x-circle"></i> Cancel
                    </button>
                    <CallStatus :status="callStatus" />
                </div>
            </div>
            <ModelPopup :isVisible="showCallingPage" @update:isVisible="showCallingPage = $event" />
            <div class="col-md-6 d-flex flex-column justify-content-between p-3">
                <div class="primaryclass">
                    <ReceiveCall />
                    <MuteButton @callStatusUpdated="updateCallStatus" />
                    <PauseButton @callStatusUpdated="updateCallStatus" />
                </div>
            </div>
        </div>
    </div>
    <MainFooter />
</template>

<script>
    import { onMounted, onBeforeUnmount, ref } from 'vue'; // Import relevant Vue 3 hooks
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
        setup() {
            const phoneNumber = ref('');
            const callStatus = ref('');
            const showCallingPage = ref(false);
            const socket = ref(null);
            const backgroundStyle = {
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                width: '100%',
            };

            // Method to update the call status
            const updateCallStatus = (status) => {
                console.log("Updating call status:", status);
                callStatus.value = status;
                if (status == 'Ringing') {
                    openCallingPage(); // Call this method when the status is "ringing"
                }
            };

            // Method to cancel the call
            const cancelCall = () => {
                phoneNumber.value = '';
                callStatus.value = '';
                socket.value.emit('cancelCall'); // Emit an event to handle cancellation at the server-side (if needed)
            };

            // Method to open the calling page
            const openCallingPage = () => {
                showCallingPage.value = true;  // Show the CallingPage modal
            };

            // Method to close the modal
            const closeModal = () => {
                showCallingPage.value = false; // Close the modal
            };

            // Handle incoming call function based on status
            const callFunction = (callStatus) => {
                if (callStatus == 'ringing') {
                    openCallingPage(); // Call this method when the status is "ringing"
                }
            };

            // Socket connection and event listeners setup
            onMounted(() => {
                console.log('onMounted function triggered!!!!');

                socket.value = io('https://twiliocallapp2-dot-project-2024-440809.el.r.appspot.com', {
                    transports: ['websocket'],
                });


                socket.value.on('connect', () => {
                    console.log('Connected to socket server');
                });

                socket.value.on('connect_error', (err) => {
                    console.error('Socket connection failed:', err);  // More detailed error
                });

                // Listen for 'incomingCall' event from the backend
                socket.value.on('incomingCall', (data) => {
                    console.log('Received incoming call status:', data.status);
                    updateCallStatus(data.status);

                });

                // Listen for cancel event via emitter
                emitter.on('cancelCall', cancelCall);
            });

            // Clean up the socket connection when the component is unmounted
            onBeforeUnmount(() => {
                if (socket.value) {
                    socket.value.disconnect();
                }
            });

            return { phoneNumber, callStatus, showCallingPage, socket, backgroundStyle, updateCallStatus, cancelCall, openCallingPage, closeModal, callFunction };
        },
    };
</script>

<style src="./css/App.css"></style>
