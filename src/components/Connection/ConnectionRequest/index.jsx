import { Alert, CircularProgress } from '@mui/material';
import { useLogin } from '../../../hooks/useQuery';

const ConnectionRequest = (onIdentifiers) => {
	const identifiers = onIdentifiers.onIdentifiers;

	if (identifiers) {
		const { isLoading, errors } = useLogin(identifiers);
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

	

	return <></>;
};

export default ConnectionRequest;
