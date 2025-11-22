import {Icons} from "./Icons.js";
class WeatherHandler {
    constructor(){
        this.gatheredWeatherData = {};
    }
    async getDataForLocation(locationName, unitGroup) { // unitGroup: metric / us / uk
        if (unitGroup === undefined) {
            unitGroup = 'metric';
        }
        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=${unitGroup}&key=ED6B3JRZXAHT6LQ248SYSWLW9&contentType=json`);
        const weatherObject = await weatherData.json();
        const locationWeather = new WeatherData(weatherObject);
        this.gatheredWeatherData[locationWeather.locationName] = locationWeather;
    }
}

class WeatherData {
    constructor(weatherData) {
        this.locationName = weatherData.address;
        this.longitude = weatherData.longitude;
        this.latitude = weatherData.latitude;
        this.description = weatherData.description;
        this.element = this.createElement();
        this.dayDataArray = this.processDaysData(weatherData);
    }

    processDaysData(object) {
        const daysData = object.days;
        const dayDataArray = [];
        for (const day in daysData) {
            if (Object.prototype.hasOwnProperty.call(daysData, day)) {
                const dayData = daysData[day];
                const temperature = dayData["temp"];
                const humidity = dayData["humidity"];
                const precipitation = dayData["precip"];
                console.log(dayData);
                const date = dayData["datetime"];
                const cloudCover = dayData["cloudcover"]
                const dayWeather = new DayWeather(date,temperature,humidity,precipitation,cloudCover);
                this.element.append(dayWeather.element);
                dayDataArray.push(dayWeather);                
            }
        }
        return dayDataArray;
    }

    createElement() {
        const locationDiv = document.createElement('div');
        locationDiv.classList.add('location');
        return locationDiv;
    }
}

class DayWeather {
    static icons = new Icons();
    constructor(date,temp,humidity,precipitation,cloudCover) {
        this.temp = temp;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.date = date;
        this.cloudCover = cloudCover;
        this.icons = DayWeather.icons;
        this.element = this.createElement();
        this.subElements = this.createSubElements();
        this.updateSubElements();
    }

    createElement() {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        return dayDiv;
    }

    createSubElements() {
        const dateEle = document.createElement('span');
        dateEle.classList.add('date-text');
        const iconsEle = document.createElement('div');
        iconsEle.classList.add('day-icon');
        const rainMeter = document.createElement('div');
        rainMeter.classList.add('rain-meter');
        const rainText = document.createElement('span');
        rainText.classList.add('rain-text');
        const temperatureText = document.createElement('span');
        temperatureText.classList.add('temperature-text');

        rainMeter.append(rainText);
        this.element.append(dateEle,iconsEle,rainMeter,temperatureText);
        return {dateEle,iconsEle,rainMeter,rainText,temperatureText: temperatureText};
    }

    updateSubElements() {
        this.subElements.dateEle.textContent = this.date;
        this.subElements.rainText.textContent = this.precipitation;
        this.subElements.temperatureText.textContent = this.temp + " deg C";
        this.subElements.rainText.textContent = this.precipitation;
        this.updateweatherIcon();
        this.updateRainMeter();
    }

    updateweatherIcon() {
        this.subElements.iconsEle.append(this.icons.getCompoundIcon(this.precipitation, this.cloudCover));
    }

    updateRainMeter() {
        this.subElements.rainMeter.style.setProperty('--fill', Math.min(100 * this.precipitation/25.1,80) + '%');
    }
}

export {WeatherHandler,WeatherData,DayWeather}