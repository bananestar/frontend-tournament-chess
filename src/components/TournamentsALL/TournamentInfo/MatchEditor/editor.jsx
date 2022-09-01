import { IconButton, MenuItem, Select, TableCell } from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

const Editor = ({ row, column, users }) => {
	const value = row[column.id];

	const [wPlayer, setwPlayer] = useState(value);
	useEffect(() => {
		setwPlayer(value);
	}, [value]);

	// return <TableCell></TableCell>
	if (column.id === 'playerWhite') {
		return (
			<TableCell key={column.id}>
				<Select
					labelId={column.id + '-select-label'}
					id={column.id + '-select'}
					margin="dense"
					size="small"
					value={wPlayer}
					fullWidth
					onChange={(e) => setwPlayer(e.target.value)}
				>
					{users.map((user) => {
						return <MenuItem value={user}>{user}</MenuItem>;
					})}
				</Select>
			</TableCell>
		);
	}
	if (column.id === 'action') {
		return (
			<TableCell key={column.id}>
				<IconButton onClick={() => console.log('click editor')}>
					<BuildIcon />
				</IconButton>
				<IconButton>
					<DeleteIcon />
				</IconButton>
			</TableCell>
		);
	}
};

export default Editor;
