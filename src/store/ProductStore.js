import {makeAutoObservable} from "mobx"

export default class ProductStore {
	constructor() {
		this._baskets = []
		this._brands = []
		this._products = []
		this._limit = 3
		this._page = 1
		this._selectedBrand = {}
		this._selectedType = {}
		this._totalCount = 0
		this._types = []
		this._coord = {} // for the case, if types are shops, and every shop has address
		makeAutoObservable(this)
	}

	setBaskets(basket)		{ this._baskets = basket}
	setTypes(types)			{ this._types = types}
	setBrands(brands)		{ this._brands = brands}
	setLatlong(point)		{ this._coord = point}
	setProducts(products)	{ this._products = products}
	setPage(page)			{ this._page = page}
	setTotalCount(count)	{ this._totalCount = count}
	setSelectedType(type)	{
		this._page = 1
		this._selectedType = type
	}
	setSelectedBrand(brand) {
		this._page = 1
		this._selectedBrand = brand
	}

	get basket()		{return this._baskets}
	get types()			{return this._types}
	get brands()		{return this._brands}
	get coord()			{return this._coord}
	get products()		{return this._products}
	get selectedType()	{return this._selectedType}
	get selectedBrand() {return this._selectedBrand}
	get totalCount()	{return this._totalCount}
	get page()			{return this._page}
	get limit()			{return this._limit}
}