import { ref } from "vue";

export default function useFetch() {
  const isPending = ref(false);

  const getData = async (city) => {
    try {
      isPending.value = true;
      const daysCount = 7; //default
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${daysCount}`;

      const response = await fetch(url);
      const data = await response.json(); // Parse JSON response
      const days = data.forecast.forecastday;

      //   Map retrieved raw data to preferred structure
      const processedData = {};
      processedData.filtered = days.map((day) => {
        const newDay = {
          date: day.date,
          day: new Date(day.date).getDay(),
          data: day.day,
        };
        return newDay;
      });

      processedData.raw = data;

      return processedData;
    } catch (error) {
      console.error(error);
      return [];
    } finally {
      isPending.value = false;
    }
  };

  return { getData, isPending };
}
