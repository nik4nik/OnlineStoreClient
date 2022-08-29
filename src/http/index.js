import axios from 'axios'

const conf = {
	baseURL: process.env.REACT_APP_API_URL	// Пользовательская конфигурация
}

export const
	$host = axios.create(conf),		// Экземпляр axios для запросов без авторизации
	$authHost = axios.create(conf)	// Экземпляр каждому запросу которого будет подставляться header authorization с токеном

const authInterceptor = config => { // Принимает пользовательскую конфигурацию экземпляра axios
	// Заголовок авторизации: укажем токен, получаемый из localStorage по ключу token
	// token добавляется в localStorage при авторизации пользователя
	config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
	return config
}

// Добавим перехватчик запроса для экземпляра требующего авторизации
// в каждом запросе подставляет token в header authorization
$authHost.interceptors.request.use(authInterceptor)