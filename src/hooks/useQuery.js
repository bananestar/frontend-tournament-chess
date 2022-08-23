import axios from "axios";
import {useEffect, useState} from 'react'

const useQuery = (url,params) => {
    const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

    useEffect(() => {
		axios.get(url, {params}).then(({data}) => {
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

export default useQuery