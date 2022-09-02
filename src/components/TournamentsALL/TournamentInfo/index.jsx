import { Alert, Box, CircularProgress, IconButton } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '../../../hooks/useQuery';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MatchItem from './matchItem';
import BuildIcon from '@mui/icons-material/Build';
import { useRecoilState } from 'recoil';
import { adminAtom } from '../../../atoms/jwtAtom';

const TournamentInfo = () => {
	const [isAdmin, setIsAdmin] = useRecoilState(adminAtom);
	const location = useLocation();
	const [rows, setRows] = useState([]);
	const state = location.state;
	const idTournament = state.id;

	const { data, isLoading, errors } = useQuery(
		import.meta.env.VITE_API_MATCH_BY_TOURNAMENT + idTournament,
		{}
	);

	const dataUsers = useQuery(import.meta.env.VITE_API_MATCH_USER, {});
	const dataRegisters = useQuery(import.meta.env.VITE_API_REGISTRATION_BY_TOURNAMENT + idTournament, {});

	if (isLoading || dataUsers.isLoading || dataRegisters.isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}

	if (errors || dataUsers.errors || dataRegisters.errors) {
		console.log('test');
		return (
			<Alert margin="dense" severity="error">
				ERROR
				<pre>{JSON.stringify(errors)}</pre>
			</Alert>
		);
	}

	const { results } = data;
	const users = dataUsers.data.results;
	const registers = dataRegisters.data.results

	return (
		<>
			{isAdmin ? (
				<IconButton
					component={Link}
					to="/admin-panel/match/panel-editor"
					state={{ data: results, users: users , registers: registers, idTournament: idTournament}}
				>
					<BuildIcon />
					Editor
				</IconButton>
			) : (
				''
			)}
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Player White</TableCell>
							<TableCell>Player Black</TableCell>
							<TableCell>Result</TableCell>
							<TableCell>Last Update</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{results.map((row) => {
							return <MatchItem match={{ row, users }} key={row.id} />;
						})}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default TournamentInfo;
