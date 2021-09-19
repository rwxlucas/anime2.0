import React, { useEffect, useState } from 'react';
import { timer } from '../../utils/utils';
import './Input.scss';

interface IInput {
	value: string;
	setValue: Function;
	type: string;
	className?: string;
	placeholder?: string;
	err?: string;
}

const Input = ({ value, setValue, type, className, placeholder, err }: IInput) => {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [showErr, setShowErr] = useState<string>('');
	const showEye = () => {
		return type === 'password' ? <div className={'showEye'}>
			{!showPassword ? <i className="far fa-eye" onClick={() => setShowPassword(true)} ></i> : null}
			{showPassword ? <i className="far fa-eye-slash" onClick={() => setShowPassword(false)} ></i> : null}
		</div> : null
	}
	const typeConfig = (type: string) => {
		if (type === 'password') return showPassword ? 'text' : type;
		return type;
	}
	useEffect(() => {
		if (err) {
			setShowErr(err);
			timer(2000).then(() => {
				setShowErr('');
			});
		}
	}, [err])
	return (
		<div className={'inputComponent'}>
			<input placeholder={placeholder} type={typeConfig(type)} onChange={e => setValue(e.target.value)} className={`${type} ${className}`} value={value} />
			{showEye()}
			{err ? <div className={`error ${showErr ? 'showErr' : ''}`}>{showErr}</div> : null}
		</div>
	)
}

export default Input
