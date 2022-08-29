import React, {useState} from 'react'
import {Button, Container} from 'react-bootstrap'
import CreateProduct from '../components/modals/CreateProduct'
import CreateType from '../components/modals/CreateType'

export default function Admin() {
	const [modals, setVisible] = useState({Brand:false, Type:false, Product:false}),
		[update, setUpdate] = useState(0),
		notify = () => setUpdate(update + 1)

	return <Container className='d-flex flex-column w-25'>
		{Object.keys(modals).map(e =>
			<Button
				key={e} className='mt-4 p-2'
				onClick={() => setVisible({...modals, [e]: true})}
			>Add {e}</Button>)
		}
		<CreateType	   show={modals.Brand}	 notify={notify} onHide={() => setVisible({...modals, Brand:false})} type={'brand'} ru={'бренд'}/>
		<CreateProduct show={modals.Product} update={update} onHide={() => setVisible({...modals, Product:false})}/>
		<CreateType	   show={modals.Type}	 notify={notify} onHide={() => setVisible({...modals, Type:false})}	 type={'type'} ru={'тип'}/>
	</Container>
}