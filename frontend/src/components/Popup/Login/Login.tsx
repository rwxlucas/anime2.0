import React, { useContext, useState } from 'react';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { PopupContext } from '../../../contexts/PopupContext';
import { login } from '../../../services/authService';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import './Login.scss';

const Login = () => {
	const { setPopup } = useContext(PopupContext);
	const { setLoading } = useContext(LoadingContext);
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [mode, setMode] = useState<string>('login');
	const titleText: any = {
		'login': 'Faça login na sua conta',
		'register': 'Cadastre-se',
		'remember': 'Digite seu email para recuperar sua conta'
	}
	const buttonText: any = {
		'login': 'Entrar',
		'register': 'Registar',
		'remember': 'Enviar email'
	}
	const signIn = async () => {
		setLoading(true);
		const res = await login(username, password).catch(err => console.log(err));
		if (res) {
			console.log(res);
		}
		setPopup('');
		setLoading(false);
	}
	const renderInputComponents = () => {
		if (mode === 'login' || mode === 'register') {
			return <div>
				<div><Input placeholder={'Username'} value={username} setValue={setUsername} type={'text'} className={'darkInput'} /></div>
				{
					mode === 'register' ?
						<div><Input placeholder={'Email'} value={email} setValue={setEmail} type={'text'} className={'darkInput'} /></div>
						: null
				}
				<div><Input placeholder={'Password'} value={password} setValue={setPassword} type={'password'} className={'darkInput'} /></div>
			</div>
		}
		return <div><Input placeholder={'Email'} value={email} setValue={setEmail} type={'text'} className={'darkInput'} /></div>
	}

	const execButtonFunctions = () => {
		if (mode === 'login') signIn();
		if (mode === 'register') console.log('register');
		if (mode === 'remember') console.log('remember');
	}

	return (
		<div className={'login'} >
			<div><i onClick={() => setPopup('')} className={"fas fa-times"}></i></div>
			<div>{titleText[mode]}</div>
			{renderInputComponents()}
			<div><Button text={buttonText[mode]} className={'purpleButton'} exec={() => execButtonFunctions()} /></div>
			<div>
				{mode === 'register' || mode === 'remember' ? <div onClick={() => setMode('login')} >Entrar</div> : null}
				{mode === 'login' ? <div onClick={() => setMode('register')} >Registrar</div> : null}
				<div onClick={() => setMode('remember')} >Perdeu sua senha?</div>
			</div>
		</div>
	)
}

export default Login
