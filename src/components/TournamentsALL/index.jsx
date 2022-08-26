
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import TournamentItem from './TournamentItem';
import { useQuery } from '../../hooks/useQuery';

const TournamentsAll = () => {
	const { data, isLoading, errors } = useQuery(import.meta.env.VITE_API_TOURNAMENT, {});

	if (isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}

	if (errors) {
		console.log('test');
		return <Box sx={{ display: 'flex', justifyContent: 'center' }}>{errors}</Box>;
	}

	const { results } = data;

	return <TournamentItem onData={results} />;
};

export default TournamentsAll;
