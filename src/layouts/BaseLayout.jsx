import { Box, Container, CssBaseline } from '@mui/material';
import { render } from 'react-dom';
import Footer from '../components/footer';
import Header from '../components/header';

const BaseLayout = ({ children }) => {
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
