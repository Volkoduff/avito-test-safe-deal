import BaseComponent from './base-component';
import {render} from "./utils";

const mainTitle = document.querySelector(`.header h1`);

export default class Gallery extends BaseComponent {
    constructor() {
        super();
    }

    init(photos) {
        this.photos = photos;
        render(mainTitle, this.getElement());
    }

    getTemplate() {
        return `<div class="gallery">${this.photos.map((photo) => `<img src="${photo.url}" id="${photo.id}" alt="Photo id№${photo.id}">`).join(``)}</div>`
    }
}
