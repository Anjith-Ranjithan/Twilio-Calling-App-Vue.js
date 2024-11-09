<template>
    <div>
      <button @click="toggleMute" style="flex-grow: 1; width: 120px; margin-bottom: 10px;" class="btn btn-light">{{ isMuted ? 'Unmute' : 'Mute' }}</button>
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
