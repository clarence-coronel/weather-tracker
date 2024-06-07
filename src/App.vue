<template>
  <Nav
    @updateData="updateData"
    @dataLoading="dataLoading"
    @modeChanged="modeChanged"
  />
  <div class="w-full flex justify-center">
    <div class="w-full max-w-[1400px] p-5">
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
          <tbody v-if="weatherData">
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
                <img class="inline-block" :src="weather.data.condition.icon" />
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
    <!-- <span
      class="text-3xl text-blue-400"
      v-if="!weatherData || weatherData.length === 0"
      >Loading...</span
    >
    <div v-else>{{ weatherData }}</div> -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import Nav from "./components/Nav.vue";

const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const isLoading = ref(false);
const mode = ref("CELSIUS");
const weatherData = ref(null);

const updateData = (data) => {
  weatherData.value = data;
  console.log(weatherData.value);
};

const dataLoading = (isPending) => {
  console.log("LOADING VAL CHANGED");
  isLoading.value = isPending.value;
};

const modeChanged = (newMode) => (mode.value = newMode);
</script>
