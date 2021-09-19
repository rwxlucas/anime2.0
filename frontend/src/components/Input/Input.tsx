import React from 'react';
import './Input.scss';

interface IInput {
	value: string;
	setValue: Function;
	type: string;
	className?: string;
	placeholder?: string;
}

const Input = ({ value, setValue, type, className, placeholder }: IInput) => {
	return (
		<input placeholder={placeholder} type={type} onChange={e => setValue(e.target.value)} className={`${type} ${className}`} value={value} />
	)
}

export default Input
