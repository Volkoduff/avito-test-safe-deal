import BaseComponent from './base-component';

export default class Comment extends BaseComponent {
    constructor({date, comment}) {
        super();
        this.date = date;
        this.comment = comment;
    }

    getTemplate() {
        return `<div class="comment">
    <p class="date">${new Date(this.date).toLocaleDateString()}</p>
    <p class="comment-text">${this.comment}</p>
</div>`
    }
}
