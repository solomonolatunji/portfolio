<template>
    <div class="loading-container" :class="containerClass">
        <!-- Spinner -->
        <div class="spinner" :style="spinnerStyle"></div>
        <!-- Optional Text -->
        <span v-if="text" class="loading-text">{{ text }}</span>
    </div>
</template>

<script>
export default {
    name: "Loading",
    props: {
        size: {
            type: String,
            default: "md",
            validator: (value) => ["sm", "md", "lg"].includes(value),
        },
        color: {
            type: String,
            default: "#6d28d9",
        },
        text: {
            type: String,
            default: "",
        },
    },
    computed: {
        containerClass() {
            return {
                "loading-sm": this.size === "sm",
                "loading-md": this.size === "md",
                "loading-lg": this.size === "lg",
            };
        },
        spinnerStyle() {
            const sizes = {
                sm: "2rem",
                md: "3rem",
                lg: "4rem",
            };
            return {
                width: sizes[this.size],
                height: sizes[this.size],
                border: `4px solid ${this.color}`,
                borderTop: "4px solid transparent",
            };
        },
    },
};
</script>

<style scoped>
.loading-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
}

.loading-sm {
    padding: 1rem 0;
}

.loading-md {
    padding: 2rem 0;
}

.loading-lg {
    padding: 3rem 0;
}

.spinner {
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

.loading-text {
    color: #d1d5db;
    font-size: 0.875rem;
    font-weight: 500;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>