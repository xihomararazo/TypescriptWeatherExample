// Style import
import "./styles/main.scss";

// Import the API request method
import {
  buttonClick,
  getCity,
  updateInteface,
  clearInteface,activeLoader
} from "./dom-manipulation/domManipulation";
import { getWeatherApi } from "./networking/weather";
import { WeatherResponse, ErrorWeatherResponse } from "./model/weatherResponse";

// Create an async function to call the API method
type WeatherResponseOrError = WeatherResponse | ErrorWeatherResponse;

function isWeatherResponse(
  obj: WeatherResponseOrError
): obj is WeatherResponse {
  return (obj as WeatherResponse).dt !== undefined;
}

export const getWeather = async () => {
  
  try {
    if (buttonClick) buttonClick.disabled = true;
    
    let city = await getCity();

    if (city !== "") {
      console.log(city);
      activeLoader(true);
      const res: WeatherResponse | ErrorWeatherResponse = await getWeatherApi(
        city
      );
      //console.log(res);
      if (isWeatherResponse(res)) {
        console.log(res);
        updateInteface(res);
      } else {
        throw new SyntaxError(`Error, no se encontro la ciudad`);
      }
    } else {
      throw new SyntaxError(`Error, el campo de ciudad es vacio`);
    }
  } catch (err) {
    clearInteface();
    if (err instanceof SyntaxError) {
      //console.log(`Syntax Error: ` + err.message);
      alert(err.message);
    }
  } finally {
    if (buttonClick) buttonClick.disabled = false;
    activeLoader(false);
  }
};

// Add an event listener to the button
if (buttonClick) buttonClick.addEventListener("click", getWeather);
