import {$authHost} from './index'

export const fetchUserOrders = async ({email, phone}) =>
	(await $authHost.get('api/sql',
		{params: { email, phone }})).data