import { Route, Routes, useRoutes } from 'react-router-dom';
import Home from './pages/Home';
import TournamentInfo from './pages/tournamentInfo';
import Tournaments from './pages/tournaments';


function App() {
	return (
		<Routes>
			<Route path='/' element={<Home/>} />
			<Route path='/all-tournaments' element={<Tournaments/>} />
			<Route path='/info-tournament' element={<TournamentInfo/>} />
		</Routes>
	);
}

export default App;
