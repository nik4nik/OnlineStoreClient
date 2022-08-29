import {useContext} from 'react'
import {Routes, Route} from 'react-router-dom'
import {authRoutes, publicRoutes} from "../routes"
import {Context} from "../index"
import {observer} from "mobx-react-lite"

const getRoutes = pathes => pathes.map(({path, Component}) =>
	<Route key={path} path={path} element={<Component />} />),

AppRouter = observer(() => {
	const {user} = useContext(Context)
	return <Routes>
		{user.isAuth && getRoutes(authRoutes)}
		{getRoutes(publicRoutes)}
	</Routes>
})

export default AppRouter