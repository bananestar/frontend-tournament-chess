import {
	CircularProgress,
	IconButton,
	InputBase,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
} from '@mui/material';
import BuildIcon from '@mui/icons-material/Build';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
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

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto',
	},
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '20ch',
			},
		},
	},
}));

const DisplayAll = ({ onData }) => {
	const [page, setPage] = useState(0);
	const [rows, setRows] = useState([]);
	const [rowsSave, setRowsSave] = useState([]);
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [searched, setSearched] = useState('');
	const [filterRows, setFilterRows] = useState('');

	const data = onData;

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
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

	useEffect(() => {
		setFilterRows(
			rows.filter((row) => {
				const searchByPseudo = row.pseudo
					.toString()
					.toLowerCase()
					.includes(searched.toString().toLowerCase());
				const searchByEmail = row.email
					.toString()
					.toLowerCase()
					.includes(searched.toString().toLowerCase());
				if (searchByPseudo) {
					return searchByPseudo;
				}
				if (searchByEmail) {
					return searchByEmail;
				}
			})
		);
		setRows(filterRows);

		console.log('after =========>', rowsSave);
		if (searched === '') {
			setRows(rowsSave);
		}
	}, [searched]);

	if (rows && rowsSave) {
		return (
			<Paper sx={{ width: '100%', overflow: 'hidden' }}>
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ 'aria-label': 'search' }}
						value={searched}
						onBlur={(e) => setSearched(e.target.value)}
						onChange={(e) => setSearched(e.target.value)}
					/>
				</Search>
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
															<IconButton>
																<SearchIcon />
															</IconButton>
															<IconButton>
																<BuildIcon />
															</IconButton>
															<IconButton>
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
