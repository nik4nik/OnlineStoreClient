import {makeAutoObservable} from "mobx"

export default class MapStore {
	constructor() {
		this._latlng = ''
		makeAutoObservable(this)
	}
	setLatlng(point)		{ this._latlng = point }
	get latlng()			{ return this._latlng }
}