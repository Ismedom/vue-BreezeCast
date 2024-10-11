<template>
    <div>
        <p class="text-red-400 text-3xl first-letter:uppercase">
            {{ message }}
        </p>
    </div>
</template>

<script setup>
const pros = defineProps({
    message: String,
});
</script>
