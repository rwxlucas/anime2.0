import React, { useState } from 'react';
import './Hamburger.scss';

const Hamburger = ({ open, setOpen }: { open: boolean, setOpen: Function }) => {
	return (
		<div className={`menuBtn ${open ? 'open' : ''}`} onClick={() => setOpen(!open)} >
			<div className={'menuBtn-burger'} ></div>
		</div>
	)
}

export default Hamburger;