import { Box, CircularProgress } from '@mui/material';
import { useRecoilState } from 'recoil';
import { jwtAtom } from '../../../../atoms/jwtAtom';
import { useDelete } from '../../../../hooks/useQuery';

const RequestDelete = ({ run, id, callbackRun }) => {
	const [token, setToken] = useRecoilState(jwtAtom);

	const { data, isLoading, errors } = useDelete(import.meta.env.VITE_API_MATCH + id, token, run);
	if (isLoading && run) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}
	if (errors) {
		callbackRun(false);
		return <Box sx={{ display: 'flex', justifyContent: 'center' }}>{errors}</Box>;
	}

	if (data) {
		callbackRun(false);
	}
};

export default RequestDelete;
