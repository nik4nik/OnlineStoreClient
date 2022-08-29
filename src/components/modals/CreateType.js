import {useContext, useState} from 'react'
import {Button, Form, Modal} from 'react-bootstrap'
import {create} from '../../http/productAPI'
import {Context} from '../..'

const CreateType = ({notify, show, onHide, type, ru}) => {
	const {product} = useContext(Context)
	const [value, setValue] = useState``
	const [latitude, setLatitude] = useState()
	const [longtitude, setLongtitude] = useState(),

	addType = () => {
		create(type, {name: value}).then(data => {
			setValue``
			onHide()
			notify()
			console.log(value)
			product.coord[value] = [latitude, longtitude]
		})
	}

	return <Modal
			show={show}
			onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Добавить {ru}
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Form.Control
						value={value}
						onChange={e => setValue(e.target.value)}
						placeholder={`Введите название ${ru}а`}
					/>
					<div className='d-flex mt-2'>
						<Form.Label className='mt-2 pl-1'>Latitude:</Form.Label>
						<Form.Control
							value={latitude}
							onChange={e => setLatitude(latitude)}
							type='number'
						/>
						<Form.Label className='mt-2 pl-1'>Longtitude:</Form.Label>
						<Form.Control
							value={longtitude}
							onChange={e => setLongtitude(longtitude)}
							type='number'
						/>
					</div>
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
				<Button variant='outline-success' onClick={addType}>Добавить</Button>
			</Modal.Footer>
		</Modal>
}

export default CreateType