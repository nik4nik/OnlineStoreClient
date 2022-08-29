import {useContext} from 'react'
import {observer} from 'mobx-react-lite'
import {Card, Row, ListGroup} from 'react-bootstrap'
import {Context} from '../index'

export const TypeBar = observer(() => {
	const {product/*, user*/} = useContext(Context)

	return <ListGroup>
		{product.types.map(type =>
			<ListGroup.Item
				active={type.id === product.selectedType.id}
			/* If the condition is:
				Users can order products only from one shop (for example, if the user chooses
				McDonald's. Then you need to disable other shops.
			disabled={user.IsShopChoosen} */
				key={type.id}
				onClick={() => product.setSelectedType(type)}
				style={{cursor: 'pointer'}}
			>{type.name}
			</ListGroup.Item>
		)}
	</ListGroup>
})

export const BrandBar = observer(() => {
	const {product} = useContext(Context)

	return <Row>
		{product.brands.map(brand =>
			<Card
				border={brand.id === product.selectedBrand.id ? 'danger' : 'light'}
				className='p-3'
				key={brand.id}
				onClick={() => product.setSelectedBrand(brand)}
				style={{cursor: 'pointer'}}
			>{brand.name}
			</Card>
		)}
	</Row>
})