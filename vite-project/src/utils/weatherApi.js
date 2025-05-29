import apiKey from "./constants.js";

export default async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    const weather = {
      city: data.name,
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };

    let category;
    if (weather.temperature >= 86) {
      category = "hot";
    } else if (weather.temperature >= 66) {
      category = "warm";
    } else {
      category = "cold";
    }

    return { ...weather, category };
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    throw error;
  }
}
