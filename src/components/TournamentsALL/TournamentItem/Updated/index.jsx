import {
	Button,
	Checkbox,
	CircularProgress,
	FormControl,
	FormControlLabel,
	InputLabel,
	MenuItem,
	Select,
	TextField,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import { useQuery } from '../../../../hooks/useQuery';
import Update from './updated';

const Updated = () => {
	const { handleSubmit, register } = useForm();
	const state = useLocation().state;
	const dataTable = state.data;

	//* Var State
	const [name, setName] = useState(dataTable.name);
	const [address, setAddress] = useState(dataTable.location);
	const [category, setCategory] = useState(dataTable.category);
	const [eloMin, setEloMin] = useState(' ');
	const [eloMax, setEloMax] = useState(' ');
	const [playerMin, setPlayerMin] = useState(' ');
	const [playerMax, setPlayerMax] = useState(' ');
	const [womenOnly, setWomenOnly] = useState(dataTable.womenOnly);
	const [registrationAt, setRegistrationAt] = useState();
	const [canRegister, setCanRegister] = useState();
	const [updatedAt, setUpdatedAt] = useState();
	const [statut, setStatut] = useState(dataTable.statut);

	const [requestBody, setRequestBody] = useState();

	//* Var State Error
	const [errorMessageName, setErrorMessageName] = useState('');
	const [errorMessageAddress, setErrorMessageAddress] = useState('');
	const [errorMessageEloMin, setErrorMessageEloMin] = useState('');
	const [errorMessageEloMax, setErrorMessageEloMax] = useState('');
	const [errorMessagePlayerMin, setErrorMessagePlayerMin] = useState('');
	const [errorMessagePlayerMax, setErrorMessagePlayerMax] = useState('');

	const { data, isLoading, errors } = useQuery(
		import.meta.env.VITE_API_TOURNAMENT + dataTable.id,
		{}
	);

	//TODO: Recup Data manquant
	useEffect(() => {
		if (data) {
			const { EloMin, EloMax, PlayersMin, PlayersMax, canRegister, updatedAt, registrationAt } =
				data.result;
			setEloMin(EloMin);
			setEloMax(EloMax);
			setPlayerMin(PlayersMin);
			setPlayerMax(PlayersMax);
			setCanRegister(canRegister);
			setRegistrationAt(new Date(registrationAt).toLocaleDateString('en-CA'));
			setUpdatedAt(new Date(updatedAt).toLocaleDateString('en-CA'));
		}
	}, [data]);

	//? useEffect Error
	useEffect(() => {
		if (name.length <= 2) {
			setErrorMessageName('Name of tournament has too shorts');
		}
		if (name.length > 50) {
			setErrorMessageName('Name of tournament has too longs');
		}
		if (name.length > 0 && name.length <= 50) {
			setErrorMessageName('');
		}
	}, [name]);

	//? Handle WomenOnly && CanRegister

	const handleChangeWomenOnly = () => setWomenOnly(!womenOnly);
	const handleChangeCanRegister = () => setCanRegister(!canRegister);

	//TODO: Traitement Form
	const onSubmit = (data) => {
		if (data.eloMin !== '') {
			setEloMin(data.eloMin);
		}
		if (data.eloMax !== '') {
			setEloMax(data.eloMax);
		}
		if (data.playerMin !== '') {
			setPlayerMin(data.playerMin);
		}
		if (data.playerMax !== '') {
			setPlayerMax(data.playerMax);
		}

		setUpdatedAt(new Date().toLocaleDateString('en-CA'));

		setRequestBody({
			name: name,
			location: address,
			category: category,
			EloMin: eloMin,
			EloMax: eloMax,
			PlayersMin: playerMin,
			PlayersMax: playerMax,
			womenOnly: womenOnly,
			canRegister: canRegister,
			registrationAt: registrationAt,
			updatedAt: updatedAt,
			currentRound: 1,
			statut: statut,
		});
	};

	return (
		<Box display="flex" justifyContent="center" minHeight="100vh">
			{errors
				? //! Errors
				  { errors }
				: ''}

			{isLoading ? (
				//! Loading
				<Box sx={{ display: 'flex', justifyContent: 'center' }}>
					<CircularProgress />
				</Box>
			) : (
				//! Form
				<>
					<form onSubmit={handleSubmit(onSubmit)}>
						{/* Title --> Tournament of <insert name> */}
						<Container>
							<h2> {dataTable.name} </h2>
						</Container>

						{/* Input Name */}
						<Container>
							<TextField
								label="Name of tournament"
								margin="dense"
								size="small"
								fullWidth
								type="text"
								value={name}
								helperText={errorMessageName}
								error={errorMessageName}
								{...register('name')}
								onChange={(e) => setName(e.target.value)}
							/>
						</Container>

						{/* Input location */}
						<Container>
							<TextField
								label="Address of tournament"
								margin="dense"
								size="small"
								fullWidth
								type="text"
								value={address}
								helperText={errorMessageAddress}
								error={errorMessageAddress}
								{...register('location')}
								onChange={(e) => setAddress(e.target.value)}
							/>
						</Container>

						{/* Input Category */}
						<Container>
							<FormControl fullWidth margin="dense">
								<InputLabel id="category-label">Category</InputLabel>
								<Select
									labelId="category-select-label"
									id="category-select"
									label="category"
									margin="dense"
									size="small"
									fullWidth
									value={category}
									{...register('category')}
									onChange={(e) => setCategory(e.target.value)}
								>
									<MenuItem value="junior">junior</MenuItem>
									<MenuItem value="senior">senior</MenuItem>
									<MenuItem value="veteran">veteran</MenuItem>
								</Select>
							</FormControl>
						</Container>

						{/* Input Elo */}
						<Container>
							{/* Input Elo Min */}
							<TextField
								sx={{ width: '25ch' }}
								label="Elo Min"
								margin="dense"
								size="small"
								type="number"
								value={eloMin}
								InputProps={{ inputProps: { min: 0, max: 3000 } }}
								helperText={errorMessageEloMin}
								error={errorMessageEloMin}
								{...register('eloMin')}
								onChange={(e) => setEloMin(e.target.value)}
							/>
							&nbsp;&nbsp;
							{/* Input Elo Max */}
							<TextField
								sx={{ width: '25ch' }}
								label="Elo Max"
								margin="dense"
								size="small"
								type="number"
								value={eloMax}
								InputProps={{ inputProps: { min: 0, max: 3000 } }}
								helperText={errorMessageEloMax}
								error={errorMessageEloMax}
								{...register('eloMax')}
								onChange={(e) => setEloMax(e.target.value)}
							/>
						</Container>

						{/* Input Player */}
						<Container>
							{/* Input Player Min */}
							<TextField
								sx={{ width: '25ch' }}
								label="Player Min"
								margin="dense"
								size="small"
								type="number"
								value={playerMin}
								InputProps={{ inputProps: { min: 2, max: 32 } }}
								helperText={errorMessagePlayerMin}
								error={errorMessagePlayerMin}
								{...register('playerMin')}
								onChange={(e) => setPlayerMin(e.target.value)}
							/>
							&nbsp;&nbsp;
							{/* Input Player Max */}
							<TextField
								sx={{ width: '25ch' }}
								label="Player Max"
								margin="dense"
								size="small"
								type="number"
								value={playerMax}
								InputProps={{ inputProps: { min: 2, max: 32 } }}
								helperText={errorMessagePlayerMax}
								error={errorMessagePlayerMax}
								{...register('playerMax')}
								onChange={(e) => setPlayerMax(e.target.value)}
							/>
						</Container>

						{/* Input Category */}
						<Container>
							<FormControl fullWidth margin="dense">
								<InputLabel id="statut-label">Statut</InputLabel>
								<Select
									labelId="statut-select-label"
									id="statut-select"
									label="statut"
									margin="dense"
									size="small"
									fullWidth
									value={statut}
									{...register('statut')}
									onChange={(e) => setStatut(e.target.value)}
								>
									<MenuItem value="WaitingForPlayers">WaitingForPlayers</MenuItem>
									<MenuItem value="InProgress">InProgress</MenuItem>
									<MenuItem value="Closed">Closed</MenuItem>
								</Select>
							</FormControl>
						</Container>

						{/* Input Date Registration */}
						<Container>
							<TextField
								margin="dense"
								size="small"
								fullWidth
								type="date"
								value={new Date(registrationAt).toLocaleDateString('en-CA')}
								{...register('registrationAt')}
								onChange={(e) => setRegistrationAt(e.target.value)}
							/>
						</Container>

						<Container>
							{/* Input WomenOnly */}
							<FormControlLabel
								sx={{ width: '25ch' }}
								value={womenOnly}
								control={
									<Checkbox
										checked={womenOnly}
										{...register('womenOnly')}
										onChange={handleChangeWomenOnly}
									/>
								}
								label="Women Only"
								labelPlacement="end"
							/>
							{/* Input CanRegister */}
							<FormControlLabel
								sx={{ width: '25ch' }}
								value={canRegister}
								control={
									<Checkbox
										checked={canRegister}
										{...register('canRegister')}
										onChange={handleChangeCanRegister}
									/>
								}
								label="Open Register"
								labelPlacement="end"
							/>
						</Container>

						{/* BTN send */}
						<Container>
							<Button margin="dense" type="submit">
								Send
							</Button>
							&nbsp; &nbsp;
							<Button margin="dense" component={Link} to="/admin-panel">
								Back
							</Button>
						</Container>
					</form>

					{requestBody ? <Update onRequest={requestBody} onID={dataTable.id} /> : ''}
				</>
			)}
		</Box>
	);
};

export default Updated;
