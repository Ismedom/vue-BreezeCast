<!-- App.vue -->
<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 p-4">
        <div class="py-4 md:py-6">
            <WeatherSearch @weather-data="updateWeatherData" />
        </div>
        <WeatherDisplay :weatherData="weatherData" />
    </div>
</template>

<script setup>
import { ref } from "vue";
import WeatherSearch from "./components/WeatherSearch.vue";
import WeatherDisplay from "./components/WeatherDisplay.vue";

const weatherData = ref(null);

const updateWeatherData = (data) => {
    weatherData.value = data;
};
</script>
