export const timer = (awaitTime: number) => {
	return new Promise((resolve) => {
		setTimeout(() => resolve(true), awaitTime);
	})
}