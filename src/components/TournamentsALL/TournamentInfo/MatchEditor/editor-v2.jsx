import { IconButton, MenuItem, Select, TableCell } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useId, useState } from 'react';

const EditorPlayer = ({ users, selectedUser, changeUser }) => {
	const id = useId();

	return (
		<TableCell>
			<Select
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

const Editor = ({ playerWhite, playerBlack, result, users, updatePlayer, deleteMatch }) => {
	return (
		<>
			<EditorPlayer
				users={users}
				selectedUser={playerWhite}
				changeUser={(player) => updatePlayer(player, 'playerWhite')}
			/>
			<EditorPlayer
				users={users}
				selectedUser={playerBlack}
				changeUser={(player) => updatePlayer(player, 'playerBlack')}
			/>
			<TableCell>{result}</TableCell>
			<TableCell>
				<IconButton onClick={() => console.log('click editor')}>
					<BuildIcon />
				</IconButton>
				<IconButton>
					<DeleteIcon onClick={() => deleteMatch()} />
				</IconButton>
			</TableCell>
		</>
	);
};

export default Editor;
