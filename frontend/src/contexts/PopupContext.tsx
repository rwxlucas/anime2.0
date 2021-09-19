import { createContext } from "react"

interface IPopupContext {
	popup: string;
	setPopup: Function;
}

const PopupContext = createContext({} as IPopupContext);

export default PopupContext