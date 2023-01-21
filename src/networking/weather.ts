import { WeatherResponse,ErrorWeatherResponse } from "../model/weatherResponse";

let city = "";

const API_CURRENT = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ac6f213887b95d0b8171b342e702e112&units=metric`;

// TODO: Create an async function with an argument called city to return the that of the endpoint

export const getWeatherApi = async (
  currentCity: string
): Promise<WeatherResponse | ErrorWeatherResponse> => {
  var restOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
  };
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${currentCity}&appid=ac6f213887b95d0b8171b342e702e112&units=metric`
  );

  return response.json();
};
