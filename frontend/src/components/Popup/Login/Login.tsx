import React, { useContext, useState } from 'react';
import PopupContext from '../../../contexts/PopupContext';
import Input from '../../Input/Input';
import './Login.scss';

const Login = () => {
	const { setPopup } = useContext(PopupContext);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	return (
		<div className={'login'} >
			<div><i onClick={() => setPopup('')} className={"fas fa-times"}></i></div>
			<div>Faça login na sua conta</div>
			<div>
				<div><Input placeholder={'Username'} value={username} type={'text'} className={'dark'} /></div>
				<div><Input placeholder={'Password'} value={password} type={'text'} className={'dark'} /></div>
			</div>
			<button>Entrar</button>
			<button>Registrar uma nova conta</button>
			<div>Perdeu sua senha?</div>
		</div>
	)
}

export default Login
