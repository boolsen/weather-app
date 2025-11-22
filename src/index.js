import {WeatherHandler,WeatherData,DayWeather} from "./Weather.js";
import { DOMhandler } from "./DOMhandler.js";

class Controller {
    constructor() {
        this.weatherHandler = new WeatherHandler();
        this.DOMhandler = new DOMhandler();
        document.querySelector('#search-btn').addEventListener("click",(event) => {
            const searchText = document.querySelector('#location-search').value;
            this.weatherHandler.getDataForLocation(searchText);
            this.DOMhandler.drawToDom(this.weatherHandler.gatheredWeatherData[0]);
            
        })
    }

    drawForecastsToDom() {
        const data = this.weatherHandler.gatheredWeatherData;
        console.log(data);

        for (const locationName in data) {
            if (Object.prototype.hasOwnProperty.call(data, locationName)) {
                const location = data[locationName];
                this.DOMhandler.drawToDom(location);
            }
        }
    }
}

const controller = new Controller();
async function testWeather() {

  // Wait for first async call
  await controller.weatherHandler.getDataForLocation('bergen', 'metric');

  // Wait for second async call
  await controller.weatherHandler.getDataForLocation('cape verde', 'metric');

  // Run final function after both are complete
  console.log("drawwing to DOM");
  controller.drawForecastsToDom();
}

//testWeather();