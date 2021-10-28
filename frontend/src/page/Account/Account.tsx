import { MouseEventHandler, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import './Account.scss';

const Account = () => {

	const [option, setOption] = useState<boolean>(true);
	const [diplayName, setDisplayName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordAgain, setPasswordAgain] = useState<string>('');

	const saveAccountFunction = () => {
		if (option) alert('update');
		else alert('change password');
	}

	return (
		<div className={'accountPage'} >
			<div className={'accountPage-mainContent'} >
				<div className={`accountPage-mainContent-updateOption`} >
					<div className={'accountPage-mainContent-title'} >
						<p>{option ? 'Update Profile' : 'Change Password'}</p>
					</div>

					<form className={'accountPage-mainContent-form'} >
						{
							option ? <>
								<div>
									<p>Username:</p>
									<div><Input value={'lucas'} setValue={() => null} type={'input'} className={'darkInput'} /></div>
								</div>
								<div>
									<p>Display name:</p>
									<div><Input value={diplayName} setValue={setDisplayName} type={'input'} className={'darkInput'} /></div>
								</div>
								<div>
									<p>Email:</p>
									<div><Input value={email} setValue={setEmail} type={'input'} className={'darkInput'} /></div>
								</div>
								<div>
									<p>Phone:</p>
									<div><Input value={phone} setValue={setPhone} type={'input'} className={'darkInput'} /></div>
								</div>
								<div>
									<p>Description:</p>
									<div><Input value={description} setValue={setDescription} type={'input'} className={'darkInput'} /></div>
								</div>
								<div className={'profileImage'}>
									<div>
										<p>Profile Image</p>
										<label>
											<input type="file" />
											<p>Select image</p>
										</label>
									</div>
									<div>
										<img src="https://www.pixsy.com/wp-content/uploads/2021/04/ben-sweet-2LowviVHZ-E-unsplash-1.jpeg" alt="teste" />
									</div>
								</div>
							</> : <>
								<div>
									<p>New password:</p>
									<div><Input value={password} setValue={setPassword} type={'password'} className={'darkInput'} /></div>
								</div>
								<div>
									<p>New password again:</p>
									<div><Input value={passwordAgain} setValue={setPasswordAgain} type={'password'} className={'darkInput'} /></div>
								</div>
							</>
						}
					</form>

					<div className={'accountPage-mainContent-button'} >
						<Button text={'Save changes'} className={'purpleButton'} exec={saveAccountFunction} />
					</div>
				</div>

				<div className={'accountPage-mainContent-options'} >
					<div>
						<Button text={`${option ? 'Change password' : 'Change profile'}`} className={'purpleButton'} exec={() => setOption(!option)} />
					</div>
				</div>
			</div>
		</div>
	)
}

export default Account;