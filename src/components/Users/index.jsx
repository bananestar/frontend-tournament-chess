import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useQuery } from "../../hooks/useQuery";
import DisplayAll from "./Display/DisplayAll";

const Users = () => {
    const { data, isLoading, errors } = useQuery(import.meta.env.VITE_API_USERS, {});

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

    return <DisplayAll onData={results} />;
}

export default Users