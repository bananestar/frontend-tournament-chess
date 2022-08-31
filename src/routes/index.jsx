import TournamentInfo from '../pages/tournamentInfo';
import HomePage from '../pages/Home';
import TournamentPage from '../pages/tournaments';
import NotFoundPage from '../pages/notfound';
import LoginPage from '../pages/login';
import SignInPage from '../pages/signIn';
import AdminPage from '../pages/Admin';
import DeletedTournament from '../components/TournamentsALL/TournamentItem/Deleted';
import UpdatedTournament from '../components/TournamentsALL/TournamentItem/Updated';
import ProfilPage from '../pages/profil';
import MatchEditor from '../components/TournamentsALL/TournamentInfo/MatchEditor';

export const appRoutes = [
  { path: '', element: <HomePage /> },
  { path: 'sign-in', element: <SignInPage /> },
  { path: 'login', element: <LoginPage /> },
  { path: 'profil', element: <ProfilPage /> },
  { path: 'all-tournaments', element: <TournamentPage /> },
  { path: 'all-tournaments/panel-info', element: <TournamentInfo /> },
  { path: 'admin-panel/match/panel-editor', element: <MatchEditor /> },
  { path: 'admin-panel/tournaments/panel-updated', element: <UpdatedTournament /> },
  { path: 'admin-panel/tournaments/panel-deleted', element: <DeletedTournament /> },
  { path: 'admin-panel', element: <AdminPage /> },
  { path: '*', element: <NotFoundPage /> },
];
