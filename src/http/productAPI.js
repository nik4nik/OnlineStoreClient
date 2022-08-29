import {$authHost, $host} from './index'

export const create			= async (path, item) => (await $authHost.post('api/' + path, item)).data

export const createOrder	= async (path, orderInfo) => create(path, orderInfo) // returns basket

export const selectOrders	= async (selection) => (await $host.get('api/product', selection)).data
	
export const fetchTypes		= async (type) => (await $host.get('api/' + type)).data.sort((a, b) => a.name.localeCompare(b.name))

export const fetchProducts	= async (typeId, brandId, page, limit = 5) => (await $host.get('api/product',
	{ params: { typeId, brandId, page, limit } })).data

export const fetchOneProduct = async (id) => (await $host.get('api/product/' + id)).data

export const fetchOrderInfo = async (id) => (await $host.get('api/order/' + id)).data

export const getBasket		= async () => (await $authHost.get('api/basket')).data

export const delFromBasket	= async (id) => (await $authHost.delete('api/basket/' + id)).data