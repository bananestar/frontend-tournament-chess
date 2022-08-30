import {
	CircularProgress,
	IconButton,
	InputAdornment,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	TextField,
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Box } from '@mui/system';

const columns = [
	{ id: 'id', label: 'ID', minWidth: 170 },
	{ id: 'pseudo', label: 'Pseudo', minWidth: 170 },
	{ id: 'email', label: 'Email', minWidth: 170 },
	{ id: 'isAdmin', label: 'Admin', minWidth: 170 },
	{ id: 'createdAt', label: 'CreatedAt', minWidth: 170 },
	{ id: 'updatedAt', label: 'UpdatedAt', minWidth: 170 },
	{ id: 'action', label: '', minWidth: 170 },
];

const DisplayAll = ({ onData }) => {
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [rowsSave, setRowsSave] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searched, setSearched] = useState('');

	const data = onData;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	const requestSearch = (searched) => {
		setSearched(searched);

		if (!searched) {
			setRows(rowsSave);
		} else {
			setRows(
				rows.filter((row) => {
					if (row.pseudo.toString().toLowerCase().startsWith(searched.toString().toLowerCase())) {
						return row.pseudo.toString().toLowerCase();
					}
					if (row.email.toString().toLowerCase().startsWith(searched.toString().toLowerCase())) {
						return row.email.toString().toLowerCase();
					}
				})
			);
		}
	};

	const createData = (id, pseudo, email, is_Admin, created_At, updated_At) => {
		const createdAt = new Date(created_At).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
		const updatedAt = new Date(updated_At).toLocaleDateString('fr-FR', {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		});
		const isAdmin = is_Admin ? '✅' : '❌';
		return { id, pseudo, email, isAdmin, createdAt, updatedAt };
	};

	useEffect(() => {
		const newData = data.map((e) => {
			return createData(e.id, e.pseudo, e.email, e.isAdmin, e.createdAt, e.updatedAt);
		});
		setRows(newData);
		setRowsSave(newData);
	}, []);

	if (rows && rowsSave) {
		return (
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<TextField
					variant="outlined"
					placeholder="search..."
					value={searched}
					type="search"
					InputProps={{
						startAdornment: (
							<InputAdornment position="start">
								<SearchIcon />
							</InputAdornment>
						),
					}}
					onInput={(e) => requestSearch(e.target.value)}
				/>
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
													{column.id === 'action' ? (
														<>
															<IconButton
																component={Link}
																to=""
																state={{ id: row.id, name: row.name }}
															>
																<SearchIcon />
															</IconButton>
															<IconButton
																sx={{
																	borderColor: 'yellow',
																	color: '#CFAB27',
																	':hover': { backgroundColor: '#CFAB27', color: 'white' },
																}}
																component={Link}
																to=""
																state={{ id: row.id, name: row.name }}
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
																to=""
																state={{ id: row.id, name: row.name }}
															>
																<DeleteIcon />
															</IconButton>
														</>
													) : (
														''
													)}
													{value}
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
	} else {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}
};

export default DisplayAll;
