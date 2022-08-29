import {makeAutoObservable} from "mobx"

export default class UserStore {
	constructor() {
		this._isAuth = false
		this._isShopChoosen = false
		this._user = {}
		makeAutoObservable(this)
	}

	setIsAuth(bool)			{ this._isAuth = bool }
	setIsShopChoosen(bool)	{ this._isShopChoosen = bool }
	setUser(user)			{ this._user = user }

	get isAuth()			{ return this._isAuth }
	get IsShopChoosen()		{ return this._isShopChoosen }
	get user()				{ return this._user }
}