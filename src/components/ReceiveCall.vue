<template>
    <div>
        <button @click="receiveCall">Receive Call</button>
    </div>
</template>

<script>
    export default {
        methods: {
            receiveCall() {
                // Trigger the backend to handle the incoming call
                this.$emit('callStatusUpdated', 'Receiving call...');
            }
        }
    };
</script>
