<template>
    <div class="container">
        <h3 class="text-center">Calling Page</h3>

        <div class="d-flex justify-content-center align-items-center" style="height: 200px;">
            <p class="text-center">Call in Progress...</p>
        </div>

        <div class="d-flex justify-content-around p-3">
            <button class="btn btn-danger" @click="cancelCall" style="flex-grow: 1; max-width: 150px;">
                <i class="bi bi-x-circle"></i> Cancel
            </button>
        </div>
    </div>
</template>

<script>
    import emitter from '../event-bus.js';

    export default {
        name: 'CallingPage',
        data() {
            return {
                callInfo: '',
            };
        },
        methods: {
            cancelCall() {
                // Emit the cancel event through the EventBus
                emitter.emit('cancelCall');  // Emit the event that the call was canceled

                // Emit event to close the modal in the parent component
                this.$emit('closeModal'); // Close the CallingPage modal
                console.log('Call canceled from CallingPage');
            },
        },
    };
</script>



<style scoped>
    .container {
        padding-bottom: 60px; /* Make space for buttons */
    }

    .d-flex {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
    }

    .form-control {
        width: 100%;
    }

    .mb-4 {
        margin-bottom: 1.5rem;
    }

    .p-3 {
        padding: 20px;
    }

    .btn-success,
    .btn-danger {
        width: 100%;
        max-width: 150px; /* Limit button width for better alignment */
    }

    .modal-body {
        max-height: 70vh;
        overflow-y: auto;
    }

    @media (max-width: 576px) {
        .container {
            padding-left: 15px;
            padding-right: 15px;
        }

        .btn-success,
        .btn-danger {
            max-width: 100%; /* Buttons take full width on small screens */
        }

        .mb-4 {
            margin-bottom: 1rem;
        }
    }
</style>
