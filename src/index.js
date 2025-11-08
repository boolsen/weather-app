class WeatherHandler {
    async getDataForLocation(locationName, unitGroup) { // unitGroup: metric / us / uk
        if (unitGroup === undefined) {
            unitGroup = 'us';
        }
        const weatherData = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${locationName}?unitGroup=${unitGroup}&key=ED6B3JRZXAHT6LQ248SYSWLW9&contentType=json`);
        //this.logDataToConsole(weatherData);
        const weatherObject = await weatherData.json();
        console.log(weatherObject);
        this.weatherData = new WeatherData(weatherObject.longitude, weatherObject.latitude, weatherObject.address, weatherObject.days);
    }

    logDataToConsole(data) {
        //console.log(data.json());
    }
}

class WeatherData {
    constructor(longitude,latitude,locationName,dayData) {
        this.longitude = longitude;
        this.latitude = latitude;
        this.locationName = locationName;
        this.dayDataArray = this.processDayData(dayData);
    }

    processDayData(object) {
        const daysData = object.days;
        console.log(daysData);
        const dayDataArray = [];
        for (const day in daysData) {
            if (Object.prototype.hasOwnProperty.call(daysData, day)) {
                const dayData = daysData[day];
                const temperature = dayData["temp"];
                const humidity = dayData["humidity"];
                const precipitation = dayData["prec"];
                const date = dayData["datetime"];
                const dayWeather = new DayWeather(date,temp,humidity,precipitation);
                dayDataArray.push(dayWeather);                
            }
        }
        console.log(dayDataArray);
    }
}

class DayWeather {
    constructor(date,temp,humidity,precipitation) {
        this.temp = temp;
        this.humidity = humidity;
        this.precipitation = precipitation;
        this.date = date;
    }
}

const handler = new WeatherHandler();