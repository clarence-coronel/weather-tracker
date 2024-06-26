<template>
  <div class="min-h-screen flex flex-col justify-between">
    <Nav
      @updateData="updateData"
      @dataLoading="dataLoading"
      @modeChanged="modeChanged"
    />
    <!-- Main -->
    <div class="w-full flex justify-center">
      <div
        v-if="weatherData && weatherData.raw"
        class="w-full max-w-[1400px] justify-between p-5"
      >
        <div
          class="max-md:flex-col max-md:gap-2 border-2 rounded-lg w-fit mx-auto flex p-10 justify-between gap-16 items-start"
        >
          <div class="flex flex-col text-neutral-600">
            <h3 class="text-2xl">
              {{ weatherData.raw.location.name }}
            </h3>
            <span>
              {{ weatherData.raw.location.region }},
              {{ weatherData.raw.location.country }}
            </span>
            <!-- <span>{{ weatherData.raw.location.tz_id }}</span> -->
            <span class="font-bold text-lg">{{
              weatherData.filtered[0].data.condition.text
            }}</span>
          </div>
          <div>
            <h2 class="font-bold text-7xl text-neutral-600">
              <template v-if="mode === 'CELSIUS'">
                {{ weatherData.filtered[0].data.avgtemp_c }}°C
              </template>
              <template v-else>
                {{ weatherData.filtered[0].data.avgtemp_f }}°F
              </template>
            </h2>
            <div class="flex justify-center gap-5">
              <span>{{ weatherData.raw.location.lat }}° N</span>
              <span>{{ weatherData.raw.location.lon }}° E</span>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="!weatherData && !isLoading"
        class="p-5 h-40 flex justify-center items-center"
      >
        <h1 class="text-5xl font-bold text-neutral-600">No city found :(</h1>
      </div>
    </div>
    <!-- Coming Days -->
    <div class="w-full flex justify-center">
      <div
        v-if="weatherData && weatherData.raw"
        class="w-full max-w-[1400px] p-5"
      >
        <div class="w-full overflow-auto">
          <table class="mx-auto w-full min-w-[900px] max-w-[1200px]">
            <thead>
              <tr class="border-b">
                <th>&nbsp;</th>
                <th class="font-normal py-2 text-left">Temperature</th>
                <th class="font-normal py-2 text-left">Condition</th>
                <th class="font-normal py-2 text-left">Humidity</th>
                <th class="font-normal py-2 text-left">Chance of Rain</th>
                <th class="font-normal py-2 text-left">Chance of Snow</th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="border-b"
                v-for="(weather, index) in weatherData.filtered"
                :key="index"
              >
                <!-- Day Of The Week -->
                <td class="font-normal py-2">
                  {{ index === 0 ? "Today" : daysOfTheWeek[weather.day] }}
                </td>
                <!-- Temp in C/F -->
                <!-- <td class="font-normal py-2">
                  {{
                    mode === "CELSIUS"
                      ? weather.data.avgtemp_c
                      : weather.data.avetemp_f
                  }}
                  {{ mode === "CELSIUS" ? "" : "°F" }}
                </td> -->
                <td v-show="mode === 'CELSIUS'" class="font-normal py-2">
                  {{ weather.data.avgtemp_c }}°C
                </td>
                <td v-show="mode === 'FAHRENHEIT'" class="font-normal py-2">
                  {{ weather.data.avgtemp_f }}°F
                </td>
                <!-- Condition -->
                <td>
                  <img
                    class="inline-block"
                    :src="weather.data.condition.icon"
                  />
                  <span class="inline-block text-xs italic">{{
                    weather.data.condition.text
                  }}</span>
                </td>
                <!-- Humidity -->
                <td>{{ weather.data.avghumidity }}%</td>
                <!-- Chance of Rain -->
                <td>{{ weather.data.daily_chance_of_rain }}%</td>
                <!-- Chance of Snow -->
                <td>{{ weather.data.daily_chance_of_snow }}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- Loading Indicator -->
    <div
      v-if="isLoading"
      class="left-0 top-0 absolute w-full z-50 min-h-screen bg-black/70 flex justify-center items-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="4rem"
        height="4rem"
        viewBox="0 0 24 24"
        class="text-blue-500 animate-spin"
      >
        <defs>
          <linearGradient
            id="mingcuteLoadingFill0"
            x1="50%"
            x2="50%"
            y1="5.271%"
            y2="91.793%"
          >
            <stop offset="0%" stop-color="currentColor" />
            <stop offset="100%" stop-color="currentColor" stop-opacity="0.55" />
          </linearGradient>
          <linearGradient
            id="mingcuteLoadingFill1"
            x1="50%"
            x2="50%"
            y1="15.24%"
            y2="87.15%"
          >
            <stop offset="0%" stop-color="currentColor" stop-opacity="0" />
            <stop offset="100%" stop-color="currentColor" stop-opacity="0.55" />
          </linearGradient>
        </defs>
        <g fill="none">
          <path
            d="M24 0v24H0V0zM12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035c-.01-.004-.019-.001-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427c-.002-.01-.009-.017-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093c.012.004.023 0 .029-.008l.004-.014l-.034-.614c-.003-.012-.01-.02-.02-.022m-.715.002a.023.023 0 0 0-.027.006l-.006.014l-.034.614c0 .012.007.02.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"
          />
          <path
            fill="url(#mingcuteLoadingFill0)"
            d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.502 7.502 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
            transform="translate(1.5 1.625)"
          />
          <path
            fill="url(#mingcuteLoadingFill1)"
            d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.475 10.475 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
            transform="translate(1.5 1.625)"
          />
        </g>
      </svg>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "./components/Nav.vue";
import Footer from "./components/Footer.vue";

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const isLoading = ref(false);
const mode = ref("CELSIUS");
const weatherData = ref(null);

const updateData = (data) => {
  weatherData.value = data;
  console.log(weatherData.value);
};

const dataLoading = (isPending) => (isLoading.value = isPending);

const modeChanged = (newMode) => (mode.value = newMode);
</script>
