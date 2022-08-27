import { Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TournamentsAll from '../../components/TournamentsALL';
import Users from '../../components/Users';

const AdminPage = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setOpen(true);
		}
	}, []);
	return (
		<>
			<h1>Admin Page</h1>

			<div display="flex" justifyContent="center" minHeight="100vh">
				<h3>Tournament Panel :</h3>
				<TournamentsAll />
			</div>
			<br />
			<div display="flex" justifyContent="center" minHeight="100vh">
				<h3>Users Panel :</h3>
				<Users />
			</div>
		</>
	);
};

export default AdminPage;
