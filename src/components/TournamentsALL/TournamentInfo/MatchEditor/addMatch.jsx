import {
	IconButton,
	MenuItem,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useState } from 'react';

const AddMatch = ({ users }) => {
	const [playerWhite, setPlayerWhite] = useState('');
	const [playerBlack, setPlayerBlack] = useState('');
	const [result, setResult] = useState('');
	return (
		<TableContainer>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				<TableHead>
					<TableRow>
						<TableCell>Player White</TableCell>
						<TableCell>Player Black</TableCell>
						<TableCell>Result</TableCell>
						<TableCell>Action</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					<TableRow>
						<TableCell>
							<Select
								labelId={'playerWhite-select-label'}
								id={'playerWhite-select'}
								margin="dense"
								size="small"
								value={playerWhite}
								fullWidth
								onChange={(e) => setPlayerWhite(e.target.value)}
							>
								{users.map((user) => {
									return <MenuItem value={user}>{user}</MenuItem>;
								})}
							</Select>
						</TableCell>
						<TableCell>
							<Select
								labelId={'playerBlack-select-label'}
								id={'playerBlack-select'}
								margin="dense"
								size="small"
								value={playerBlack}
								fullWidth
								onChange={(e) => setPlayerBlack(e.target.value)}
							>
								{users.map((user) => {
									return <MenuItem value={user}>{user}</MenuItem>;
								})}
							</Select>
						</TableCell>
						<TableCell>
							<Select
								labelId={'result-select-label'}
								id={'result-select'}
								margin="dense"
								size="small"
								value={result}
								fullWidth
								onChange={(e) => setResult(e.target.value)}
							>
								<MenuItem value="NotPlayed">NotPlayed</MenuItem>
								<MenuItem value="WhiteWin">WhiteWin</MenuItem>
								<MenuItem value="BlackWin">BlackWin</MenuItem>
								<MenuItem value="Draw">Draw</MenuItem>
							</Select>
						</TableCell>
						<TableCell>
							<IconButton>
								<AddCircleIcon />
							</IconButton>
						</TableCell>
					</TableRow>
				</TableBody>
			</Table>
		</TableContainer>
	);
};
export default AddMatch;
