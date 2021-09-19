import React, { useContext, useState } from 'react';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { PopupContext } from '../../../contexts/PopupContext';
import { login } from '../../../services/authService';
import { timer } from '../../../utils/utils';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import './Login.scss';

const Login = () => {
	const { setPopup } = useContext(PopupContext);
	const { setLoading } = useContext(LoadingContext);
	const [username, setUsername] = useState<string>('');
	const [usernameErr, setUsernameErr] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordErr, setPasswordErr] = useState<string>('');
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
	const resetForm: any = {
		'username': () => setUsername(''),
		'password': () => setPassword(''),
		'email': () => setEmail('')
	}
	const signIn = async () => {
		if (!username || !password) {
			if (!username) setUsernameErr('Necessário inserir email!');
			if (!password) setPasswordErr('Necessário inserir uma senha!');
			await timer(2000);
			setUsernameErr('');
			setPasswordErr('');
			return;
		}
		setLoading(true);
		const res = await login(username, password).catch(err => console.log(err));
		if (res) {
			console.log(res);
		}
		setPopup('');
		setLoading(false);
	}
	const register = async () => {
		['username', 'password', 'email'].forEach(item => resetForm[item]());
	}

	const buttonFunctions: any = {
		'login': () => signIn(),
		'register': () => register(),
		'remember': () => console.log('remember')
	}

	const renderInputComponents = () => {
		if (mode === 'login' || mode === 'register') {
			return <div>
				<div><Input placeholder={'Username'} value={username} setValue={setUsername} type={'text'} className={'darkInput'} err={usernameErr} /></div>
				{
					mode === 'register' ?
						<div><Input placeholder={'Email'} value={email} setValue={setEmail} type={'text'} className={'darkInput'} /></div>
						: null
				}
				<div><Input placeholder={'Password'} value={password} setValue={setPassword} type={'password'} className={'darkInput'} err={passwordErr} /></div>
			</div>
		}
		return <div><Input placeholder={'Email'} value={email} setValue={setEmail} type={'text'} className={'darkInput'} /></div>
	}

	const execButtonFunctions = () => buttonFunctions[mode]();

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
