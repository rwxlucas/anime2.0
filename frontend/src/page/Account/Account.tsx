import { useContext, useEffect, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import Input from '../../components/Input/Input';
import { AuthContext } from '../../contexts/AuthContext';
import { UserContext } from '../../contexts/UserContext';
import { setImage, updateAccountInfo } from '../../services/authService';
import './Account.scss';


const Account = () => {

	const [option, setOption] = useState<boolean>(true);
	const [displayUserImage, setDisplayUserImage] = useState<string>('');
	const [displayName, setDisplayName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [passwordAgain, setPasswordAgain] = useState<string>('');
	const { auth } = useContext(AuthContext);
	const { user, setUser } = useContext(UserContext);
	const profileImageRef = useRef<HTMLInputElement>(null);
	const [userImage, setUserImage] = useState<File | null>(null);

	const updateFunction = async () => {
		return new Promise(async (resolve, reject) => {
			try {
				const updateUser = await updateAccountInfo({ email, phone, description, displayName }, auth)
					.catch((error) => console.log(error.response.data.message));
				if (updateUser) {
					const { data } = updateUser;
					setUser({ ...user, data });
				}
				if (userImage) {
					const formData = new FormData();
					formData.append("image", userImage);
					try {
						await setImage(formData, auth)
							.then(async (res) => {
								if (res.status === 200) {
									setDisplayUserImage(res.data.data);
								}
							})
							.catch(error => console.log(error));
					} catch (error) {
						console.log(error);
					}
				}
				return resolve(true);
			} catch (error) {
				return resolve(false);
			}
		})
	}

	const getProfileImage = () => {
		const imageFile = profileImageRef.current?.files?.item(0);
		if (imageFile) setUserImage(imageFile);
	}

	const saveAccountFunction = async () => {
		if (option) await updateFunction();
		else alert('change password');
	}

	useEffect(() => {
		if (user.description) setDescription(user.description);
		if (user.email) setEmail(user.email);
		if (user.displayName) setDisplayName(user.displayName);
		if (user.phone) setPhone(user.phone);
	}, [user]);


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
									<div><Input value={displayName} setValue={setDisplayName} type={'input'} className={'darkInput'} /></div>
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
											<input type="file" name="profileImage" onChange={getProfileImage} ref={profileImageRef} />
											<p>Select image</p>
										</label>
									</div>
									<div>
										{displayUserImage ? <img src={displayUserImage} alt={`${displayName} profile image`} /> : null}
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