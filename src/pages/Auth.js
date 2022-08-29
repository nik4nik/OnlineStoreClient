import React, {useContext, useState} from 'react'
import {observer} from 'mobx-react-lite'
import {Button, Card, Container, Form, Row} from 'react-bootstrap'
import {NavLink, useLocation, useNavigate} from 'react-router-dom'
import {LOGIN_ROUTE, SIGNIN_ROUTE, SHOP_ROUTE} from '../utils/consts'
import {login, signin} from '../http/userAPI'
import {Context} from '../index'

const Auth = observer(() => {
	const [email, setEmail] = useState('admin@ya.ru'), // значения подставлены для удобства отладки
		[password, setPassword] = useState('1'), 
		location = useLocation(),
		isLogin = location.pathname === LOGIN_ROUTE,
		navigate = useNavigate(),
		{user} = useContext(Context),

	click = async () => {
		try {
			const data = await (isLogin ? login: signin)(email, password)
			user.setUser(data)
			user.setIsAuth(true)
			navigate(SHOP_ROUTE)
		} catch (e) {
			alert(e.response.data.message)
		}
	}

	return <Container
		className='d-flex justify-content-center align-items-center'
		style={{height: window.innerHeight / 2}} 
	>
		<Card className='p-5'>
			<h2 className='m-auto'>{isLogin? 'Авторизация':'Регистрация'}</h2>
			<Form className='d-flex flex-column'>
				<Form.Control
					className='mt-3' placeholder='Введите ваш email...' value={email} onChange={e => setEmail(e.target.value)}
				/>
				<Form.Control type='password'
					className='mt-3' placeholder='Введите пароль...' value={password} onChange={e => setPassword(e.target.value)}
				/>
				<Row className='align-items-center d-flex justify-content-between mt-2 p-3' style={{width: 360}}>
					{isLogin ?
						<div> Нет аккаунта? <NavLink to={SIGNIN_ROUTE}>Зарегистрируйтесь!</NavLink></div> :
						<div> Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink></div>
					}
					<Button className='ml-2'
						variant={'outline-success'}
						onClick={click}
					>
						{isLogin ? 'Войти': 'Регистрация'}
					</Button>
				</Row>
			</Form>
		</Card>
	</Container>
})

export default Auth