import { Box, CircularProgress } from '@mui/material';
import useQuery from '../../../../hooks/useQuery';

const HowManyUser = ({ onData }) => {
	const { data, isLoading, errors } = useQuery(
		import.meta.env.VITE_API_REGISTRATION_BY_TOURNAMENT + onData,
		{}
	);

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}

	if (errors || !data) {
		console.log('test');
		return <Box sx={{ display: 'flex', justifyContent: 'center' }}>{errors}</Box>;
	}

	return <>{data.count}</>;
};

export default HowManyUser;
