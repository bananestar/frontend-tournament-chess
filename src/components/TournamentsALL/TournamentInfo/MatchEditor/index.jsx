import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import { Box, Container } from '@mui/system';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AddMatch from './addMatch';
import Editor from './editor-v2';
import RequestDelete from './requestDelete';
import RequestUpdate from './requestUpdate';

const style = {
	position: 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',

	bgcolor: 'white',
	border: '1px solid #000',
	borderRadius: '16px',
	boxShadow: 24,
	modal: 2000,
	pt: 2,
	px: 2,
	pb: 2,
};

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
	const [request, setRequest] = useState();
	const [run, setRun] = useState(false);
	const [updated, setUpdated] = useState(false);
	const [deleted, setDeleted] = useState(false);
	const [idMatch, setIdMatch] = useState();

	const dataMatch = state.data;
	const dataUsers = state.users;
	const dataRegisters = state.registers;
	const idTournament = state.idTournament;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const createCellMatch = (playerWhite, playerBlack, result, id) => {
		return {
			id: id,
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

			return createCellMatch(playerWhite[0].pseudo, playerBlack[0].pseudo, e.result, e.id);
		});

		const list = dataRegisters.map((e) => {
			const user = dataUsers.filter((user) => user.id === e.userId);
			return user[0].pseudo;
		});

		setListerUser(list);
		setRows(formatedMatch);
	}, []);

	const handleUpdatePlayer = (id, player, colorPlayer) => {
		setRows((rows) => rows.map((row) => (row.id !== id ? row : { ...row, [colorPlayer]: player })));
	};

	const handleUpdateResult = (id, result) => {
		setRows((rows) => rows.map((row) => (row.id !== id ? row : { ...row, ['result']: result })));
	};

	const handleDeleteMatch = (id) => {
		setRows((rows) => rows.filter((row) => row.id !== id));
		setIdMatch(id);
		setUpdated(false);
		setDeleted(true);
		setRun(true)
	};

	const handleUpdateMatch = (id) => {
		rows.map((row) => {
			if (row.id === id) {
				const playerWhite = dataUsers.filter(({ id, pseudo }) => {
					if (pseudo === row.playerWhite) {
						return id;
					}
				});
				const playerBlack = dataUsers.filter(({ id, pseudo }) => {
					if (pseudo === row.playerBlack) {
						return id;
					}
				});
				setRequest({
					result: row.result,
					tournamentId: idTournament,
					playerWhiteId: playerWhite[0].id,
					playerBlackId: playerBlack[0].id,
				});
				setIdMatch(id);
				setUpdated(true);
				setDeleted(false);
				setRun(true)
			}
		});
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
		<>
			{updated ? (
				<RequestUpdate
					run={run}
					request={request}
					id={idMatch}
					callbackRun={(res) => setRun(res)}
				/>
			) : (
				''
			)}
			{deleted ? <RequestDelete run={run} id={idMatch} callbackRun={(res) => setRun(res)} /> : ''}

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
													updatePlayer={(player, color) =>
														handleUpdatePlayer(row.id, player, color)
													}
													updateResult={(result) => handleUpdateResult(row.id, result)}
													deleteMatch={() => handleDeleteMatch(row.id)}
													updateMatch={() => handleUpdateMatch(row.id)}
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
					<AddMatch users={listUser}/>
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
		</>
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
