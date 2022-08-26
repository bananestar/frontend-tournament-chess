import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { adminAtom, bearerSelector, jwtAtom } from '../../atoms/jwtAtom';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { IconButton } from '@mui/material';
import { useJwtAdmin } from '../../hooks/useJwt';

const Home = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	// ↓ Move this in ajax request :)
	const bearerToken = useRecoilValue(bearerSelector);

	const [token, setToken] = useRecoilState(jwtAtom);
	const [isAdmin, setIsAdmin] = useRecoilState(adminAtom);

	useJwtAdmin()

	useEffect(() => {
		if (location.state) {
			setOpen(true);
		}
	}, []);

	return (
		<>
			<h1>Hello World</h1>
			<h2>
				isAdmin:{' '}
				{isAdmin ? (
					<>
						true{' '}
						<IconButton component={Link} to="/admin-panel">
							<AdminPanelSettingsIcon />
						</IconButton>
					</>
				) : (
					'false'
				)}{' '}
			</h2>
			<h2>Current Token : {bearerToken}</h2>
		</>
	);
};

export default Home;
