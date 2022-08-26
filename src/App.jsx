import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import Header from './components/header';
import BaseLayout from './layouts/BaseLayout';
import AdminPage from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/login';
import NotFound from './pages/notfound';
import SignInPage from './pages/signIn';
import TournamentInfo from './pages/tournamentInfo';
import Tournaments from './pages/tournaments';

function App() {
	return (
		<BrowserRouter forceRefresh={true}>
			<BaseLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/all-tournaments" element={<Tournaments />} />
					<Route path="/info-tournament" element={<TournamentInfo />} />
					<Route path="/admin-panel" element={<AdminPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BaseLayout>
		</BrowserRouter>
	);
}

export default App;
