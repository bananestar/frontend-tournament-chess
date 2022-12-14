import axios from "axios";
import { useEffect, useState } from 'react'
import { useRecoilState } from "recoil";
import { jwtAtom } from "../atoms/jwtAtom";

const URL_LOGIN = import.meta.env.VITE_API_LOGIN;
const URL_REGISTER = import.meta.env.VITE_API_REGISTER;

export const useQuery = (url, params) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	useEffect(() => {
		axios.get(url, { params }).then(({ data }) => {
			setData(data);
		})
			.catch((errors) => {
				setErrors(errors);
			})
			.finally(() => {
				setLoading(false);
			})
	}, [Object.values(params)[0]]);

	return { data, isLoading, errors };
}

export const useDelete = (url, auth, run) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	useEffect(() => {
		if (run) {
			if (Object.keys(auth).length > 0) {
				axios.delete(url, {
					headers: {
						Authorization: `Bearer ${auth}`,
					}
				}).then(({ data }) => {
					setData(data)
				}).catch((errors) => {
					setErrors(errors)
				}).finally(() => {
					setLoading(false)
				})
			} else {
				axios.delete(url
				).then(({ data }) => {
					setData(data)
				}).catch((errors) => {
					setErrors(errors)
				}).finally(() => {
					setLoading(false)
				})
			}
		}
	}, [run])
	return { data, isLoading, errors }
}

export const useAdd = (url, auth, body, run) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	useEffect(() => {
		if (run) {
			if (Object.keys(auth).length > 0) {
				axios.post(url, body, { headers: { Authorization: `Bearer ${auth}` } }).then(({ data }) => {
					setData(data)
				}).catch((errors) => {
					setErrors(errors)
				}).finally(() => {
					setLoading(false)
				})
			} else {
				axios.post(url, body).then(({ data }) => {
					setData(data)
				}).catch((errors) => {
					setErrors(errors)
				}).finally(() => {
					setLoading(false)
				})
			}
		}
	}, [run])
	return { data, isLoading, errors }
}

export const useUpdate = (url, auth, body) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	useEffect(() => {
		axios.put(url, body, { headers: { Authorization: `Bearer ${auth}` } }).then(({ data }) => {
			setData(data)
		}).catch((errors) => {
			setErrors(errors)
		}).finally(() => {
			setLoading(false)
		})
	}, [body])
	return { data, isLoading, errors }
}

export const useUpdateControl = (url, auth, body, run) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	useEffect(() => {
		console.log('run use '+run);
		if (run) {
			axios.put(url, body, { headers: { Authorization: `Bearer ${auth}` } }).then(({ data }) => {
				setData(data)
			}).catch((errors) => {
				setErrors(errors)
			}).finally(() => {
				setLoading(false)
			})
		}
	}, [body])
	return { data, isLoading, errors }
}

export const useLogin = (identifiers) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	const [token, setToken] = useRecoilState(jwtAtom);

	useEffect(() => {
		axios.post(URL_LOGIN, identifiers).then(({ data }) => {
			setData(data)
			setToken(data.result.token);
		}).catch((errors) => {
			setErrors(errors)
		}).finally(() => {
			setLoading(false)
		})
	}, [identifiers])

	return { data, isLoading, errors };
}

export const useRegister = (registers) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	const [token, setToken] = useRecoilState(jwtAtom);

	useEffect(() => {
		axios.post(URL_REGISTER, registers).then(({ data }) => {
			setData(data)
			setToken(data.result.token)
		}).catch((errors) => {
			setErrors(errors)
		}).finally(() => {
			setLoading(false)
		})
	}, [registers])

	return { data, isLoading, errors };
}