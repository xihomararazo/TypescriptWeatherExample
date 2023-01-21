import {
  DayOfWeek,
  WeatherIcon,
  WeatherIcontype,
  WeatherResponse,
} from "../model/weatherResponse";

const loader: HTMLElement = document.getElementById("loading") as HTMLElement;

// TODO: Create references for all the html elements
export const buttonClick: HTMLInputElement = document.getElementById(
  "button-location"
) as HTMLInputElement;
const WeatherIconPng: HTMLImageElement = document.getElementById(
  "weather-icon"
) as HTMLImageElement;

const day: HTMLElement = document.getElementById("date-dayname") as HTMLElement;
const date_day: HTMLElement = document.getElementById(
  "date-day"
) as HTMLElement;
const location_text: HTMLElement = document.getElementById(
  "location-text"
) as HTMLElement;
const weather_temp: HTMLElement = document.getElementById(
  "weather-temp"
) as HTMLElement;
const weather_desc: HTMLElement = document.getElementById(
  "weather-desc"
) as HTMLElement;
const text_temp_max: HTMLElement = document.getElementById(
  "text-temp-max"
) as HTMLElement;
const text_temp_min: HTMLElement = document.getElementById(
  "text-temp-min"
) as HTMLElement;
const text_humidity: HTMLElement = document.getElementById(
  "text-humidity"
) as HTMLElement;
const text_wind: HTMLElement = document.getElementById(
  "text-wind"
) as HTMLElement;
const input: HTMLInputElement = document.getElementById(
  "weather-location-input"
) as HTMLInputElement;

// TODO: Create the logic of the function
export const updateInteface = (weatherResponse: WeatherResponse): void => {
  //Usando API Info
  /* const date :Date = new Date(weatherResponse.dt * 1000);
  const numDay:number = date.getDay()-1;
  day.innerHTML = DayOfWeek[numDay];

  const date_text: string = date.toLocaleDateString();
  date_day.innerHTML = date_text;*/

  day.innerHTML = getDayOfWeek();
  date_day.innerHTML = getDate();
  location_text.innerHTML = weatherResponse.name;
  changeWeatherIcon(weatherResponse.weather[0].icon);
  weather_temp.innerHTML = `${weatherResponse.main.temp} ºC`;
  weather_desc.innerHTML = weatherResponse.weather[0].description;

  text_temp_max.innerHTML = `${weatherResponse.main.temp_max} ºC`;
  text_temp_min.innerHTML = `${weatherResponse.main.temp_min} ºC`;
  text_humidity.innerHTML = `${weatherResponse.main.humidity} %`;
  text_wind.innerHTML = `${weatherResponse.wind.speed} m/s`;
  input.value = ``;
};

export const clearInteface = (): void => {
  day.innerHTML = "---";
  date_day.innerHTML = "--";
  location_text.innerHTML = "-";
  WeatherIconPng.src = `f1ad1bc1c2e0e735.png`;
  weather_temp.innerHTML = `--`;
  weather_desc.innerHTML = "-";

  text_temp_max.innerHTML = `-- ºC`;
  text_temp_min.innerHTML = `-- ºC`;
  text_humidity.innerHTML = `-- %`;
  text_wind.innerHTML = `-- m/s`;
  input.value = ``;
};

// TODO: Get the city from the input element
export function getCity(): string {
  const input: HTMLInputElement = document.getElementById(
    "weather-location-input"
  ) as HTMLInputElement;
  const city = input.value;
  if (city !== null) {
    return city!;
  }
  return "";
}

function getDayOfWeek(): string {
  let day = new Date();
  return DayOfWeek[day.getDay()];
}

function getDate(): string {
  let date = new Date();
  return date.toLocaleDateString("es-ES");
}

function changeWeatherIcon(weatherImageRef: string) {
  const weatherMap = [weatherImageRef];
  validateImage(weatherMap);
  const mappedWeather =
    weatherMap.map((weather) => WeatherIcon[weather])[0] ?? WeatherIcon["01d"];
  if (typeof mappedWeather[0] === "string") {
    if (WeatherIconPng)
      (WeatherIconPng as HTMLImageElement).src = mappedWeather;
  }
}

function validateImage(values: string[]): asserts values is WeatherIcontype[] {
  if (!values.every(isValidImage)) {
    throw Error("invalid image");
  }
}

function isValidImage(value: string): value is WeatherIcontype {
  return value in WeatherIcon;
}

export function activeLoader(active: boolean) {
  loader.style.visibility = active ? "visible" : "hidden";
}
