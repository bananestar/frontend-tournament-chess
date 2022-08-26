import { Alert, CircularProgress } from '@mui/material';
import { useLogin } from '../../../hooks/useQuery';

const ConnectionRequest = (onIdentifiers) => {
	const identifiers = onIdentifiers.onIdentifiers;

	if (identifiers) {
		const { isLoading, errors } = useLogin(import.meta.env.VITE_API_LOGIN, identifiers);
		if (isLoading) {
			return <CircularProgress />;
		}

		if (errors) {
			console.log(errors);
			return (
				<Alert margin="dense" severity="error">
					ERROR Identifier and Password was wrong
				</Alert>
			);
		}
	}

	useJwtAdmin()

	return <></>;
};

export default ConnectionRequest;
