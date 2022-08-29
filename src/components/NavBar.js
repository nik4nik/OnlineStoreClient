import './icons.css'
import {useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import {observer} from 'mobx-react-lite'
import {Container, Nav, Navbar} from 'react-bootstrap'
import {AiOutlineLogin, AiOutlineLogout} from 'react-icons/ai'
import {FaChartPie, FaHistory, FaShoppingCart, FaTags, FaUserCog} from 'react-icons/fa'
import {Context} from '../index'
import * as r from '../utils/consts'

const NavBar = observer(() => {
	const {product, user} = useContext(Context)
	const navigate = useNavigate()
	const toBasket = () => product.basket.length && navigate(r.BASKET_ROUTE)
	const logOut = () => {
		user.setUser({})
		user.setIsAuth(false)
		localStorage.setItem('token', '')
		navigate(r.SHOP_ROUTE)
	}
	return <Navbar>
		<Container>
			<FaChartPie	className='icon-button' onClick={() => navigate(r.SHOP_ROUTE)}/>
			<Nav>
				{user.isAuth?
				<>	<FaShoppingCart	className='icon-button mr-3' onClick={toBasket}/>
					<FaHistory		className='icon-button mr-3' onClick={() => navigate(r.HISTORY_ROUTE)}/>
					<FaTags			className='icon-button mr-3' onClick={() => alert('This item is not implemented')}/>
					<FaUserCog		className='icon-admin icon-turn mr-3' onClick={() => navigate(r.ADMIN_ROUTE)}/>
					{user.user.email}
					<AiOutlineLogout className='icon-button'	 onClick={() => logOut()}/>
				</>:<>
					<FaShoppingCart	className='icon-button mr-3' onClick={toBasket}/>
					<AiOutlineLogin className='icon-button'		 onClick={() => navigate(r.LOGIN_ROUTE)}/>
				</>}
			</Nav>
		</Container>
	</Navbar>
})

export default NavBar