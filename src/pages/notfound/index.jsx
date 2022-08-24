import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const NotFound = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setOpen(true);
		}
	}, []);
	return (
		<>
			<h1>ERROR 404</h1>
		</>
	);
};

export default NotFound;
