import axios from "axios";

export const getEnvironmentData = async (lat: number, lon: number) => {
  try {
    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    console.log(`Iniciando fetch para Lat: ${lat}, Lon: ${lon}`);

    const [weatherRes, airRes] = await Promise.all([
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`,
      ),
      axios.get(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`,
      ),
    ]);

    const weather = weatherRes.data;
    const air = airRes.data.list?.[0];

    if (!air) throw new Error("No se obtuvieron datos de calidad del aire");

    const components = air.components;
    const mainPollutant = Object.keys(components).reduce((a, b) =>
      components[a] > components[b] ? a : b,
    );

    return {
      temp: weather.main.temp,
      humidity: weather.main.humidity,
      aqi: air.main.aqi, // 1=Bueno, 2=Justo, 3=Moderado, 4=Pobre, 5=Muy Pobre
      mainPollutant: mainPollutant.toUpperCase(),
      location: weather.name,
    };
  } catch (error) {
    console.error("Error obteniendo datos ambientales:", error);

    return {
      temp: 20,
      humidity: 50,
      aqi: 1,
      mainPollutant: "N/A",
      location: "Desconocida",
    };
  }
};
