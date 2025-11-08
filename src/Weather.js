class WeatherHandler {
    async getDataForLocation(locationName, unitGroup) { // unitGroup: metric / us / uk
        if (unitGroup === undefined) {
            unitGroup = 'us';
        }
        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=${unitGroup}&key=ED6B3JRZXAHT6LQ248SYSWLW9&contentType=json`);
        const weatherObject = await weatherData.json();
        console.log(weatherObject);
        this.weatherData = new WeatherData(weatherObject);
    }

    logDataToConsole(data) {
        //console.log(data.json());
    }
}

class WeatherData {
    constructor(weatherData) {
        this.processTotalData(weatherData);
        this.dayDataArray = this.processDayData(weatherData);
        console.log(this);
    }

    processTotalData(object){
        this.longitude = object.longitude;
        this.latitude = object.latitude;
        this.locationName = object.address;
        this.description = object.description;
    }

    processDayData(object) {
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
                dayDataArray.push(dayWeather);                
            }
        }
        return dayDataArray;
    }
}

class DayWeather {
    constructor(date,temp,humidity,precipitation,cloudCover) {
        this.temp = temp;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.date = date;
        this.cloudCover = cloudCover;
    }
}

export {WeatherHandler,WeatherData,DayWeather}