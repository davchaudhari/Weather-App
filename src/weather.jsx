import { useState, useEffect } from 'react';

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
        setWeatherData([]); // Reset weather data
        setError(null);
  
        for (const city of cities) {
          const apiKey = import.meta.env.VITE_APP_WEATHERBIT_API_KEY;
          const url = `https://api.weatherbit.io/v2.0/current?city=${city}&key=${apiKey}`;
  
          try {
            const response = await fetch(url);
            if (!response.ok) throw new Error(`Weather data could not be fetched for ${city}.`);
            const data = await response.json();
            setWeatherData(prev => [...prev, data.data[0]]);
          } catch (err) {
            setError(err.message);
            // Continue fetching data for other cities even if one fails
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
                <p>City: {data.city_name}</p>
                <p>Temperature: {data.temp}°C</p>
                <p>Weather: {data.weather.description}</p>
              </div>
            ))}
            <p>Average Temperature: {averageTemp.toFixed(2)}°C</p>
          </div>
        )}
      </div>
    );
  }
  
  export default WeatherDashboard;


