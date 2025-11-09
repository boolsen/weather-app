import {WeatherHandler,WeatherData,DayWeather} from "./Weather.js";
import { DOMhandler } from "./DOMhandler.js";

class Controller {
    constructor() {
        this.weatherHandler = new WeatherHandler();
        this.DOMhandler = new DOMhandler();
    }

    drawForecastsToDom() {
        const data = this.weatherHandler.gatheredWeatherData;
        console.log("data",data);

        for (let i = 0; i < data.length; i++) {
            const locationData = data[i];
            console.log("test");
            this.DOMhandler.drawToDom(locationData);            
        }
    }
}

window.controller = new Controller();
controller.drawForecastsToDom();
console.log("object:",window.controller);