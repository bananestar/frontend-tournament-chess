import { Alert, CircularProgress } from "@mui/material";
import { useRegister } from "../../../hooks/useQuery"

const SignInRequest = (onRegisters) => {
    const registers = onRegisters.onRegisters
    if (registers) {
        const {isLoading, errors} = useRegister(import.meta.env.VITE_API_REGISTER,registers)
        if (isLoading) {
			return <CircularProgress />;
		}

		if (errors) {
			console.log(errors);
			return (
				<Alert margin="dense" severity="error">
					ERROR Identifier and Password was wrong
				</Alert>
			);
		}
    }
    return <></>;
}

export default SignInRequest