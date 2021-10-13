import React, { SyntheticEvent, useContext, useState } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import { LoadingContext } from '../../../contexts/LoadingContext';
import { PopupContext } from '../../../contexts/PopupContext';
import { login, register } from '../../../services/authService';
import { timer } from '../../../utils/utils';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import './Login.scss';

const Login = () => {
	const { setPopup } = useContext(PopupContext);
	const { setLoading } = useContext(LoadingContext);
	const { setAuth } = useContext(AuthContext);
	const [username, setUsername] = useState<string>('');
	const [usernameErr, setUsernameErr] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordErr, setPasswordErr] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [emailErr, setEmailErr] = useState<string>('');
	const [mode, setMode] = useState<string>('login');
	const resetFormVariables = ['username', 'password', 'email', 'usernameErr', 'passwordErr', 'emailErr'];
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
		'email': () => setEmail(''),
		'usernameErr': () => setUsernameErr(''),
		'passwordErr': () => setPasswordErr(''),
		'emailErr': () => setEmailErr(''),
	}

	const verifyInputsVariables = async (register?: boolean): Promise<boolean> => {
		if (!username || !password) {
			if (!username) setUsernameErr('Necessário inserir um usuário!');
			if (!password) setPasswordErr('Necessário inserir uma senha!');
			// if (register && !email) setEmailErr('Necessário inserir um email!');
			await timer(2000);
			resetFormVariables.forEach((item: string) => resetForm[item]());
			return true;
		}
		return false;
	}

	const showResponseMsg = ({ message }: { message: string }) => {
		const responses: { [key: string]: Function } = {
			'Incorrect password': () => setPasswordErr('Senha incorreta'),
			'Incorrect username': () => setUsernameErr('Usuário incorreto'),
			'Incorrect email': () => setEmailErr('Email incorreto'),
			'User already exists': () => setUsernameErr('Usuário já cadastrado')
		};
		setLoading(false);
		if (Object.keys(responses).includes(message)) return responses[message];
	}

	const signIn = async () => {
		if (await verifyInputsVariables()) return;
		setLoading(true);
		const loginRequest = await login(username, password).catch(err => err);
		if (loginRequest.response) {
			showResponseMsg(loginRequest.response.data);
			return;
		}
		const { data } = loginRequest.data;
		if (data) {
			setAuth(data);
			setPopup('');
			setLoading(false);
		}
	}
	const signUp = async () => {
		if (await verifyInputsVariables(true)) return;
		setLoading(true);
		const registerRequest = await register(username, password).catch(err => err);
		if (registerRequest.response) {
			showResponseMsg(registerRequest.response.data);
			return;
		}
		changeMode('login');
		setLoading(false);
	}

	const buttonFunctions: any = {
		'login': () => signIn(),
		'register': () => signUp(),
		'remember': () => console.log('remember')
	}

	const renderInputComponents = () => {
		if (mode === 'login' || mode === 'register') {
			return <div>
				<div><Input placeholder={'Username'} value={username} setValue={setUsername} type={'text'} className={'darkInput'} err={usernameErr} /></div>
				{
					mode === 'register' ?
						<div><Input placeholder={'Email'} value={email} setValue={setEmail} type={'text'} className={'darkInput'} err={emailErr} /></div>
						: null
				}
				<div><Input placeholder={'Password'} value={password} setValue={setPassword} type={'password'} className={'darkInput'} err={passwordErr} /></div>
			</div>
		}
		return <div><Input placeholder={'Email'} value={email} setValue={setEmail} type={'text'} className={'darkInput'} /></div>
	}

	const execButtonFunctions = () => buttonFunctions[mode]();

	const changeMode = (mode: string) => {
		resetFormVariables.forEach(item => resetForm[item]());
		setMode(mode);
	}

	const sendRequest = (e: SyntheticEvent) => {
		e.preventDefault();
		execButtonFunctions();
	}

	return (
		<form onSubmit={sendRequest} className={'login'} >
			<div><i onClick={() => setPopup('')} className={"fas fa-times"}></i></div>
			<div>{titleText[mode]}</div>
			{renderInputComponents()}
			<div><Button text={buttonText[mode]} className={'purpleButton'} /></div>
			<div>
				{mode === 'register' || mode === 'remember' ? <div onClick={() => changeMode('login')} >Entrar</div> : null}
				{mode === 'login' ? <div onClick={() => changeMode('register')} >Registrar</div> : null}
				<div onClick={() => changeMode('remember')} >Perdeu sua senha?</div>
			</div>
		</form>
	)
}

export default Login
