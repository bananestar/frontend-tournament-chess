import { IconButton, MenuItem, Select, TableCell } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useId, useState } from 'react';

const EditorPlayer = ({ users, selectedUser, lock, changeUser }) => {
	const id = useId();

	return (
		<TableCell>
			<Select
				disabled={lock}
				labelId={id + '-select-label'}
				id={id + '-select'}
				margin="dense"
				size="small"
				value={selectedUser}
				fullWidth
				onChange={(e) => changeUser(e.target.value)}
			>
				{users.map((user) => {
					return <MenuItem value={user}>{user}</MenuItem>;
				})}
			</Select>
		</TableCell>
	);
};

const EditorResult = ({ selectedResult, lock, changeResult }) => {
	const id = useId();

	return (
		<TableCell>
			<Select
				disabled={lock}
				labelId={id + '-select-label'}
				id={id + '-select'}
				margin="dense"
				size="small"
				value={selectedResult}
				fullWidth
				onChange={(e) => changeResult(e.target.value)}
			>
				<MenuItem value="NotPlayed">NotPlayed</MenuItem>
				<MenuItem value="WhiteWin">WhiteWin</MenuItem>
				<MenuItem value="BlackWin">BlackWin</MenuItem>
				<MenuItem value="Draw">Draw</MenuItem>
			</Select>
		</TableCell>
	);
};

const Editor = ({
	playerWhite,
	playerBlack,
	result,
	users,
	updatePlayer,
	updateResult,
	deleteMatch,
	updateMatch
}) => {
	const [lock, setLock] = useState(true);

	const handleLock = () => {
		setLock(!lock);
	};

	return (
		<>
			<EditorPlayer
				users={users}
				selectedUser={playerWhite}
				lock={lock}
				changeUser={(player) => updatePlayer(player, 'playerWhite')}
			/>
			<EditorPlayer
				users={users}
				selectedUser={playerBlack}
				lock={lock}
				changeUser={(player) => updatePlayer(player, 'playerBlack')}
			/>
			<EditorResult
				selectedResult={result}
				lock={lock}
				changeResult={(result) => updateResult(result)}
			/>
			
			<TableCell>
				<IconButton onClick={() => handleLock()}>
					{lock ? <LockIcon /> : <LockOpenIcon />}
				</IconButton>
				<IconButton disabled={lock} onClick={() => {updateMatch(),setLock(!lock)}}>
					<BuildIcon />
				</IconButton>
				<IconButton disabled={lock}>
					<DeleteIcon onClick={() => deleteMatch()} />
				</IconButton>
			</TableCell>
		</>
	);
};

export default Editor;
