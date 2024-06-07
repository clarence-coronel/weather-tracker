export default function useFetch() {
  const getData = async (city) => {
    try {
      const daysCount = 7; //default
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=${daysCount}`;

      const response = await fetch(url);
      const data = await response.json(); // Parse JSON response
      const days = data.forecast.forecastday;

      //   Map retrieved raw data to preferred structure
      const processedDays = days.map((day) => {
        const newDay = {
          date: day.date,
          day: new Date(day.date).getDay(),
          data: day.day,
        };

        return newDay;
      });

      console.log(processedDays);
    } catch (error) {
      console.error(error);
    }
  };

  return { getData };
}
