import {$authHost, $host} from './index'
import jwt_decode from 'jwt-decode'
import {LOGIN_ROUTE, SIGNIN_ROUTE} from '../utils/consts'

const gen = ({data}) => {
	localStorage.setItem('token', data.token)
	return jwt_decode(data.token)
}

export const
	signin = async (email, password) =>
		gen(await $host.post('api/user' + SIGNIN_ROUTE, {email, password, role:'ADMIN'})),

	login = async (email, password) =>
		gen(await $host.post('api/user' + LOGIN_ROUTE, {email, password})),

	check = async () =>
		gen(await $authHost.get('api/user/auth')),

	fetchUserInfo = async (id) => (await $host.get('api/user/' + id)).data