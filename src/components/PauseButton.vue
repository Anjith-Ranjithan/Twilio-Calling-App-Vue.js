<template>
    <div>
      <button @click="togglePause" style="flex-grow: 1; width: 120px; margin-bottom: 10px;" class="btn btn-light">{{ isPaused ? 'Continue' : 'Pause' }}</button>
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
