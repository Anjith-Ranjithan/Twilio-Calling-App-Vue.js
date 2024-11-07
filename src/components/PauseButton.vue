<template>
    <div>
        <button @click="togglePause">{{ isPaused ? 'Continue' : 'Pause' }}</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            isPaused: false
        };
    },
    methods: {
        togglePause() {
            this.isPaused = !this.isPaused;
            this.$emit('callStatusUpdated', this.isPaused ? 'Call paused' : 'Call continued');
        }
    }
};
</script>
