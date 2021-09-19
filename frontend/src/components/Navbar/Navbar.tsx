import { useContext, useState } from 'react';
import PopupContext from '../../contexts/PopupContext';
import Input from '../Input/Input';
import './Navbar.scss';

export const Navbar = () => {
	const { setPopup } = useContext(PopupContext);
	const [searchText, setSearchText] = useState<string>('');
	return (
		<nav className={'navbarComponent'} >
			<div className={'navbarComponent-logo'} >animesOnline</div>
			<div className={'navbarComponent-menuList'} >
				<div>Animes</div>
				<div>Categorias</div>
			</div>

			<div className={'navbarComponent-searchLog'} >
				<div>
					<Input value={searchText} type={'text'} className={'dark'} placeholder={'Search'} />
				</div>
				<div></div>
				<div>
					<i className={"fas fa-user"} onClick={() => setPopup('login')} ></i>
				</div>
			</div>
		</nav>
	)
}