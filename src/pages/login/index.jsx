import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Connection from '../../components/Connection';

const Login = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setOpen(true);
		}
	}, []);
	return (
		<>
			<Connection />
		</>
	);
};

export default Login;
