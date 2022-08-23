import BaseLayout from '../../layouts/BaseLayout';
import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TournamentInfoComponent from '../../components/TournamentsALL/TournamentInfo';

const TournamentInfo = () => {
    const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setOpen(true);
		}
	}, []);
	return (
		<>
			<BaseLayout>
				{location.state && (
					<Snackbar open={open} autoHideDuration={2000} onClose={() => setOpen(false)}>
						<Alert
							onClose={() => setOpen(false)}
							severity={location.state.status}
							sx={{ width: '100%' }}
						>
							{location.state.message}
						</Alert>
					</Snackbar>
				)}
				<TournamentInfoComponent/>
			</BaseLayout>
		</>
	);
}

export default TournamentInfo
