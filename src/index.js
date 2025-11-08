import {WeatherHandler,WeatherData,DayWeather} from "./Weather.js";
function test() {
    return "test";
}
window.handler = new WeatherHandler();
window.handler.getDataForLocation('bergen','metric');
console.log("object:",window.handler);