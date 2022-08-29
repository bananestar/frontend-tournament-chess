import TournamentInfo from '../pages/tournamentInfo';
import Home from '../pages/Home';
import Tournaments from '../pages/tournaments';
import NotFound from '../pages/notfound';
import Login from '../pages/login';
import SignInPage from '../pages/signIn';
import AdminPage from '../pages/Admin';
import DeletedTournament from '../components/TournamentsALL/TournamentItem/Deleted';
import UpdatedTournament from '../components/TournamentsALL/TournamentItem/Updated';

export const appRoutes = [
  { path: '', element: <Home /> },
  { path: 'sign-in', element: <SignInPage /> },
  { path: 'login', element: <Login /> },
  { path: 'all-tournaments', element: <Tournaments /> },
  { path: 'all-tournaments/panel-info', element: <TournamentInfo /> },
  { path: 'admin-panel/tournaments/panel-updated', element: <UpdatedTournament /> },
  { path: 'admin-panel/tournaments/panel-deleted', element: <DeletedTournament /> },
  { path: 'admin-panel', element: <AdminPage /> },
  { path: '*', element: <NotFound /> },
];
