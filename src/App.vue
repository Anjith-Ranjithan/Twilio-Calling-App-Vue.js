<template>
    <div id="app">
        <h1>Twilio Call App</h1>
        <div class="toolbar">
            <input type="text"
                   v-model="phoneNumber"
                   placeholder="Enter phone number"
                   class="phone-input" />

            <!-- DialCall Component -->
            <DialCall :phoneNumber="phoneNumber" @callStatusUpdated="updateCallStatus" />

            <button @click="cancelCall" v-if="callStatus !== 'Idle'">Cancel</button>

            <!-- Receive Call Button Component -->
            <ReceiveCall @callStatusUpdated="updateCallStatus" />
            <MuteButton @callStatusUpdated="updateCallStatus" />
            <PauseButton @callStatusUpdated="updateCallStatus" />

            <!-- Call Status Display -->
            <CallStatus :status="callStatus" />
        </div>
    </div>
</template>

<script>
    import io from 'socket.io-client'; // Import socket.io client
    import MuteButton from './components/MuteButton.vue';
    import CallStatus from './components/CallStatus.vue';
    import PauseButton from './components/PauseButton.vue';
    import DialCall from './components/DialCall.vue';
    import ReceiveCall from './components/ReceiveCall.vue';

    export default {
        name: 'App',
        components: {
            DialCall,
            ReceiveCall,
            CallStatus,
            MuteButton,
            PauseButton
        },
        data() {
            return {
                phoneNumber: '',
                callStatus: 'Idle', // Default status
                socket: null, // WebSocket client
            };
        },
        methods: {
            updateCallStatus(status) {
                this.callStatus = status;
            },
            cancelCall() {
                // Reset everything to its initial state
                this.phoneNumber = '';
                this.callStatus = 'Idle';
                this.socket.emit('cancelCall');  // Emit an event to handle cancellation at the server-side (if needed)
            }
        },
        mounted() {
            // Initialize WebSocket connection
            this.socket = io('https://2899-111-92-86-174.ngrok-free.app'); // Your server's URL here

            // Listen for 'incomingCall' event from backend
            this.socket.on('incomingCall', (data) => {
                this.updateCallStatus(data.status);
            });
        }
    };
</script>
