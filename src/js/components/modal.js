import BaseComponent from './base-component';
import {unrender} from "./utils";

export default class Modal extends BaseComponent {
    constructor() {
        super();
    }

    init(data) {
        this.data = data;
        const closeButton = this.getElement().querySelector(`.close`);
        closeButton.addEventListener(`click`, () => {
            unrender(this.getElement());
            this.removeElement();
        })
    }

    getTemplate() {
        return `<div class="modal-wrap">
<div class="modal">
<div class="close"></div>
<div class="picture-wrap">
<img src="${this.data.url}" alt="Big-photo">

${this.data.comments.length ? `
            ${this.data.comments.map((comment) => `<div class="comments"><div class="comment">
    <p class="date">${new Date(comment.date).toLocaleDateString()}</p>
    <p class="comment-text">${comment.text}</p>
</div></div>`)}
` : `<div class="comments">
        <p class="empty-comment">Ваш комментарий может быть первым...</p>
     </div>`}
</div>  
<form action="#" class="form" method="post">
            <input type="text" name="Name" placeholder="Ваше имя" required>
            <input type="text" name="Comment" placeholder="Ваш комментарий" required>
            <button type="submit" class="modal-button">Оставить комментарий</button>
            </form>
</div>
</div>`
    }
}
