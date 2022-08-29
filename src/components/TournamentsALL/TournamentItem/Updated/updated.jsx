import { Alert, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { jwtAtom } from '../../../../atoms/jwtAtom';
import { useUpdate } from '../../../../hooks/useQuery';

const Update = ({ onID, onRequest }) => {
	const id = onID;
	const request = onRequest;
	const navigate = useNavigate();
	const [token, setToken] = useRecoilState(jwtAtom);

	const { data, isLoading, errors } = useUpdate(
		import.meta.env.VITE_API_TOURNAMENT + id,
		token,
		request
	);

	if (isLoading) {
		return <CircularProgress />;
	}

	if (errors) {
		console.log(errors);
		return (
			<Alert margin="dense" severity="error">
				ERROR
			</Alert>
		);
	}

	if (data) {
		navigate('/admin-panel');
	}
};

export default Update;
