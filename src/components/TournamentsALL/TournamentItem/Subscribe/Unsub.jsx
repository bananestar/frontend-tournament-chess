import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useDelete } from '../../../../hooks/useQuery';

const UnSub = ({ id, run }) => {
	
	const { data, isLoading, errors } = useDelete(import.meta.env.VITE_API_REGISTRATION+id, {}, run);
	if (run) {
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
        window.location.reload();
	}

	return <></>;
};
export default UnSub;