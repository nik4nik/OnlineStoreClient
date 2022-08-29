import React, {useContext, useEffect, useState} from 'react'
import {Card, Container, Form} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {fetchOrderInfo} from '../http/productAPI'
import {fetchUserInfo} from '../http/userAPI'
import OrderedProductCard from '../components/OrderedProductCard'
import {fetchUserOrders} from '../http/sqlAPI'
import {Context} from '..'

const Orders = observer(() => {
	const {user} = useContext(Context)
	const [info, setInfo] = useState({email:'', phone:''})
	const [orders, setOrders] = useState([])

	useEffect(() => {
		if (user.user.id > 1) {// logged in customer
			fetchUserInfo(user.user.id).then(userData => {
				fetchOrderInfo(userData.orderInfoId).then(orderInfo => {
					setInfo(orderInfo)
					if (orderInfo.email !== '' || orderInfo.phone !== '')
						fetchUserOrders(orderInfo).then(orders => {
							setOrders(orders)
						})
				})
			})
		}
	// eslint-disable-next-line
	}, [])

	const divTotal = ({total, key}) =>
		<div className='
			d-flex
			justify-content-center
			align-items-center
			flex-grow-1
			font-weight-bold'
			key={key}
		>
			Total price:{total}
		</div>

	const customerOrders = (count = 0) =>
		orders.reduce((acc, e, i, arr) => {
			count += e.price * e.quantity
			acc = acc.concat(OrderedProductCard(e))
			if (e.orderId !== arr[i + 1]?.orderId) {
				acc = acc.concat(divTotal({total:count, key:1e6 + e.id}))
				count = 0
			}
			return acc
		},[])

	return	(
		<Container className='border rounded d-flex flex-column'>
			<Card className='mt-3 align-items-center'>
				<Form.Group controlId='Email'>
					<Form.Label className='mt-2 pl-1'>Email</Form.Label>
					<Form.Control type='email' value={info.email} className='font-italic text-center mb-4'
					style={{width:400}}
					onChange={e => setInfo({...info, email:e.target.value})}/>
				</Form.Group>
				<Form.Group controlId='Phone'>
					<Form.Label className='mt-2 pl-1'>Phone</Form.Label>
					<Form.Control type='text' value={info.phone} className='font-italic text-center mb-4'
					style={{width:400}}
					onChange={e => setInfo({...info, phone:e.target.value})}/>
				</Form.Group>
			</Card>
			<div
				className='border rounded d-flex flex-row flex-wrap h-100 mt-1 mb-1 p-2'
				style={{overflowX:'hidden', overflowY:'scroll'}}
			>
				{customerOrders()}
			</div>
		</Container>
	)
})

export default Orders