import {useContext, useEffect, useState} from 'react'
import {BrowserRouter} from 'react-router-dom'
import {Spinner}	from 'react-bootstrap'
import {observer}	from 'mobx-react-lite'
import AppRouter	from './components/AppRouter'
import NavBar		from './components/NavBar'
import {Context}	from './index'
import {check}		from './http/userAPI'

const App = observer(() => {

	const {user, product} = useContext(Context)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (localStorage.getItem`token`)
			check().then(data => {
				user.setUser(data)
				user.setIsAuth(true)
				const basket = localStorage.getItem('basket')
				if (basket)
					product.setBaskets(JSON.parse(basket))
			})
		setLoading(false)
	// eslint-disable-next-line
	}, [])

	return loading ? <Spinner animation={'grow'}/> :
		<BrowserRouter>
			<NavBar/>
			<AppRouter/>
		</BrowserRouter>
})

export default App