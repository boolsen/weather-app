class DOMhandler {
    constructor(){
        this.forecastDiv = document.querySelector('.container');
    }

    drawToDom(location){
        this.forecastDiv.append(location.element);
    }
}

export {DOMhandler};