<template>
    <div v-if="status">
        Status: {{ status }}
    </div>
</template>

<script>
  export default {
    props: {
      status: String
    }
  };
</script>
