import {makeAutoObservable} from "mobx";

export default class RateStore {
    constructor() {
        this._rate = {};
        makeAutoObservable(this);
    }

    setRate(rate) {
        this._rate = rate;
    }

    get rate() {
        return this._rate;
    }
}