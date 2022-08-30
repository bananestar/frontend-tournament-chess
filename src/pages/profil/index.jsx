import { Alert, CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userIdAtom } from '../../atoms/jwtAtom';
import { useQuery } from '../../hooks/useQuery';

import ProfilComposent from '../../components/Profil';

const Profil = () => {
	const [open, setOpen] = useState(false);
	const [userId, setUserId] = useRecoilState(userIdAtom);
	const [userProfil, setUserProfil] = useState();
	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setOpen(true);
		}
	}, []);

	const { data, isLoading, errors } = useQuery(import.meta.env.VITE_API_USERS + userId, {});

	if (isLoading) {
		return <CircularProgress />;
	}
	if (errors) {
		console.log(errors);
		return (
			<Alert margin="dense" severity="error">
				ERROR LOADING PROFIL <br />
                <pre>{JSON.stringify(errors)}</pre>
			</Alert>
		);
	}
    
	const {result} = data

    // console.log(result);

	return (
		<>
			<ProfilComposent data={result} />
		</>
	);
};

export default Profil;

