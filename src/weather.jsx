import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Link } from 'react-router-dom';

function WeatherDashboard() {
    const [cities, setCities] = useState(['Raleigh']); // Initialize with one city
    const [inputCity, setInputCity] = useState('');
    const [weatherData, setWeatherData] = useState([]);
    const [tempFilter, setTempFilter] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchWeatherData = async () => {
        setIsLoading(true);
        setWeatherData([]);
        setError(null);
  
        for (const city of cities) {
          const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=b5850aedd55841f99c23f98513ddba40`;
  
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Weather data could not be fetched for ${city}.`);
            const data = await response.json();
            setWeatherData(prev => [...prev, data.data[0]]);
          } catch (err) {
            setError(err.message);
          }
        }
  
        setIsLoading(false);
      };
  
      fetchWeatherData();
    }, [cities]);
  
    const handleAddCity = () => {
      if (inputCity && !cities.includes(inputCity)) {
        setCities([...cities, inputCity]);
        setInputCity(''); // Clear the input field
      }
    };
  
    const displayedData = weatherData.filter(data => data.temp >= tempFilter);
    const averageTemp = displayedData.reduce((acc, curr) => acc + curr.temp, 0) / displayedData.length || 0;
  
    return (
      <div>
        <h1>Weather Dashboard</h1>
        <input
          type="text"
          value={inputCity}
          onChange={(e) => setInputCity(e.target.value)}
          placeholder="Add a city"
        />
        <button onClick={handleAddCity}>Add City</button>
        <div>
          <input type="range" min="-50" max="50" value={tempFilter} onChange={(e) => setTempFilter(Number(e.target.value))} />
          <p>Filter temperature above: {tempFilter}°C</p>
        </div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error}</div>}
        {displayedData.length > 0 && (
          <div>
            {displayedData.map((data) => (
              <div key={data.city_name}>
              <Link to={`/city/${data.city_name}`}>
                <p>City: {data.city_name}</p>
              </Link>
              <p>Temperature: {data.temp}°C</p>
              <p>Weather: {data.weather.description}</p>
            </div>
            ))}
            <p>Average Temperature: {averageTemp.toFixed(2)}°C</p>
          </div>
        )}
        <BarChart width={600} height={300} data={weatherData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="city_name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="temp" fill="#8884d8" />
      </BarChart>
      </div>
    );
  }
  
  export default WeatherDashboard;


