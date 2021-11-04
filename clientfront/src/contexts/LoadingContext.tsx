import { createContext, useState } from "react"

interface ILoadingContext {
	loading: boolean;
	setLoading: Function;
}

export const LoadingContext = createContext({} as ILoadingContext);

const LoadingProvider = (props: any) => {
	const [loading, setLoading] = useState<boolean>(false);
	return <LoadingContext.Provider value={{ loading, setLoading }}>
		{props.children}
	</LoadingContext.Provider>
}
export default LoadingProvider;