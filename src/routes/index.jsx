import TournamentInfo from '../pages/tournamentInfo';
import Home from '../pages/Home';
import Tournaments from '../pages/tournaments';
import NotFound from '../pages/notfound';
import Login from '../pages/login';
import SignInPage from '../pages/signIn';

export const appRoutes = [
  { path: '', element: <Home /> },
  { path: 'sign-in', element: <SignInPage /> },
  { path: 'login', element: <Login /> },
  { path: 'all-tournaments', element: <Tournaments /> },
  { path: 'info-tournament', element: <TournamentInfo /> },
  { path: '*', element: <NotFound /> },
];
