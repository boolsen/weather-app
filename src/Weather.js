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
        //this.weatherData.push(new WeatherData(weatherObject));
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
                const precipitation = dayData["prec"];
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
    constructor(date,temp,humidity,precipitation,cloudCover) {
        this.temp = temp;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.date = date;
        this.cloudCover = cloudCover;
        this.element = this.createElement();
    }

    createElement() {
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        return dayDiv;
    }
}

export {WeatherHandler,WeatherData,DayWeather}