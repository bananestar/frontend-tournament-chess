import { useForm } from 'react-hook-form';
import { Container, InputLabel } from '@mui/material';

import TextField from '@mui/material/TextField';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
	const { handleSubmit, register } = useForm();
	const [pseudo, setPseudo] = useState('');
	const [mail, setMail] = useState('');
	const [birthdate, setBirthdate] = useState('');
	const [currentPassword, setCurrentPassword] = useState('');
	const [gender, setGender] = useState('OTHER');
	const [elo, setElo] = useState('1200');

	const onSubmit = (data) => {
		console.log(data);
	};
	return (
		<Container
			maxWidth="sm"
			style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
		>
			<Paper>
				<h2>Registration</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<TextField
							label="Pseudo"
							{...register('pseudo')}
							onChange={(target) => setPseudo(target.value)}
						/>
					</div>
					<br />
					<div>
						<TextField
							label="Mail"
							{...register('mail')}
							onChange={(target) => setMail(target.value)}
						/>
					</div>
					<br />
					<div>
						<TextField
							id="date"
							label="Birthday"
							type="date"
							{...register('birthdate')}
							onChange={(target) => setBirthdate(target.value)}
							sx={{ width: 220 }}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</div>
					<br />
					<div>
						<TextField
							label="Password"
							type="password"
							{...register('currentPassword')}
							onChange={(target) => setCurrentPassword(target.value)}
						/>
					</div>
					<br />
					<div>
						<FormControl fullWidth>
							<InputLabel id="gender-label">Gender</InputLabel>
							<Select
								labelId="gender-select-label"
								id="gender-select"
								label="gender"
								value={gender}
								{...register('gender')}
								onChange={(target) => setGender(target.value)}
							>
								<MenuItem value="MALE">Men</MenuItem>
								<MenuItem value="FEMALE">Women</MenuItem>
								<MenuItem value="OTHER">Other</MenuItem>
							</Select>
						</FormControl>
					</div>
					<br />
					<div>
						<TextField
							label="Elo"
							type="number"
							value={elo}
							InputProps={{
								inputProps: { min: 0, max: 3000 },
							}}
							{...register('elo')}
							onChange={(target) => setElo(target.value)}
						/>
					</div>
					<br />
					<Button type="submit">Send</Button>
				</form>
			</Paper>
		</Container>
	);
};

export default SignIn;
