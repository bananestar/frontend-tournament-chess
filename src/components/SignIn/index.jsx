import { useForm } from 'react-hook-form';
import { Box, CircularProgress, Container, InputLabel } from '@mui/material';

import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
	const { handleSubmit, register } = useForm();
	const [pseudo, setPseudo] = useState('  ');
	const [mail, setMail] = useState('  ');
	const [birthdate, setBirthdate] = useState(' ');
	const [currentPassword, setCurrentPassword] = useState(' ');
	const [gender, setGender] = useState('OTHER');
	const [elo, setElo] = useState('1200');
	const navigate = useNavigate();

	const [data, setData] = useState('');
	const [isLoading, setLoading] = useState(true);
	const [errors, setErrors] = useState();

	const [errorMessagePseudo, setErrorMessagePseudo] = useState('');
	const [errorMessageMail, setErrorMessageMail] = useState('');
	const [errorMessageBirthdate, setErrorMessageBirthdate] = useState('');
	const [errorMessagePassword, setErrorMessagePassword] = useState('');
	const [errorMessageElo, setErrorMessageElo] = useState('');

	const onSubmit = ({ pseudo, mail, birthdate, currentPassword, gender, elo }) => {
		if (!pseudo || !mail || !birthdate || !currentPassword || !gender || !elo) {
			const data = {
				pseudo: pseudo,
				email: mail,
				password: currentPassword,
				birthDate: birthdate,
				gender: gender,
				elo: elo,
			};
			return console.log(data);
		}

		const register = {
			pseudo: pseudo,
			email: mail,
			password: currentPassword,
			birthDate: birthdate,
			gender: gender,
			elo: elo,
		};

		axios
			.post(import.meta.env.VITE_API_REGISTER, register)
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

	useEffect(() => {
		if (pseudo.length <= 2) {
			setErrorMessagePseudo('Pseudo has too shorts');
		}
		if (pseudo.length > 50) {
			setErrorMessagePseudo('Pseudo has too longs');
		}
		if (pseudo.length > 0 && pseudo.length <= 50) {
			setErrorMessagePseudo('');
		}
	}, [pseudo]);

	useEffect(() => {
		if (mail.length <= 2) {
			setErrorMessageMail('Email has too shorts');
		}
		if (mail.length > 50) {
			setErrorMessageMail('Email has too longs');
		}
		if (mail.length > 2 && mail.length <= 50) {
			setErrorMessageMail('');
		}
	}, [mail]);

	useEffect(() => {
		if (!birthdate) {
			setErrorMessageBirthdate('Your birthdate is empty');
		}

		const currentYear = new Date().getFullYear() - 18;
		const yearBirthdate = new Date(birthdate).getFullYear();

		if (currentYear - yearBirthdate < 18 && !(birthdate === ' ')) {
			setErrorMessageBirthdate('Minimum 18 years old');
		}
		if (birthdate && yearBirthdate <= currentYear) {
			setErrorMessageBirthdate('');
		}
	}, [birthdate]);

	useEffect(() => {
		if (currentPassword.length <= 2) {
			setErrorMessagePassword('Password has too shorts');
		}
		if (currentPassword.length > 50) {
			setErrorMessagePassword('Password has too longs');
		}
		if (currentPassword.length > 2 && mail.length <= 50) {
			setErrorMessagePassword('');
		}
	}, [currentPassword]);

	useEffect(() => {
		if (elo < 0) {
			setErrorMessageElo('Elo has zero minimum ');
		}
		if (elo > 3000) {
			setErrorMessageElo('Elo has 3000 maximum');
		}
		if (elo >= 0 && elo <= 3000) {
			setErrorMessageElo('');
		}
	}, [elo]);

	return (
		<Box display="flex" justifyContent="center" minHeight="100vh">
			<form onSubmit={handleSubmit(onSubmit)}>
				<Container>
					<h2>Registration</h2>
				</Container>

				<Container>
					<TextField
						label="Pseudo"
						margin="dense"
						size="small"
						fullWidth
						helperText={errorMessagePseudo}
						error={errorMessagePseudo}
						{...register('pseudo')}
						onChange={(e) => setPseudo(e.target.value)}
					/>
				</Container>

				<Container>
					<TextField
						label="Mail"
						margin="dense"
						size="small"
						fullWidth
						helperText={errorMessageMail}
						error={errorMessageMail}
						{...register('mail')}
						onChange={(e) => setMail(e.target.value)}
					/>
				</Container>

				<Container>
					<TextField
						id="date"
						label="Birthday"
						type="date"
						margin="dense"
						size="small"
						fullWidth
						helperText={errorMessageBirthdate}
						error={errorMessageBirthdate}
						{...register('birthdate')}
						onChange={(e) => setBirthdate(e.target.value)}
						InputLabelProps={{
							shrink: true,
						}}
					/>
				</Container>

				<Container>
					<TextField
						label="Password"
						type="password"
						margin="dense"
						size="small"
						fullWidth
						helperText={errorMessagePassword}
						error={errorMessagePassword}
						{...register('currentPassword')}
						onChange={(e) => setCurrentPassword(e.target.value)}
					/>
				</Container>

				<Container>
					<FormControl fullWidth>
						<InputLabel id="gender-label">Gender</InputLabel>
						<Select
							labelId="gender-select-label"
							id="gender-select"
							label="gender"
							margin="dense"
							size="small"
							fullWidth
							value={gender}
							{...register('gender')}
							onChange={(e) => setGender(e.target.value)}
						>
							<MenuItem value="MALE">Men</MenuItem>
							<MenuItem value="FEMALE">Women</MenuItem>
							<MenuItem value="OTHER">Other</MenuItem>
						</Select>
					</FormControl>
				</Container>

				<Container>
					<TextField
						label="Elo"
						type="number"
						value={elo}
						margin="dense"
						size="small"
						fullWidth
						helperText={errorMessageElo}
						error={errorMessageElo}
						InputProps={{
							inputProps: { min: 0, max: 3000 },
						}}
						{...register('elo')}
						onChange={(e) => setElo(e.target.value)}
					/>
				</Container>

				<Container>
					<Button margin="dense" type="submit">
						Send
					</Button>
				</Container>
			</form>
			{isLoading && data ? <CircularProgress /> : ''}
		</Box>
	);
};

export default SignIn;

<CircularProgress />;
