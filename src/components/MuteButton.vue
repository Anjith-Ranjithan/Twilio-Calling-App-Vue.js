<template>
    <div>
        <button @click="toggleMute">{{ isMuted ? 'Unmute' : 'Mute' }}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isMuted: false
        };
    },
    methods: {
        toggleMute() {
            this.isMuted = !this.isMuted;
            this.$emit('callStatusUpdated', this.isMuted ? 'Muted' : 'Unmuted');
        }
    }
};
</script>
