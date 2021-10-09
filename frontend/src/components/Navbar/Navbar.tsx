import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { PopupContext } from '../../contexts/PopupContext';
import Input from '../Input/Input';
import './Navbar.scss';

export const Navbar = () => {
	const { setPopup } = useContext(PopupContext);
	const { setAuth } = useContext(AuthContext);
	const [searchText, setSearchText] = useState<string>('');
	const { auth } = useContext(AuthContext);
	return (
		<nav className={'navbarComponent'} >
			<div className={'navbarComponent-logo'} >animesOnline</div>
			<div className={'navbarComponent-menuList'} >
				<div>Animes</div>
				<div>Categorias</div>
			</div>

			<div className={'navbarComponent-searchLog'} >
				<div  >
					<Input value={searchText} setValue={setSearchText} type={'text'} className={'dark'} placeholder={'Search'} />
				</div>
				<div className={'navbarComponent-searchLog-border'} ></div>
				<div className={'navbarComponent-searchLog-menuUser'} >
					{auth ? <div>Hello, Lucas!</div> : <i className={"fas fa-user"} onClick={() => setPopup('login')} ></i>}
				</div>
				{auth ?
					<div className={'navbarComponent-searchLog-logout'} >
						<i className="fas fa-sign-out-alt" onClick={() => setAuth('')} ></i>
					</div> : null
				}
			</div>
		</nav>
	)
}