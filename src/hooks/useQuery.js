import axios from "axios";
import { useEffect, useState } from 'react'
import { useRecoilState } from "recoil";
import { adminAtom, jwtAtom } from "../atoms/jwtAtom";
import { useJwt } from "react-jwt";

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

export const useLogin = (url, identifiers) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	const [token, setToken] = useRecoilState(jwtAtom);

	useEffect(() => {
		axios.post(url, identifiers).then(({ data }) => {
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

export const useRegister = (url, registers) => {
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	const [token, setToken] = useRecoilState(jwtAtom);

	useEffect(() => {
		axios.post(url, registers).then(({ data }) => {
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
