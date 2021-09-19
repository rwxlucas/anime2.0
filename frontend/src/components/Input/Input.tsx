import React from 'react';
import './Input.scss';

interface IInput {
	value: string;
	type: string;
	className?: string;
	placeholder?: string;
}

const Input = ({ value, type, className, placeholder }: IInput) => {
	return (
		<input placeholder={placeholder} type={type} className={`${type} ${className}`} value={value} />
	)
}

export default Input
