class DOMhandler {
    constructor(){
        this.forecastDiv = document.querySelector('.container');
    }

    drawToDom(forecastData){
        forecastData.forEach(forecast => {
            this.forecastDiv.append(forecast.element);
        });
    }
}

export {DOMhandler};