import {useContext, useEffect, useState} from 'react'
import {Button, Card, Container, Form} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {useNavigate} from 'react-router-dom'
import {create, createOrder, fetchOrderInfo} from '../http/productAPI'
import {fetchUserInfo} from '../http/userAPI'
import LeafletMap from '../components/LeafletMap'
import OrderedProductCard from '../components/OrderedProductCard'
import {Context} from '..'
import {SHOP_ROUTE} from '../utils/consts'

const Basket = observer(() => {
	const {leaflet, product, user} = useContext(Context),
		[info, setInfo] = useState({address:'', email:'', name:'', phone:''}), 
		count = () => product.basket.reduce(
			(sum, item) => sum + item.price * item.quantity, 0),
		[total, setTotal] = useState(count),
		navigate = useNavigate(),

	changeQuantity = e => {
		product.setBaskets(product.basket.map(item =>
			item.id === +e.target.id ? {...item, quantity:e.target.value}: item))
		setTotal(count())
	},

	submitOrder = e => {
		e.preventDefault()
		const userId = user.user.id || 1 // розничный покупатель
		if (info.address === "" || info.phone.length < 9) {
			alert("Укажите адрес и телефон для доставки")
			return
		}
		createOrder('Order', {userId, ...info}).then(basket => {
			product.basket.forEach(e => create('basket', {basketId:basket.id, productId:e.id, quantity:`${e.quantity}`}))
			alert('Order is accepted')
			product.setBaskets([])
			setTotal(0)
			localStorage.setItem('basket', null)
			navigate(SHOP_ROUTE)
		})
	},

	deletionProcessing = productId => {
		product.setBaskets(product.basket.filter(e => e.id !== productId))
		localStorage.setItem('basket', JSON.stringify(product.basket))
		setTotal(count())
		if (product.basket.length === 0)
			user.setIsShopChoosen(false)
	}

	useEffect(() => {
		if (user.user.id > 1) // залогиненый покупатель
			fetchUserInfo(user.user.id).then(userData =>
				fetchOrderInfo(userData.orderInfoId).then(
					orderInfo => setInfo(orderInfo)))
	// eslint-disable-next-line
	}, [])

	return <Container className='d-flex'>
		<Form className='d-flex w-100' onSubmit={submitOrder}>
			<Card className='w-50 mt-1 pl-4 pr-4 pt-2'>
				<LeafletMap/>
				<Form.Group controlId='Name'>
					<Form.Label className='mt-2 pl-1'>Name</Form.Label>
					<Form.Control type='text' value={info.name} className='font-italic text-center mb-4' onChange={e =>
						setInfo({...info, name:e.target.value})}/>
				</Form.Group>
				<Form.Group controlId='Email'>
					<Form.Label className='mt-2 pl-1'>Email</Form.Label>
					<Form.Control type='email' value={info.email} className='font-italic text-center mb-4' onChange={e =>
						setInfo({...info, email:e.target.value})}/>
				</Form.Group>
				<Form.Group controlId='Phone'>
					<Form.Label className='mt-2 pl-1'>Phone</Form.Label>
					<Form.Control type='text' value={info.phone} className='font-italic text-center mb-4' onChange={e =>
						setInfo({...info, phone:e.target.value})}/>
				</Form.Group>
				<Form.Group controlId='Address'>
					<Form.Label className='mt-2 pl-1'>Address</Form.Label>
					<Form.Control type='text' value={leaflet.latlng} className='font-italic text-center mb-4' onChange={e => {
						setInfo({...info, address:e.target.value})
						leaflet.setLatlng(e.target.value)
					}}/>
				</Form.Group>
			</Card>
			<Card className='border-0 w-50'>
				<div className='border rounded h-50 m-1 p-1' style={{overflowX:'hidden', overflowY:'scroll'}}>
					{product.basket.map(product => OrderedProductCard(product, changeQuantity, deletionProcessing))}
				</div>
				<Container className='d-flex justify-content-end mt-auto'>
					<span className='align-items-center d-flex font-weight-bold mr-4'> Total price: {total}</span>
					<Button
						className='font-weight-bold' disabled={total === 0} variant={'outline-primary'} type='Submit'
					>Submit</Button>
				</Container>
			</Card>
		</Form>
	</Container>
})

export default Basket