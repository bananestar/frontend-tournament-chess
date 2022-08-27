import { Box, CircularProgress } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import {useQuery} from '../../../hooks/useQuery';

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import MatchInfo from './matchItem';

const TournamentInfo = () => {
	const location = useLocation();
	const [rows, setRows] = useState([]);
	const state = location.state;
	const idTournament = state.id;

	const { data, isLoading, errors } = useQuery(
		import.meta.env.VITE_API_MATCH_BY_TOURNAMENT + idTournament,
		{}
	);

	const datas = useQuery(import.meta.env.VITE_API_MATCH_USER, {});

	if (isLoading || datas.isLoading) {
		return (
			<Box sx={{ display: 'flex', justifyContent: 'center' }}>
				<CircularProgress />
			</Box>
		);
	}

	if (errors || datas.errors) {
		console.log('test');
		return <Box sx={{ display: 'flex', justifyContent: 'center' }}>{errors}</Box>;
	}

	const { results } = data;
	const users = datas.data.results;

	console.log(results);

	return (
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
						return <MatchInfo match={{ row, users }} key={row.id} />;
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};

export default TournamentInfo;
