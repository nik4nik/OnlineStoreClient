import './icons.css'
import {FaTrash} from 'react-icons/fa'
import {Card, Form, Image} from 'react-bootstrap'

export default function OrderedProductCard(product, changeQuantity, deletionProcessing) {
	return <Card
		key={product.id}
		className='d-flex flex-row h-50 m-1 p-1 pb-3'
	>
		<Image
			height={130}
			width={280}
			className='border d-flex rounded mr-2'
			src={process.env.REACT_APP_API_URL + product.img}
		/>
		<div className='d-flex flex-column flex-grow-1'>
			<div className='
				d-flex flex-column
				flex-grow-1
				justify-content-center
				align-items-center
			'>
				<b>{product.name}</b>
				<span>Price: {product.price}</span>
			</div>
			{changeQuantity &&
				<div className='d-flex'>
					<Form.Control
						id={product.id}
						value={product.quantity}
						min={0}
						onChange={changeQuantity}
						type='number'
					/>
					<FaTrash
						className='delete-icon icon-trash icon-turn ml-1'
						onClick={() => deletionProcessing(product.id)}
					/>
				</div>
			}
		</div>
	</Card>
}