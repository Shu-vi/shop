import {makeAutoObservable} from "mobx";


export default class BasketStore {

    constructor() {
        this._basketContent = [];
        makeAutoObservable(this);
    }

    setBasketContent(basketContent) {
        this._basketContent = basketContent;
    }

    get basketContent() {
        return this._basketContent;
    }

}