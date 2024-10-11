<template>
    <div
        v-if="weatherData && !isLoading && !isError"
        class="max-w-full md:max-w-[80%] lg:max-w-[60%] mx-auto text-center flex justify-between flex-wrap lg:flex-nowrap gap-6">
        <div class="flex justify-center items-center flex-col py-6 w-full md:w-[60%]">
            <h2 class="text-2xl font-semibold mb-4 w-full text-start border-b border-b-gray-300 pb-4 text-gray-100">
                {{ weatherData.name }}, {{ weatherData.sys.country }}
            </h2>
            <div>
                <div>
                    <div class="flex items-end">
                        <div class="overflow-hidden">
                            <img
                                :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`"
                                :alt="weatherData.weather[0].description"
                                class="w-16 h-16 translate-y-[25%] translate-x-[-5px]" />
                        </div>
                        <p class="text-xl text-gray-100">
                            {{ weatherData.weather[0].main }}
                        </p>
                    </div>
                    <span class="text-8xl font-bold text-gray-50">{{ Math.round(weatherData.main.temp) }}°C</span>
                    <p class="text-[15px] mb-2 text-start capitalize text-gray-200">
                        {{ weatherData.weather[0].description }}
                    </p>
                </div>
            </div>
        </div>
        <div class="flex-1 grid grid-cols-2 gap-4 mt-6">
            <div class="bg-gray-100 p-3 rounded-md">
                <p class="font-semibold">Feels Like</p>
                <p>{{ Math.round(weatherData.main.feels_like) }}°C</p>
            </div>
            <div class="bg-gray-100 p-3 rounded-md">
                <p class="font-semibold">Humidity</p>
                <p>{{ weatherData.main.humidity }}%</p>
            </div>
            <div class="bg-gray-100 p-3 rounded-md">
                <p class="font-semibold">Wind Speed</p>
                <p>{{ weatherData.wind.speed }} m/s</p>
            </div>
            <div class="bg-gray-100 p-3 rounded-md">
                <p class="font-semibold">Pressure</p>
                <p>{{ weatherData.main.pressure }} hPa</p>
            </div>
        </div>
    </div>

    <div v-else-if="!isLoading && isError" class="max-w-full flex items-center justify-center md:max-w-[60%] mx-auto">
        <Error :message="errorMessage" />
    </div>

    <div v-else class="max-w-full md:max-w-[60%] mx-auto">
        <SkekLoading />
    </div>
</template>

<script setup>
import { ref } from "vue";
import SkekLoading from "./loading/SkekLoading.vue";
import useLoading from "../composables/loading";
import useHandleError from "../composables/ErrorHandling";
import Error from "./error/Error.vue";
const { isError, setError, errorMessage } = useHandleError();
const { isLoading, changeLoading } = useLoading();

defineProps({
    weatherData: {
        type: Object,
        default: null,
    },
});
</script>
