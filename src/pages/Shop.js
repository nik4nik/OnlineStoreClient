import React, {useContext, useEffect} from 'react'
import {Col, Row, Container} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {Context} from '../index'
import Pages from '../components/Pages'
import {TypeBar, BrandBar} from '../components/TypeBar'
import ProductList from '../components/ProductList'
import {fetchProducts, fetchTypes} from '../http/productAPI'

const Shop = observer(() => {
	const {product} = useContext(Context)

	useEffect(() => {
		fetchTypes('type').then(data => product.setTypes(data))
		fetchTypes('brand').then(data => product.setBrands(data))
		fetchProducts(null, null, 1, 3).then(data => {
			product.setProducts(data.rows)
			product.setTotalCount(data.count)
		})
	// eslint-disable-next-line
	}, [])

	useEffect(() => {
		fetchProducts(product.selectedType.id, product.selectedBrand.id, product.page, 2).then(data => {
			product.setProducts(data.rows)
			product.setTotalCount(data.count)
		})
	// eslint-disable-next-line
	}, [product.page, product.selectedType, product.selectedBrand,])

	return (
		<Container>
			<Row className='mt-2'>
				<Col md={3}>
					<TypeBar/>
				</Col>
				<Col md={9}>
					<BrandBar/>
					<ProductList/>
					<Pages/>
				</Col>
			</Row>
		</Container>
	)
})

export default Shop