import { useForm } from 'react-hook-form';
import { Box, Container, InputLabel } from '@mui/material';

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
	const [pseudo, setPseudo] = useState(' ');
	const [mail, setMail] = useState(' ');
	const [birthdate, setBirthdate] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [gender, setGender] = useState('OTHER');
	const [elo, setElo] = useState('1200');

	const [errorMessagePseudo, setErrorMessagePseudo] = useState('');
	const [errorMessageMail, setErrorMessageMail] = useState('');

	const onSubmit = (data) => {
		console.log(data);
	};

	useEffect(() => {
		if (pseudo.length === 0) {
			setErrorMessagePseudo('Pseudo has empty')
		}
		if (pseudo.length > 0) {
			setErrorMessagePseudo('')
		}
	}, [pseudo]);



	return (
		<Box display="flex" justifyContent="center" minHeight="100vh">
			{/* <Paper> */}

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
						error={pseudo.length === 0}
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
			{/* </Paper> */}
		</Box>
	);
};

export default SignIn;
