import React from 'react';
import './Loading.scss';

function Loading() {
	return (
		<div className={'loadingComponent'}>
			<div>
				<div className="lds-roller">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
				<div className={'loadingColor'} >Loading</div>
			</div>
		</div>
	)
}

export default Loading
