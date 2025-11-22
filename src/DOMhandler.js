class DOMhandler {
    constructor(){
        this.forecastDiv = document.querySelector('.container');
    }

    resetForecastDiv() {
        this.forecastDiv.innerHTML = "";
    }

    drawToDom(location){
        this.forecastDiv.append(location.element);
    }
}

export {DOMhandler};