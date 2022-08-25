import { useForm } from 'react-hook-form';
import { Box, Container } from '@mui/material';

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Connection = () => {
	const { handleSubmit, register } = useForm();
	const [identifier, setIdentifier] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [data, setData] = useState();
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();
	const navigate = useNavigate();

	const onSubmit = ({ identifier, currentPassword }) => {
		if (!identifier || !currentPassword) {
			return console.log(identifier, currentPassword);
		}
		setIdentifier(identifier);
		setCurrentPassword(currentPassword);

		const identifiers = {
			identifier: identifier,
			password: currentPassword,
		};

		axios
			.post(import.meta.env.VITE_API_LOGIN, identifiers)
			.then(({ data }) => {
				setData(data);
				localStorage.setItem('token', data.result.token);
				navigate('/');
				window.location.reload();
			})
			.catch((errors) => {
				setErrors(errors);
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<Box display="flex" justifyContent="center" minHeight="100vh">
			{/* <Paper> */}

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
			</form>
			{/* </Paper> */}
		</Box>
		
	);
};

export default Connection;
