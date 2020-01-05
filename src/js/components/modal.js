import BaseComponent from './base-component';
import {render, unrender} from "./utils";
const header = document.querySelector(`.header`);

export default class Modal extends BaseComponent {
    constructor(data) {
        super();
        this.data = data;
        this._init();
    }

    setData(data) {
        debugger
        this.data = data;
    }

    _init() {
        const closeButton = this.getElement().querySelector(`.close`);
        closeButton.addEventListener(`click`, () => {
            unrender(this.getElement())
        })
    }

    static getDate(timeStamp) {
        return new Date(timeStamp).toLocaleDateString()
    }

    getTemplate() {
       return `<div class="modal-wrap">
<div class="modal">
<div class="close"></div>
<div class="picture-wrap">
<img src="${this.data.url}" alt="Big-photo">
${this.data.comments.length ? `
            ${this.data.comments.map((comment) => `<div class="comments"><p class="date">${Modal.getDate(comment.date)}</p>
            <p class="comment">${comment.text}</p></div>`)}
` : ``}
</div>  
<form action="#" class="form" method="post">
            <input type="text" name="Name" placeholder="Ваше имя">
            <input type="text" name="Comment" placeholder="Ваш комментарий">
            <button type="submit" class="modal-button">Оставить комментарий</button>
            </form>
</div>
</div>`
    }
}
