import { Box, Container } from '@mui/material';
import Footer from '../components/footer';
import Header from '../components/header';
import { useJwtAdmin } from '../hooks/useJwt';

const BaseLayout = ({ children }) => {
	useJwtAdmin()
	return (
		<>
			{/* <CssBaseline /> */}
			<Box display="flex" minHeight="100vh" flexDirection="column">
				<Header forceRefresh={true} />
				<Box flex={1}>
					<main>
						<Container sx={{ minWidth: '90%' }}>{children}</Container>
					</main>
				</Box>
				<Footer />
			</Box>
		</>
	);
};

export default BaseLayout;
