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
			<TournamentInfoComponent />
		</>
	);
};

export default TournamentInfo;
