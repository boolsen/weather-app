class DOMhandler {
    constructor(){
        this.forecastDiv = document.querySelector('.container');
    }

    createLocationForecastElement(locationData){
        const locationDiv = document.createElement('div');
        locationDiv.classList.add('location');
        this.forecastDiv.append(locationDiv);

    }
}

export {DOMhandler};