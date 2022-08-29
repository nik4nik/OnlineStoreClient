import React, {useContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap"
import bigStar from '../assets/bigStar.png'
import {Context} from '../index'
import {fetchOneProduct} from "../http/productAPI"

// Данные товара беруться с клиента: useLocation(), со страницы с которой пришли сюда,
// характеристики товара и рейтинг берутся с сервера: fetchOneProduct(id)
export default function ProductPage() {
	const
		{product: productStore} = useContext(Context),
		{basket} = productStore,
		LProduct = useLocation().state,
		[isAdded, setIsAdded] = useState(false),
		[product, setProduct] = useState({info: []})

	useEffect(() => {
		fetchOneProduct(LProduct.id).then(data => setProduct(data))
		if (!isAdded && basket.some(item => item.id === LProduct.id))
			setIsAdded(true)
	// eslint-disable-next-line
	}, [])

	return <Container className="mt-3">
		<Row>
			<Col md={4}>
				{LProduct.img && <Image width={300} height={300} src={process.env.REACT_APP_API_URL + LProduct.img}/>}
			</Col>
			<Col md={4}>
				<div className="d-flex flex-column align-items-center">
					<h2>{LProduct.name}</h2>
					<div className="d-flex align-items-center justify-content-center"
						style={{background: `url(${bigStar}) no-repeat center center`, width:240, height: 240, backgroundSize: 'cover', fontSize:64}}
					>{product.rating}
					</div>
				</div>
			</Col>
			<Col md={4}>
				<Card className="d-flex flex-column align-items-center justify-content-around"
					style={{backgroundColor: isAdded ? "tan": "white", width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
				>
					<h3>От: {LProduct.price} hrn</h3>
					<Button disabled={isAdded} variant={"outline-dark"} onClick={e => {
						basket.push({...LProduct, quantity:1})
						localStorage.setItem('basket', JSON.stringify(basket))
						setIsAdded(true)
					}}>{isAdded ? 'Already in the cart' : 'Add to card'}</Button>
				</Card>
			</Col>
		</Row>
		<Row className="d-flex flex-column m-3">
			<h1>Характеристики</h1>
			{product.info.map((info, index) =>
				<Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
					{info.title}: {info.description}
				</Row>
			)}
		</Row>
	</Container>
}