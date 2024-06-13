import React, { useState } from 'react';
import axios from 'axios';


const AppClima = () => {
    const [location, setLocation] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');

    const fetchWeather = async () => {
        if (!location) {
            setError('Location is required');
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/weather?location=${location}`);
            setWeather(response.data);
            setError('');
            
        } catch (error) {
            setError('Error fetching weather data');
        }
    };

    const getPosition = (weather) => {
        return [weather.coord.lat, weather.coord.lon];
    };

    return (
        <div style={contentStyle}>
            <input 
                type="text" 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
                placeholder="Ingresa una Ciudad" 
                style={inputStyle}
            />
            <button
                onClick={fetchWeather} 
                style={buttonStyle}
            ><strong>BUSCAR</strong>
            </button>

            {error && <p style={errorStyle}>{error}</p>}

            {weather && (
                <div style={divData}>
                    <h2 style={h2Style}>{weather.name}</h2>
                    <p style={pStyle}>{weather.main.temp} °C</p>
                    <p style={pStyle2}>{weather.weather[0].description}</p>
                </div>
            )}
            
        </div>
    );
};

const contentStyle = {
    justifyContent: 'center',
    alignContent: 'center',
    textAlign: 'center',
    fontFamily: 'cursive'
};

const inputStyle = {
    padding: '10px',
    marginRight: '10px',
    borderRadius: '15px',
    background: '#eee',
    border: '0 solid #555',
    textAlign: 'center',
    fontSize: '30px',
    fontFamily: 'cursive',
    opacity: '50%'
};

const buttonStyle = {
    textAlign: 'center',
    margin: '15px 0 0 0',
    padding: '20px 40px',
    borderRadius: '20px',
    background: 'lightgray',
    fontSize: '35px',
    border: '0 solid #333',
    fontFamily: 'cursive',
    cursor: 'pointer',
    color: '#222'
};

const errorStyle = {
    color: 'darkred'
};

const divData = {
    display: 'flex',
    margin: '25px auto',
    flexDirection: 'column',
    width: '300px',
    borderRadius: '5%',
    border: '5px ridge rgba(100, 170, 220, .8)',
    color: '#444'
};

const h2Style = {
    fontSize: '40px',
    margin: '0',
    padding: '0'
}

const pStyle = {
    fontSize: '25px',
    margin: '0',
    padding: '0'
}

const pStyle2 = {
    fontSize: '30px',
    margin: '0',
    padding: '0'
}

export default AppClima;
