import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TournamentsAll from '../../components/TournamentsALL';

const Tournaments = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setOpen(true);
		}
	}, []);
	return (
		<>
			<TournamentsAll />
		</>
	);
};

export default Tournaments;
