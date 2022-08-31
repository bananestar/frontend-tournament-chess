import { IconButton } from '@mui/material';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Sub from './Sub';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { userIdAtom } from '../../../../atoms/jwtAtom';
import UnSub from './Unsub';
const ButtonSub = ({ onData, id }) => {
	const [userId, setUserId] = useRecoilState(userIdAtom);

	const [data, setData] = useState(onData.results);
  const [registrationID,setRegistrationID]= useState()
	const [run, setRun] = useState(false);
	const [isUser, setIsUser] = useState(false);

	// useEffect(() => {
	// 	console.log(run);
	// }, [run]);

	// console.log(data);
	// console.log(id+'  '+data);

	useEffect(() => {
		data.filter((row) => {
			if (row.userId === userId) {
				setIsUser(true);
        setRegistrationID(row.id)
			} else setIsUser(false);
		});
	}, []);

	// useEffect(() => {
	// 	console.log(isUser);
	// }, [isUser]);

	return (
		<IconButton
			onClick={() => {
				setRun(!run);
			}}
			sx={{
				borderColor: isUser ? 'red' : 'green',
				color: isUser ? 'red' : 'green',
				':hover': { backgroundColor: isUser ? 'red' : 'green', color: 'white' },
			}}
		>
			{isUser ? (
				<>
					<RemoveCircleOutlineIcon /> <UnSub id={registrationID} run={run} />
				</>
			) : (
				<>
					<AddCircleOutlineIcon /> <Sub id={id} run={run} />
				</>
			)}
		</IconButton>
	);
};
export default ButtonSub;
