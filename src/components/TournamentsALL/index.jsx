import useQuery from '../../hooks/useQuery';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TournamentItem from './TournamentItem';

const TournamentsAll = () => {
	const { data, isLoading, errors } = useQuery(import.meta.env.VITE_API_TOURNAMENT, {});

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

	const { results } = data;

	return <TournamentItem onData={results} />;
};

export default TournamentsAll;
