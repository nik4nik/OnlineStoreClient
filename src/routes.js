import * as r from './utils/consts'
import Admin from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import Orders from './pages/AllClientOrders'
import ProductPage from './pages/ProductPage'
import Shop from './pages/Shop'

export const
	authRoutes = [
		{ path: r.ADMIN_ROUTE,	Component: Admin },
		{ path: r.HISTORY_ROUTE, Component: Orders }
],
	publicRoutes = [
		{ path: r.BASKET_ROUTE,	Component: Basket },
		{ path: r.PRODUCT_ROUTE + ':id', Component: ProductPage },
		{ path: r.LOGIN_ROUTE,	Component: Auth },
		{ path: r.SHOP_ROUTE,	Component: Shop },
		{ path: r.SIGNIN_ROUTE,	Component: Auth }
]