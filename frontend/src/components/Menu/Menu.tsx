import React, { useState } from 'react';
import './Menu.scss';

interface IOptions {
	icon: string;
	name: string;
	exec?: Function;
}

interface IMenu {
	options: IOptions[];
	openMenu: boolean;
	setOpenMenu: Function;
}

const Menu = ({ openMenu, setOpenMenu, options }: IMenu) => {

	return (
		<div className={`leftMenu ${openMenu ? 'open' : ''}`} >
			{
				options.length > 0 ? options.map((item, index) => <div key={`leftMenu-options-${index}`} onClick={() => item.exec ? item.exec() : null} >
					<i className={item.icon} ></i>
					<div>{item.name}</div>
				</div>) : null
			}
			<div className={'close'} onClick={() => setOpenMenu(false)} ></div>
		</div >
	)
}

export default Menu;