import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import SignIn from '../../components/SignIn';

const SignInPage = () => {
	const [open, setOpen] = useState(false);
	const location = useLocation();

	useEffect(() => {
		if (location.state) {
			setOpen(true);
		}
	}, []);
	return (
		<>
			<SignIn/>
		</>
	);
};

export default SignInPage;
