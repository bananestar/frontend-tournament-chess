import { Button } from '@mui/material';
import { Box, Container } from '@mui/system';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import Delete from './deleted';

const Deleted = () => {
	const location = useLocation();
	const { handleSubmit } = useForm();
	const state = location.state;
	const idTournament = state.id;
	const name = state.name;
	const [run, setRun] = useState(false);
	console.log(run);

	return (
		<Box>
			<Container>
				<h2>Are you sure to delete {name} </h2>
			</Container>
			<Container>
				<Button
					onClick={() => {
						setRun(true);
					}}
					variant="outlined"
					sx={{
						borderColor: 'red',
						color: 'red',
						':hover': { backgroundColor: 'red', color: 'white' },
					}}
				>
					<Delete onDeleted={idTournament} onRun={run} />
				</Button>
				&nbsp; &nbsp;
				<Button margin="dense" component={Link} to="/admin-panel">
					Back
				</Button>
			</Container>
		</Box>
	);
};
export default Deleted;
