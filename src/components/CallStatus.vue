<template>
    <div v-if="status">{{ status }}</div>
</template>

<script>
    export default {
        props: {
            status: String
        }
    };
</script>
