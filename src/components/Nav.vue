<template>
  <nav class="flex justify-center items-center h-20 bg-blue-500 px-3 py-2">
    <div class="max-w-[1400px] flex justify-between items-center w-full h-full">
      <!-- LOGO -->
      <h1 class="items-center text-white text-2xl font-semibold flex gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="3rem"
          height="3rem"
          viewBox="0 0 48 48"
        >
          <path
            fill="currentColor"
            d="M32.25 38.5a1.75 1.75 0 0 1 .144 3.494l-.143.006h-16.5a1.75 1.75 0 0 1-.144-3.494l.144-.006zm6-5.995a1.75 1.75 0 0 1 .144 3.494l-.143.006H9.75a1.75 1.75 0 0 1-.143-3.494l.143-.006zM24 6.01c6.337 0 9.932 4.194 10.455 9.26h.16c4.078 0 7.384 3.297 7.384 7.365S38.692 30 34.614 30h-21.23C9.306 30 6 26.703 6 22.635s3.306-7.365 7.384-7.365h.16C14.07 10.171 17.662 6.01 24 6.01"
          />
        </svg>
        <span class="select-none"> Weather Tracker </span>
      </h1>

      <div class="h-full w-full max-w-[500px] flex gap-5 items-center">
        <form
          @submit.prevent=""
          class="w-full bg-white rounded-md h-10 flex p-2"
        >
          <input
            placeholder="Enter a City..."
            type="text"
            class="text-neutral-700 font-medium w-full bg-transparent focus:outline-none h-full"
          />
          <button
            class="aspect-square flex justify-center items-center h-full text-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5rem"
              height="1.5rem"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m20 20l-4.05-4.05m0 0a7 7 0 1 0-9.9-9.9a7 7 0 0 0 9.9 9.9"
              />
            </svg>
          </button>
        </form>
        <button
          @click="toggleMode"
          class="hover:scale-125 p-2 rounded-md aspect-square duration-200 flex justify-center gap-2 items-center text-white"
        >
          <svg
            v-if="mode === 'CELCIUS'"
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 14 14"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M1.5 2.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0M2.25 0a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5M8 4a2 2 0 0 1 2-2c.934 0 1.803.614 2.057 1.333a1 1 0 0 0 1.886-.666C13.373 1.056 11.679 0 10 0a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4c1.678 0 3.373-1.056 3.943-2.667a1 1 0 1 0-1.886-.666C11.803 11.387 10.934 12 10 12a2 2 0 0 1-2-2z"
              clip-rule="evenodd"
            />
          </svg>

          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            width="1.5rem"
            height="1.5rem"
            viewBox="0 0 14 14"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M2.25 1.5a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5M0 2.25a2.25 2.25 0 1 1 4.5 0a2.25 2.25 0 0 1-4.5 0M6 1a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H8v3.5h4a1 1 0 1 1 0 2H8V13a1 1 0 1 1-2 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue";
import useFetch from "@/composable/useFetch";

const { getData } = useFetch();
const mode = ref("CELCIUS");

const toggleMode = () => {
  mode.value = mode.value == "CELCIUS" ? "FAHRENHEIT" : "CELCIUS";
};

getData("Plaridel");
</script>

<style lang="scss" scoped></style>
