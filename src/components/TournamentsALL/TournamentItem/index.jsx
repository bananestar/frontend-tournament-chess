import FemaleIcon from '@mui/icons-material/Female';
import WcIcon from '@mui/icons-material/Wc';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import SearchIcon from '@mui/icons-material/Search';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import HowManyUser from './HowManyUser';
import { adminAtom } from '../../../atoms/jwtAtom';
import { useRecoilState } from 'recoil';

const columns = [
	{ id: 'name', label: 'Name', minWidth: 170 },
	{ id: 'location', label: 'Location', minWidth: 170 },
	{ id: 'category', label: 'Category', minWidth: 170 },
	{ id: 'womenOnly', label: 'Sex', minWidth: 170 },
	{ id: 'elo', label: 'Elo', minWidth: 170 },
	{ id: 'statut', label: 'Statut', minWidth: 170 },
	{
		id: 'registrationEND',
		label: 'Registration End',
		minWidth: 170,
		format: (value) => value.toLocaleString('fr-BE'),
	},
	{ id: 'player', label: 'Player', minWidth: 170 },
	{ id: 'action', label: '', minWidth: 170 },
];

const TournamentItem = (onData) => {
	const data = onData.onData;
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const pathLocation = useLocation().pathname;

	const [isAdmin, setIsAdmin] = useRecoilState(adminAtom);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const createData = (
		name,
		location,
		category,
		womenOnly,
		eloMin,
		eloMax,
		statut,
		registrationAt,
		playersMax,
		id
	) => {
		const elo = eloMin + ' - ' + eloMax;
		const registrationEND = new Date(registrationAt).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
		const player = '/' + playersMax;
		return { name, location, category, womenOnly, elo, statut, registrationEND, player, id };
	};

	useEffect(() => {
		let newData = data.map((e) => {
			return createData(
				e.name,
				e.location,
				e.category,
				e.womenOnly,
				e.EloMin,
				e.EloMax,
				e.statut,
				e.registrationAt,
				e.PlayersMax,
				e.id
			);
		});
		setRows(newData);
	}, []);

	return (
		<Paper sx={{ width: '100%', overflow: 'hidden' }}>
			<TableContainer>
				<Table stickyHeader aria-label="sticky table">
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
							return (
								<TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
									{columns.map((column) => {
										const value = row[column.id];
										return (
											<TableCell key={column.id} align={column.align}>
												{column.id === 'player' ? (
													<>
														<HowManyUser onData={row.id} />
														{value}
													</>
												) : (
													value
												)}
												{column.id === 'womenOnly' ? value ? <FemaleIcon /> : <WcIcon /> : ''}
												{column.id === 'action' ? (
													<>
														<IconButton
															component={Link}
															to="/all-tournaments/panel-info"
															state={{ id: row.id, name: row.name }}
														>
															<SearchIcon />
														</IconButton>
														{isAdmin && pathLocation==='/admin-panel' ? (
															<>
																<IconButton
																sx={{
																	borderColor: 'yellow',
																	color: '#CFAB27',
																	':hover': { backgroundColor: '#CFAB27', color: 'white' },
																}}
																	component={Link}
																	to="/admin-panel/tournaments/panel-updated"
																	state={{ data: row }}
																>
																	<BuildIcon />
																</IconButton>
																<IconButton
																	sx={{
																		borderColor: 'red',
																		color: 'red',
																		':hover': { backgroundColor: 'red', color: 'white' },
																	}}
																	component={Link}
																	to="/admin-panel/tournaments/panel-deleted"
																	state={{ id: row.id, name: row.name }}
																>
																	<DeleteIcon />
																</IconButton>
															</>
														) : (
															''
														)}
													</>
												) : (
													''
												)}
											</TableCell>
										);
									})}
								</TableRow>
							);
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
		</Paper>
	);
};

export default TournamentItem;
