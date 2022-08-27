import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import AdminPage from './pages/Admin';
import Home from './pages/Home';
import Login from './pages/login';
import NotFound from './pages/notfound';
import SignInPage from './pages/signIn';
import TournamentInfo from './pages/tournamentInfo';
import Tournaments from './pages/tournaments';
import { useJwtAdmin } from './hooks/useJwt';
import Deleted from './components/TournamentsALL/TournamentItem/Deleted';

function App() {
	useJwtAdmin()
	return (
		<BrowserRouter forceRefresh={true}>
			<BaseLayout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/login" element={<Login />} />
					<Route path="/all-tournaments" element={<Tournaments />} />
					<Route path="/all-tournaments/info-tournament" element={<TournamentInfo />} />
					<Route path="/all-tournaments/panel-deleted" element={<Deleted />} />
					<Route path="/admin-panel" element={<AdminPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BaseLayout>
		</BrowserRouter>
	);
}

export default App;
