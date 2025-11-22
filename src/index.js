import {WeatherHandler,WeatherData,DayWeather} from "./Weather.js";
import { DOMhandler } from "./DOMhandler.js";

class Controller {
    constructor() {
        this.weatherHandler = new WeatherHandler();
        this.DOMhandler = new DOMhandler();
        document.querySelector('#search-btn').addEventListener("click", async (event) => {
            event.preventDefault();
            this.DOMhandler.resetForecastDiv();
            const searchInput = document.querySelector('#location-search');
            if (!searchInput) {
                return;
            }
            const searchText = searchInput.value; 
            if (!searchText) {
                return;
            }
            console.log("running request");
            const locationWeather = await this.weatherHandler.getDataForLocation(searchText);
            console.log("request finished");
            this.DOMhandler.drawToDom(locationWeather);
            
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
/* async function testWeather() {

  // Wait for first async call
  await controller.weatherHandler.getDataForLocation('bergen', 'metric');

  // Wait for second async call
  await controller.weatherHandler.getDataForLocation('cape verde', 'metric');

  // Run final function after both are complete
  console.log("drawwing to DOM");
  controller.drawForecastsToDom();
} */

//testWeather();