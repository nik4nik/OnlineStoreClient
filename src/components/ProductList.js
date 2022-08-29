import {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {Row} from 'react-bootstrap'
import ProductItem from './ProductItem'
import {Context} from '../index'

const ProductList = observer(() => {
	const {product} = useContext(Context)
	return <Row className='d-flex'>
		{product.products.map(dev =>
			<ProductItem key={dev.id} product={dev}/>
		)}
	</Row>
})

export default ProductList