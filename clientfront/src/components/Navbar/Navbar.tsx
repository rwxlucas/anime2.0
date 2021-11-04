import React from 'react';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import { AuthContext } from '../../contexts/AuthContext';
import { PopupContext } from '../../contexts/PopupContext';
import Input from '../Input/Input';
import Hamburger from '../Hamburger/Hamburger';
import Menu from '../Menu/Menu';
import './Navbar.scss';
import { UserContext } from '../../contexts/UserContext';

export const Navbar = () => {
	const { setPopup } = useContext(PopupContext);
	const { auth, setAuth } = useContext(AuthContext);
	const { user } = useContext(UserContext);
	const [searchText, setSearchText] = useState<string>('');
	const history = useHistory();
	const [openMenu, setOpenMenu] = useState<boolean>(false);

	const goToAccount = () => {
		if (!auth) {
			setPopup('login');
			return null;
		}
		history.push('/account');
	}
	const goToMain = () => history.push('/');

	const menuOptions = [
		{ icon: 'fas fa-home', name: 'Menu', exec: () => goToMain() },
		{ icon: 'fas fa-edit', name: 'Profile', exec: () => goToAccount() }
	]

	return (
		<nav className={'navbarComponent'} >
			<Menu openMenu={openMenu} options={menuOptions} setOpenMenu={setOpenMenu} />
			<div className={'navbarComponent-hamburger'} > <Hamburger open={openMenu} setOpen={setOpenMenu} /> </div>
			<div className={'navbarComponent-logo'} onClick={goToMain} >animesOnline</div>
			<div className={'navbarComponent-searchLog'} >
				<div className={'navbarComponent-searchLog-searchInput'} >
					<Input value={searchText} setValue={setSearchText} type={'text'} className={'lightInput'} placeholder={'Search'} />
				</div>
				<div className={'navbarComponent-searchLog-border'} ></div>
				<div className={`navbarComponent-searchLog-menuUser ${ user.image && auth ? '' : 'userDontHaveProfileImage'}`} >
					{
						auth ?
							<div onClick={goToAccount} className={'navbarComponent-searchLog-menuUser-profileImage'} >
								{user.image ? <img src={user.image} alt="" /> : 'Hello, Lucas!'}
							</div>
							:
							<i className={"fas fa-user"} onClick={() => setPopup('login')} ></i>
					}
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