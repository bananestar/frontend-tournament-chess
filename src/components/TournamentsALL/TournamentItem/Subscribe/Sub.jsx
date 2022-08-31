import { Alert, CircularProgress } from '@mui/material';
import { Box } from '@mui/system';
import { useRecoilState } from 'recoil';
import { userIdAtom } from '../../../../atoms/jwtAtom';
import { useAdd } from '../../../../hooks/useQuery';

const Sub = ({ id, run }) => {
	const [userId, setUserId] = useRecoilState(userIdAtom);
	const body = {
		tournamentId: id,
		userId: userId,
	};
	const { data, isLoading, errors } = useAdd(import.meta.env.VITE_API_REGISTRATION, {}, body, run);
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
export default Sub;
