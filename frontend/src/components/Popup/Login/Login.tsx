import React, { useContext, useState } from 'react';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { PopupContext } from '../../../contexts/PopupContext';
import Input from '../../Input/Input';
import './Login.scss';

const Login = () => {
	const { setPopup } = useContext(PopupContext);
	const { setLoading } = useContext(LoadingContext);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const login = () => {
		setLoading(true);
		setTimeout(() => {
			setLoading(false);
		}, 2000)
	}

	return (
		<div className={'login'} >
			<div><i onClick={() => setPopup('')} className={"fas fa-times"}></i></div>
			<div>Faça login na sua conta</div>
			<div>
				<div><Input placeholder={'Username'} value={username} setValue={setUsername} type={'text'} className={'dark'} /></div>
				<div><Input placeholder={'Password'} value={password} setValue={setPassword} type={'text'} className={'dark'} /></div>
			</div>
			<button onClick={login} >Entrar</button>
			<button>Registrar uma nova conta</button>
			<div>Perdeu sua senha?</div>
		</div>
	)
}

export default Login
