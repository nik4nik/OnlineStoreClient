import {useContext, useState} from 'react'
import {Button, Col, Dropdown, Form, Modal, Row} from 'react-bootstrap'
import {observer} from 'mobx-react-lite'
import {Context} from '../../index'
import {create, fetchTypes} from '../../http/productAPI'

const CreateProduct = observer(({onHide, show, update}) => {
	const
		{product} = useContext(Context),
		[file, setFile] = useState(null),
		[info, setInfo] = useState([]),
		[name, setName] = useState(''),
		[price, setPrice] = useState(), // если начальное значение 0, неудобно вводить значение
		[lastUpdate, setLastUpdate] = useState(-1)

	if (show && lastUpdate !== update) {
		fetchTypes('type').then(data => product.setTypes(data))
		fetchTypes('brand').then(data => product.setBrands(data))
		setLastUpdate(update)
	}

	const addInfo = () => {
		setInfo([...info, {title: '', description: '', number: Date.now()}])
	}

	const removeInfo = number => {
		setInfo(info.filter(i => i.number !== number))
	}

	const changeInfo = (key, value, number) => {
		setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
	}

	const selectFile = e => {
		setFile(e.target.files[0])
	}

	const addProduct = () => {
		const formData = new FormData()
		Object.entries({
			name,
			price,
			img:	 file,
			brandId: product.selectedBrand.id,
			typeId:	 product.selectedType.id,
			info:	 JSON.stringify(info)
		}).forEach(([key, value]) => {
			formData.append(key, value)
		})
		create('product', formData).then(data => onHide())
	}

	return <Modal
			show={show}
			onHide={onHide}
			centered
		>
			<Modal.Header closeButton>
				<Modal.Title id='contained-modal-title-vcenter'>
					Добавить устройство
				</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Dropdown className='mt-2 mb-2'>
						<Dropdown.Toggle>{product.selectedType.name || 'Выберите тип'}</Dropdown.Toggle>
						<Dropdown.Menu style={{ margin: 0 }}>
							{product.types.map(type =>
								<Dropdown.Item
									onClick={() => product.setSelectedType(type)}
									key={type.id}
								>
									{type.name}
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Dropdown className='mt-2 mb-2'>
						<Dropdown.Toggle>{product.selectedBrand.name || 'Выберите бренд'}</Dropdown.Toggle>
						<Dropdown.Menu style={{ margin: 0 }}>
							{product.brands.map(brand =>
								<Dropdown.Item
									onClick={() => product.setSelectedBrand(brand)}
									key={brand.id}
								>
									{brand.name}
								</Dropdown.Item>
							)}
						</Dropdown.Menu>
					</Dropdown>
					<Form.Control
						value={name}
						onChange={e => setName(e.target.value)}
						className='mt-3'
						placeholder='Введите название товара'
					/>
					<div className='d-flex align-items-center'>Стоимость:
						<Form.Control
							value={price}
							onChange={e => setPrice(Number(e.target.value))}
							className='mt-3'
							placeholder='Введите стоимость товара'
							type='number'
						/>
					</div>
					<Form.Control
						className='mt-3'
						type='file'
						onChange={selectFile}
					/>
					<hr/>
					<Button
						variant={'outline-dark'}
						onClick={addInfo}
					>
						Добавить новое свойство
					</Button>
					{info.map(i =>
						<Row className='mt-4' key={i.number}>
							<Col md={4}>
								<Form.Control
									value={i.title}
									onChange={e => changeInfo('title', e.target.value, i.number)}
									placeholder='Введите название свойства'
								/>
							</Col>
							<Col md={4}>
								<Form.Control
									value={i.description}
									onChange={e => changeInfo('description', e.target.value, i.number)}
									placeholder='Введите описание свойства'
								/>
							</Col>
							<Col md={4}>
								<Button
									onClick={() => removeInfo(i.number)}
									variant={'outline-danger'}
								>
									Удалить
								</Button>
							</Col>
						</Row>
					)}
				</Form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
				<Button variant='outline-success' onClick={addProduct}>Добавить</Button>
			</Modal.Footer>
		</Modal>
})

export default CreateProduct