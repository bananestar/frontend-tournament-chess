import { useForm } from 'react-hook-form';
import { Container } from '@mui/material';

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
	const navigate = useNavigate()

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
				localStorage.setItem("token", data.result.token)
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
		<Container
			maxWidth="sm"
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Paper>
				<h2>Login</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<TextField
							label="Email / Pseudo"
							{...register('identifier')}
							onChange={(target) => setIdentifier(target.value)}
						/>
					</div>
					<br />
					<div>
						<TextField
							type={'password'}
							label="Password"
							{...register('currentPassword')}
							onChange={(target) => setCurrentPassword(target.value)}
						/>
					</div>
					<br />
					<Button type="submit">Send</Button>
				</form>
				<br />
			</Paper>
		</Container>
	);
};

export default Connection;
