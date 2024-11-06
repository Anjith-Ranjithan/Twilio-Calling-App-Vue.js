<template>
    <div id="app">
        <h1>Twilio Call App</h1>
        <div class="toolbar">
            <input type="text"
                   v-model="phoneNumber"
                   placeholder="Enter phone number"
                   class="phone-input" />
            <button @click="dialCall">Dial Call</button>
            <button @click="receiveCall">Receive Call</button>

            <!-- Mute/Unmute Button -->
            <button @click="toggleMute">{{ isMuted ? 'Unmute' : 'Mute' }}</button>

            <!-- Pause/Continue Button -->
            <button @click="togglePause">{{ isPaused ? 'Continue' : 'Pause' }}</button>
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
                phoneNumber: '',  // To hold the entered phone number
                callStatus: null,
                currentCallSid: null,
                isMuted: false,   // Tracks whether the call is muted
                isPaused: false,  // Tracks whether the call is paused
            };
        },
        methods: {
            async dialCall() {
                if (this.phoneNumber) {
                    try {
                        const response = await axios.post('https://8199-111-92-86-174.ngrok-free.app/make-call', {
                            to: this.phoneNumber,
                        });
                        this.callStatus = `Call initiated to ${this.phoneNumber}`;
                        this.currentCallSid = response.data.callSid;
                    } catch (error) {
                        this.callStatus = `Error: ${error.message}`;
                    }
                } else {
                    this.callStatus = 'Please enter a phone number.';
                }
            },
            receiveCall() {
                this.callStatus = 'Receiving call (simulated)...';
                // You can integrate receiving calls here as well (requires Twilio configuration)
            },

            // Toggle Mute/Unmute functionality
            toggleMute() {
                this.isMuted = !this.isMuted;
                this.callStatus = this.isMuted ? 'Muted' : 'Unmuted';
                // You would integrate Twilio's mute API here to mute/unmute the call.
                console.log(this.isMuted ? 'Muting the call' : 'Unmuting the call');
            },

            // Toggle Pause/Continue functionality
            togglePause() {
                this.isPaused = !this.isPaused;
                this.callStatus = this.isPaused ? 'Call paused' : 'Call continued';
                // You would integrate Twilio's pause/continue API here to pause/resume the call.
                console.log(this.isPaused ? 'Pausing the call' : 'Resuming the call');
            },
        },
    };
</script>

<style scoped>
    .toolbar {
        display: flex;
        gap: 10px;
        align-items: center;
    }

    .phone-input {
        padding: 10px;
        font-size: 16px;
        width: 200px;
    }

    button {
        padding: 10px;
        font-size: 16px;
    }
</style>




Mute/Unmute API: You'll need to implement the call muting/unmuting logic on the server side using Twilio's client.calls.update method.
Pause/Continue API: You might need to pause the call on the server by using the Twilio API or using custom logic to handle it.