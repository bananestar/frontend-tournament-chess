import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useQuery } from '../../../../hooks/useQuery';
import { useState } from 'react';
import ButtonSub from './ButtonSub';

const Subscribe = ({ onData }) => {
	const [body, setBoby] = useState();
	const [sub, setSub] = useState();

	const id = onData;
	// console.log(onData);

	const { data, isLoading, errors } = useQuery(
		import.meta.env.VITE_API_REGISTRATION_BY_TOURNAMENT + id,
		{}
	);

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}

	if (errors) {
		return (
			<Alert margin="dense" severity="error">
				ERROR
				<pre>{JSON.stringify(errors)}</pre>
			</Alert>
		);
	}

	return <ButtonSub onData={data} id={id} />;
};

export default Subscribe;
