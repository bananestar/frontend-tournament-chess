import {
	IconButton,
	InputLabel,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Editor from './editor-v2';
import { nanoid } from 'nanoid';

const columns = [
	{ id: 'playerWhite', label: 'Player White' },
	{ id: 'playerBlack', label: 'Player Black' },
	{ id: 'result', label: 'Result' },
	{ id: 'action', label: 'Action' },
];

const MatchEditor = () => {
	const state = useLocation().state;
	const [rows, setRows] = useState([]);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [listUser, setListerUser] = useState([]);

	const [updateWhitePlayer, setUpdateWhitePlayer] = useState('');
	const [updateBlackPlayer, setUpdateBlackPlayer] = useState('');
	const [updateResult, setUpdateResult] = useState('');
	const [update, setUpdate] = useState(true);

	const dataMatch = state.data;
	const dataUsers = state.users;
	const dataRegisters = state.registers;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const createCellMatch = (playerWhite, playerBlack, result) => {
		return {
			id: nanoid(),
			playerWhite,
			playerBlack,
			result,
		};
	};

	useEffect(() => {
		const formatedMatch = dataMatch.map((e) => {
			const playerWhite = dataUsers.filter(({ id, pseudo }) => {
				if (id === e.playerWhiteId) {
					return pseudo;
				}
			});

			const playerBlack = dataUsers.filter(({ id, pseudo }) => {
				if (id === e.playerBlackId) {
					return pseudo;
				}
			});

			return createCellMatch(playerWhite[0].pseudo, playerBlack[0].pseudo, e.result, e.updatedAt);
		});

		const list = dataRegisters.map((e) => {
			// console.log(e.userId);
			const user = dataUsers.filter((user) => user.id === e.userId);
			return user[0].pseudo;
		});
		// console.log(list);

		setListerUser(list);
		setRows(formatedMatch);
	}, []);

	const handleUpdatePlayer = (id, player, colorPlayer) => {
		setRows((rows) => rows.map((row) => (row.id !== id ? row : { ...row, [colorPlayer]: player })));
	};

	const handleDeleteMatch = (id) => {
		setRows((rows) => rows.filter((row) => row.id !== id));
	};

	// console.log('dataMatch');
	// console.log(dataMatch);
	// console.log('--------');
	// console.log('dataRegisters');
	// console.log(dataRegisters);
	// console.log('--------');
	// console.log('dataUsers');
	// console.log(dataUsers);
	// console.log('--------');

	return (
		<Box sx={{ display: 'flex', justifyContent: 'center' }}>
			<Container>
				<h1>Match</h1>
				<TableContainer component={Paper}>
					<Table sx={{ minWidth: 650 }} aria-label="simple table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
								{
									return (
										<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
											<Editor
												{...row}
												users={listUser}
												updatePlayer={(player, color) => handleUpdatePlayer(row.id, player, color)}
												deleteMatch={() => handleDeleteMatch(row.id)}
											/>
										</TableRow>
									);
								}
							})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Container>
			<Container>
				<h1>Add Match</h1>
			</Container>
			<Container>
				<h1>List User of tournament</h1>
				{listUser.map((user, index) => {
					return (
						<>
							{index + 1} {user} <br />
						</>
					);
				})}
			</Container>
		</Box>
	);
};
export default MatchEditor;

// dataMatch
// [
//     {
//         "id": 2,
//         "result": "BlackWin",
//         "createdAt": "2022-08-31T12:12:46.000Z",
//         "updatedAt": "2022-08-31T12:12:46.000Z",
//         "tournamentId": 1,
//         "playerWhiteId": 188,
//         "playerBlackId": 173
//     },
//     {
//         "id": 90,
//         "result": "BlackWin",
//         "createdAt": "2022-08-31T12:12:47.000Z",
//         "updatedAt": "2022-08-31T12:12:47.000Z",
//         "tournamentId": 1,
//         "playerWhiteId": 88,
//         "playerBlackId": 140
//     }
// ]

// dataRegisters
// [
//     {
//         "id": 3,
//         "createdAt": "2022-08-31T12:12:46.000Z",
//         "updatedAt": "2022-08-31T12:12:46.000Z",
//         "tournamentId": 1,
//         "userId": 188
//     },
//     {
//         "id": 4,
//         "createdAt": "2022-08-31T12:12:46.000Z",
//         "updatedAt": "2022-08-31T12:12:46.000Z",
//         "tournamentId": 1,
//         "userId": 173
//     },
//     {
//         "id": 179,
//         "createdAt": "2022-08-31T12:12:47.000Z",
//         "updatedAt": "2022-08-31T12:12:47.000Z",
//         "tournamentId": 1,
//         "userId": 88
//     },
//     {
//         "id": 180,
//         "createdAt": "2022-08-31T12:12:47.000Z",
//         "updatedAt": "2022-08-31T12:12:47.000Z",
//         "tournamentId": 1,
//         "userId": 140
//     },
//     {
//         "id": 201,
//         "createdAt": "2022-08-31T12:21:48.000Z",
//         "updatedAt": "2022-08-31T12:21:48.000Z",
//         "tournamentId": 1,
//         "userId": 202
//     }
// ]
