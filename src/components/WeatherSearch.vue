<!-- components/WeatherSearch.vue -->
<template>
    <div class="mb-6 max-w-full md:max-w-[60%] mx-auto">
        <div class="flex items-center mb-4">
            <input
                v-model="searchQuery"
                @keyup.enter="searchWeather"
                type="text"
                placeholder="Enter city name"
                class="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
            <button
                @click="searchWeather"
                class="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 focus:outline-none">
                Search
            </button>
        </div>
        <div class="flex items-center justify-center">
            <button
                @click="useCurrentLocation"
                class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
                Use Current Location
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

import useLoading from "../composables/loading";
import { onMounted } from "vue";
import useHandleError from "../composables/ErrorHandling";

const emit = defineEmits(["weather-data"]);
const searchQuery = ref("");

const { isLoading, changeLoading } = useLoading();
const { isError, setError } = useHandleError();

const API_KEY = import.meta.env.VITE_API_KEY;
const API_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

const searchWeather = async () => {
    if (!searchQuery.value) return;

    try {
        setError("No error", false);
        changeLoading(true);
        const response = await axios.get(`${API_BASE_URL}?q=${searchQuery.value}&appid=${API_KEY}&units=metric`);
        emit("weather-data", response.data);
        changeLoading(false);
    } catch (error) {
        setError(`error ${error.message}`);
        changeLoading(false);
        emit("weather-data", null);
    }
};

const useCurrentLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                try {
                    setError("No error", false);

                    changeLoading(true);
                    const response = await axios.get(
                        `${API_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                    );

                    emit("weather-data", response.data);
                    changeLoading(false);
                } catch (error) {
                    setError("Cannot get weather data");
                    changeLoading(false);
                    emit("weather-data", null);
                }
            },
            (error) => {
                setError("Error getting location");
            }
        );
    } else {
        setError("Geolocation is not supported by this browser.");
    }
};

onMounted(() => {
    useCurrentLocation();
});
</script>
