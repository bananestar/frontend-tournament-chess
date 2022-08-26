import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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
		</>
	);
};

export default AdminPage;
