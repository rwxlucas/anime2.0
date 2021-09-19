import { createContext } from "react"

interface ILoadingContext {
	loading: boolean;
	setLoading: Function;
}

const LoadingContext = createContext({} as ILoadingContext);

export default LoadingContext;