import { createContext, useState } from "react"

interface IPopupContext {
	popup: string;
	setPopup: Function;
}

export const PopupContext = createContext({} as IPopupContext);

const PopupProvider = (props: any) => {
	const [popup, setPopup] = useState<string>('');
	return <PopupContext.Provider value={{ popup, setPopup }}>
		{props.children}
	</PopupContext.Provider>
}

export default PopupProvider;