import { useForm } from 'react-hook-form';
import { Box, Container } from '@mui/material';

import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import { useRecoilState } from 'recoil';
import { jwtAtom } from './../../atoms/jwtAtom';
import ConnectionRequest from './ConnectionRequest';

const Connection = () => {
	const { handleSubmit, register } = useForm({
		identifier: '',
		currentPassword: '',
	});

	const [identifier, setIdentifier] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [identifiers, setIdentifiers] = useState();
	const navigate = useNavigate();

	const [token, setToken] = useRecoilState(jwtAtom);

	useEffect(() => {
		if (token) {
			navigate('/');
		}
	}, [token]);

	const onSubmit = ({ identifier, currentPassword }) => {
		if (!identifier || !currentPassword) {
			return console.log(identifier, currentPassword);
		}
		setIdentifier(identifier);
		setCurrentPassword(currentPassword);

		setIdentifiers({
			identifier: identifier,
			password: currentPassword,
		});
	};

	return (
		<Box display="flex" justifyContent="center" minHeight="100vh">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Container>
					<h2>Login</h2>
				</Container>

				<Container>
					<TextField
						label="Email / Pseudo"
						margin="dense"
						size="small"
						// fullWidth
						{...register('identifier')}
						onChange={(target) => setIdentifier(target.value)}
					/>
				</Container>

				<Container>
					<TextField
						type={'password'}
						label="Password"
						margin="dense"
						size="small"
						// fullWidth
						{...register('currentPassword')}
						onChange={(target) => setCurrentPassword(target.value)}
					/>
				</Container>

				<Container>
					<Button type="submit">Send</Button>
				</Container>

				<Container>
					{identifiers ? <ConnectionRequest onIdentifiers={identifiers} /> : ''}
				</Container>
			</form>
		</Box>
	);
};

export default Connection;
