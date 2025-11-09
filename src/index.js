import {WeatherHandler,WeatherData,DayWeather} from "./Weather.js";
import { DOMhandler } from "./DOMhandler.js";

class Controller {
    constructor() {
        this.weatherHandler = new WeatherHandler();
        this.DOMhandler = new DOMhandler();
    }

    drawForecastsToDom() {
        const data = this.weatherHandler.weatherData;

        for (let i = 0; i < data.length; i++) {
            const locationData = data[i];
            this.DOMhandler.createLocationForecastElement(locationData);            
        }
    }
}

window.controller = new Controller();
console.log("object:",window.controller);