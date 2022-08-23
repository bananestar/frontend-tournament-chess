import { useEffect, useState } from 'react';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';


const MatchInfo = (match) => {
	const [playerWhite, setPlayerWhite] = useState('');
	const [playerBlack, setPlayerBlack] = useState('');
	const m = match.match.row;
	const users = match.match.users;

	useEffect(() => {
		users.map(({ id, pseudo }) => {
			if (id === m.playerWhiteId) {
				setPlayerWhite(pseudo);
			}
			if (id === m.playerBlackId) {
				setPlayerBlack(pseudo);
			}
		});
	}, []);

	const updatedDateFormated = new Date(m.updatedAt).toLocaleDateString('fr-FR', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	});

	return (
		<TableRow hover role="checkbox" tabIndex={-1}>
			<TableCell key={m.playerWhiteId}>{playerWhite}</TableCell>
			<TableCell key={m.playerBlackId}>{playerBlack}</TableCell>
			<TableCell key={m.result}>{m.result}</TableCell>
			<TableCell key={m.updatedAt}>{updatedDateFormated}</TableCell>
		</TableRow>
	);
};

export default MatchInfo;
