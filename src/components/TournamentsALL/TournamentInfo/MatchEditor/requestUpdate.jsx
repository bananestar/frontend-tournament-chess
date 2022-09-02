import { Box, CircularProgress } from '@mui/material';
import { useRecoilState } from 'recoil';
import { jwtAtom } from '../../../../atoms/jwtAtom';
import { useUpdateControl } from '../../../../hooks/useQuery';

const RequestUpdate = ({ run, request, id, callbackRun }) => {
	const [token, setToken] = useRecoilState(jwtAtom);
    console.log(request);
	const { data, isLoading, errors } = useUpdateControl(
		import.meta.env.VITE_API_MATCH + id,
		token,
		request,
		run
	);

	if (isLoading) {
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
        console.log('finish');
		callbackRun(false);
	}
	
};

export default RequestUpdate;
