export const createHeader = token => {

	const config = {
		headers: {
			'Content-Type': 'application/json'
		}
	}

	if(token)
		config['headers']['Authorization'] = `Token ${token}`

	return config
}