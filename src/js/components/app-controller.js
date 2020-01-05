import API from './api';
import Gallery from './gallery';
import Modal from './modal';
import Comment from './comment';
import {render, unrender} from "./utils";

const LOADING_TEXT = `Загрузка...`;
const END_POINT = `https://boiling-refuge-66454.herokuapp.com/images`;
const api = new API({endPoint: END_POINT});
const header = document.querySelector(`.header`);
const body = document.querySelector(`body`);
const modal = new Modal();

export default class appController {
    init() {
        this.gallary = new Gallery();
        this._renderLoadingText();
        api.getPhotos()
            .then((photos) => {
                this.gallary.init(photos);
            })
            .then(() => {
                this._unRenderLoadingText();
            })
            .then(() => this._modalRenderInit())
    }

    _modalRenderInit() {
        [...this.gallary.getElement().children]
            .forEach((el) => el.addEventListener(`click`, (evt) => this._onClickRender(evt)))
    }

    _onClickRender(evt) {
        const id = evt.target.id;
        api.getComments(id)
            .then((bigPhoto) => this._renderPhotoWithComments(bigPhoto, id));
    }

    _renderPhotoWithComments(data, id) {
        body.classList.add(`hidden-overflow`);
        modal.init(data);
        render(header, modal.getElement());
        this.form = modal.getElement().querySelector(`.form`);
        this.form.addEventListener(`submit`, (evt) => this._onSubmit(evt, id))
    }

    _onSubmit(evt, id) {
        evt.preventDefault();
        api.addNewComment(id, this._getFormData())
            .then(() => this._renderNewComment())
            .then(() => {
                this.form.reset();
            })
    }

    _renderNewComment() {
        const emptyComment = modal.getElement().querySelector(`.empty-comment`);
        if (emptyComment) {
            emptyComment.innerHTML = ``;
        }
        const comment = new Comment(this._getFormData());
        const comments = modal.getElement().querySelector(`.comments`);
        render(comments, comment.getElement())
    }

    _renderLoadingText() {
        this.loadingText = document.createElement(`div`);
        this.loadingText.classList.add(`loading`);
        this.loadingText.textContent = LOADING_TEXT;
        header.querySelector(`h1`).after(this.loadingText);
    }

    _unRenderLoadingText() {
        unrender(this.loadingText)
    }

    _getFormData() {
        let form = new FormData(modal.getElement().querySelector(`form`));
        const formData = {};
        formData.name = form.get(`Name`);
        formData.comment = form.get(`Comment`);
        formData.date = Date();
        return formData;
    }
}
