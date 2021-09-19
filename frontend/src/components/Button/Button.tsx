import './Button.scss';

interface IButton {
	text: string;
	className: string;
	exec?: Function
}

const Button = ({ text, className, exec }: IButton) => {
	const execFunction = () => {
		if (exec) exec();
	}
	return (
		<button className={`button ${className}`} onClick={execFunction} >{text}</button>
	)
}

export default Button;