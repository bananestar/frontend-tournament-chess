import TournamentInfo from '../pages/tournamentInfo';
import Home from '../pages/Home';
import Tournaments from '../pages/tournaments';

export const appRoutes = [
  { path: '', element: <Home /> },
  { path: 'all-tournaments', element: <Tournaments /> },
  { path: 'info-tournament', element: <TournamentInfo /> },
];
