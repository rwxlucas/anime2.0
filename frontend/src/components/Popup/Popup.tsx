import React, { useContext, useEffect, useRef, useState } from 'react';
import { setTimeout } from 'timers';
import PopupContext from '../../contexts/PopupContext';
import Login from './Login/Login';
import './Popup.scss';

function Popup() {
	const [show, setShow] = useState<string>('');
	const { popup, setPopup } = useContext(PopupContext);
	const popupRef = useRef(null);
	const type: any = {
		'login': <Login />
	}

	const closePopup = () => setPopup('');

	useEffect(() => {
		setShow('show');
	}, [popup])

	return (
		<div className={'popupDiv'} >
			<div className={'popup ' + show} ref={popupRef} >
				{type[popup]}
			</div>
			<div className={'closePopup'} onClick={closePopup} ></div>
		</div>
	)
}

export default Popup
