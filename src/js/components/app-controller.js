import BaseComponent from './base-component';
import API from './api';
import Gallery from './gallery';
import {render} from "./utils";
import Modal from './modal';

const END_POINT = `https://boiling-refuge-66454.herokuapp.com/images`;
const api = new API({endPoint: END_POINT});
const header = document.querySelector(`.header`);
const body = document.querySelector(`body`);


export default class appController extends BaseComponent {
    constructor() {
        super();
    }

    init() {
        this.gallary = new Gallery();
        api.getPhotos()
            .then((photos) => {
                this.gallary.init(photos);
            })
            .then(() => this.modalRenderInit())
    }

    modalRenderInit() {
        [...this.gallary.getElement().children]
            .forEach((el) => el.addEventListener(`click`, (evt) => this.onClickRender(evt)))
    }

    onClickRender(evt) {
        const id = evt.target.id;
        api.getComments(id)
            .then((bigPhoto) => {
                body.classList.add(`hidden-overflow`);
                const modal = new Modal(bigPhoto);
                render(header, modal.getElement());
                modal.getElement().querySelector(`form`)
                    .addEventListener(`submit`, (evt) => this.onSubmit(evt))
            });
    }


    onSubmit(evt) {
        evt.preventDefault();
        let form = new FormData(modal.getElement().querySelector(`form`));
        const formData = {};
        formData.name = form.get(`Name`);
        formData.comment = form.get(`Comment`);
        formData.date = Date();
        console.log(formData);
        api.addNewComment(id, formData)
    }

}
