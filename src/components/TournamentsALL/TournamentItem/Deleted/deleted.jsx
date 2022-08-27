import { Button, CircularProgress } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { jwtAtom } from "../../../../atoms/jwtAtom";
import { useDelete } from "../../../../hooks/useQuery";

const Delete = ({onDeleted,onRun}) =>{
    const [token, setToken] = useRecoilState(jwtAtom);
    const navigate = useNavigate();
    const id = onDeleted
    const run = onRun

    const { data, isLoading, errors } = useDelete(
        import.meta.env.VITE_API_TOURNAMENT + '/' + id,
        token, run
    );
    if (isLoading && run) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <CircularProgress />
            </Box>
        );
    }
    if (errors) {
        console.log('test');
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}>{errors}</Box>;
    }

    if (!isLoading && run) {
        navigate('/admin-panel');
    }

    return 'Delete'
}
export default Delete