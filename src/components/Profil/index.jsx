import {
	Avatar,
	Card,
	CardContent,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import CakeIcon from '@mui/icons-material/Cake';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import TransgenderIcon from '@mui/icons-material/Transgender';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';

const Profil = ({ data }) => {
	const userName = data.pseudo;
	const userEmail = data.email;
	const userBirthDate = data.birthDate;
	const userGender = data.gender;
	const userElo = data.elo;
	const userMatchWin = data.matchWin;
	const userMatchLoose = data.matchLoose;
	const userMatchDraw = data.matchDraw;
	const userIsAdmin = data.isAdmin;
	const userCreatedAt = data.createdAt;
	const userUpdatedAt = data.updatedAt;

	const WinningPourcentage =
		((2 * (userMatchWin + userMatchDraw)) / (2 * (userMatchWin + userMatchDraw + userMatchLoose))) *
		100;

	const formatedBirth = new Date(userBirthDate).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	const formatedCreated = new Date(userCreatedAt).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	const formatedUpdated = new Date(userUpdatedAt).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	return (
		<Box display="flex" justifyContent="center" minHeight="100vh">
			<Card sx={{ minWidth: 500, maxHeight: 250 }} component={Paper} variant="outlined">
				<CardContent>
					<Typography variant="h3" gutterBottom>
						{userName}
						<Typography variant="subtitle1" gutterBottom>
							{userEmail}{' '}
							{userIsAdmin ? (
								<AdminPanelSettingsIcon
									sx={{
										color: 'red',
									}}
								/>
							) : (
								''
							)}
							<br />
							<CakeIcon /> {formatedBirth}&nbsp;&nbsp; --{' '}
							{userGender === 'MALE' ? (
								<>
									<ManIcon /> Men
								</>
							) : userGender === 'FEMALE' ? (
								<>
									<WomanIcon /> Women
								</>
							) : (
								<>
									<TransgenderIcon /> Other
								</>
							)}
						</Typography>
					</Typography>

					<Typography>
						Created At : {formatedCreated} <br />
						Update &nbsp;At : {formatedUpdated}
					</Typography>
				</CardContent>
			</Card>
			&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
			<Card sx={{ minWidth: 500, maxHeight: 250 }} variant="outlined">
				<CardContent>
					<Typography variant="h4" gutterBottom>
						Elo : {userElo}
						<Typography variant="subtitle1" gutterBottom>
							Winning Percentage: {WinningPourcentage}%
						</Typography>
					</Typography>
					<TableContainer component={Paper}>
						<Table stickyHeader aria-label="sticky table">
							<TableHead>
								<TableRow>
									<TableCell>
										{' '}
										<EmojiEventsIcon
											sx={{
												color: '#ffd700',
											}}
										/>{' '}
										Win{' '}
									</TableCell>
									<TableCell>
										{' '}
										<SwapVertIcon
											sx={{
												color: 'orange',
											}}
										/>{' '}
										Draw
									</TableCell>
									<TableCell>
										{' '}
										<ArrowCircleDownIcon
											sx={{
												color: 'red',
											}}
										/>{' '}
										Loose
									</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								<TableRow>
									<TableCell> {userMatchWin} </TableCell>
									<TableCell> {userMatchDraw} </TableCell>
									<TableCell> {userMatchLoose} </TableCell>
								</TableRow>
							</TableBody>
						</Table>
					</TableContainer>
				</CardContent>
			</Card>
		</Box>
	);
};
export default Profil;
