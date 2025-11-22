class Icons {
    constructor(){
        this.createElements();
    }

    createElements(){
        const cloudString = `<svg class="feather feather-cloud cloud" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path vector-effect="non-scaling-stroke" d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"></path></svg>`;
        const sunString = `<svg class="feather feather-sun sun" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="yellow" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle  vector-effect="non-scaling-stroke" cx="12" cy="12" r="5"></circle><line vector-effect="non-scaling-stroke" x1="12" y1="1" x2="12" y2="3"></line><line  vector-effect="non-scaling-stroke" x1="12" y1="21" x2="12" y2="23"></line><line vector-effect="non-scaling-stroke" x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line vector-effect="non-scaling-stroke" x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line vector-effect="non-scaling-stroke" x1="1" y1="12" x2="3" y2="12"></line><line vector-effect="non-scaling-stroke" x1="21" y1="12" x2="23" y2="12"></line><line vector-effect="non-scaling-stroke" x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line vector-effect="non-scaling-stroke" x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        const rainCloudString = `<svg class="feather feather-cloud-rain cloud" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="grey" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line vector-effect="non-scaling-stroke" x1="16" y1="13" x2="16" y2="21"></line><line vector-effect="non-scaling-stroke" x1="8" y1="13" x2="8" y2="21"></line><line vector-effect="non-scaling-stroke" x1="12" y1="15" x2="12" y2="23"></line><path vector-effect="non-scaling-stroke" d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path></svg>`
        const parser = new DOMParser();

        this.icons = {
            cloud: parser.parseFromString(cloudString, "image/svg+xml").documentElement,
            sun: parser.parseFromString(sunString, "image/svg+xml").documentElement,
            rainCloud: parser.parseFromString(rainCloudString, "image/svg+xml").documentElement
        }
    }

    get(name) {
        const icon = this.icons[name];
        return icon ? icon.cloneNode(true) : null;
    }

    getCompoundIcon(precipitation,cloudCover) {
        const iconContainer = document.createElement('div');
        iconContainer.classList.add('icon-container');

        const precipitationGrade = Math.min(precipitation / 25, 1) * 100;
        const cloudCoverGrade = Math.min(cloudCover / 100, 1) * 100;
        let cloudEle;
        if (precipitationGrade > 50) {
            cloudEle = this.icons["rainCloud"].cloneNode(true);
        } else if (cloudCover > 20) {
            cloudEle = this.icons["cloud"].cloneNode(true);            
        }

        let sunEle;
        if (cloudCover < 90) {
            sunEle = this.icons["sun"].cloneNode(true);
        }

/*         cloudEle.style.bottom = 0;
        cloudEle.style.right = 0; */

        if (cloudEle) {
            cloudEle.style.width = Math.max(cloudCoverGrade - 30,0);
            cloudEle.style.height = Math.max(cloudCoverGrade  - 30,0);
            iconContainer.append(cloudEle);
        }
        if (sunEle) {
            iconContainer.append(sunEle);
        }

        return iconContainer;
    }
}

export {Icons};