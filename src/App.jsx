import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WeatherDashboard from './weather'; 
import CityDetail from './detail.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherDashboard />} />
        <Route path="/city/:cityName" element={<CityDetail />} />
      </Routes>
    </Router>
  );
}

