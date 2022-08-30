import { BrowserRouter, Route, Routes, useRoutes } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout';
import AdminPage from './pages/Admin';
import HomePage from './pages/Home';
import LoginPage from './pages/login';
import NotFound from './pages/notfound';
import SignInPage from './pages/signIn';
import TournamentInfo from './pages/tournamentInfo';
import TournamentPage from './pages/tournaments';
import { useJwtAdmin } from './hooks/useJwt';
import DeletedTournament from './components/TournamentsALL/TournamentItem/Deleted';
import UpdatedTournament from './components/TournamentsALL/TournamentItem/Updated';
import ProfilPage from './pages/profil';

function App() {
	useJwtAdmin();
	return (
		<BrowserRouter forceRefresh={true}>
			<BaseLayout>
				<Routes>
					<Route path="/" element={<HomePage />} />
					<Route path="/sign-in" element={<SignInPage />} />
					<Route path="/login" element={<LoginPage />} />
					<Route path="/profil" element={<ProfilPage />} />
					<Route path="/all-tournaments" element={<TournamentPage />} />
					<Route path="/all-tournaments/panel-info" element={<TournamentInfo />} />
					<Route path="/admin-panel/tournaments/panel-updated" element={<UpdatedTournament />} />
					<Route path="/admin-panel/tournaments/panel-deleted" element={<DeletedTournament />} />
					<Route path="/admin-panel" element={<AdminPage />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</BaseLayout>
		</BrowserRouter>
	);
}

export default App;
