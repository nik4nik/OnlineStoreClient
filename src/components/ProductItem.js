import {useContext, useEffect, useState} from 'react'
import {Button, Card, Col, Image} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {PRODUCT_ROUTE} from '../utils/consts'
import {Context} from '../index'

export default function ProductItem({product}) {
	const navigate = useNavigate(),
		{product: {basket}, user} = useContext(Context),
		{id, img, name, price, rating} = product,
		[isAdded, setIsAdded] = useState(false),

	addToBasket = e => {
		e.stopPropagation()
		basket.push({...product, quantity:1})
		localStorage.setItem('basket', JSON.stringify(basket))
		setIsAdded(true)
		user.setIsShopChoosen(true)
		//alert(`The item ${name} has been added to your cart`)
	}

	useEffect(() => {
		if (!isAdded && basket.some(item => item.id === product.id))
			setIsAdded(true)
	// eslint-disable-next-line
	}, [])

	return <Col md={3} className='mt-3' onClick={() => {
			navigate(PRODUCT_ROUTE + id,
				{ state: {id, img, name, price, rating} })
		}}>
			<Card style={{backgroundColor: isAdded ? "tan": "white", border: '1px solid lightgray', width: 160, cursor: 'pointer'}}>
				<Image width={"100%"} height={150} src={process.env.REACT_APP_API_URL + product.img}/><br/>
				<div style={{width: '90%', margin: '0 auto', textalign: 'center'}}>{product.name}<br/>
					price: {product.price} hrn
				</div>
				<div className="d-flex align-items-center">
					<div>{product.rating}</div>
					<FaStar style={{color: 'orange'}}/>
				</div>
				<div className='d-flex justify-content-end'>
					<Button disabled={isAdded} variant={'outline-dark'} onClick={addToBasket}>
						{isAdded ? 'Already in the cart' : 'Add to card'}
					</Button>
				</div>
			</Card>
		</Col>
}