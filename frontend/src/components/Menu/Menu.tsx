import React from 'react';
import './Menu.scss';

interface IOptions {
	icon: string;
	name: string;
	exec?: Function;
}

interface IMenu {
	options: IOptions[];
	openMenu: boolean;
}

const Menu = ({ openMenu, options }: IMenu) => {
	return (
		<div className={`leftMenu ${openMenu ? 'open' : ''}`} >
			{
				options.length > 0 ? options.map((item, index) => <div key={`leftMenu-options-${index}`} onClick={() => item.exec ? item.exec() : null} >
					<i className={item.icon} ></i>
					<div>{item.name}</div>
				</div>) : null
			}
		</div >
	)
}

export default Menu;