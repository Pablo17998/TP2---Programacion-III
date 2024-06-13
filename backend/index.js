require('dotenv').config();

const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Conexión a MongoDB 
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.log(err));

// Esquema de la Base de Datos
const searchSchema = new mongoose.Schema({
    location: String
});
const Search = mongoose.model('datos', searchSchema);

// Obtencion de Datos
app.get('/api/weather', async (req, res) => {
    const {location} = req.query;;

    if (!location) {
        return res.status(400).json({ error: 'Location is required' });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`);
        const weatherData = response.data;

        const newSearch = new Search({location});
        await newSearch.save();

        console.log('Weather data:', weatherData);  // Log de los datos de respuesta

        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);  // Log del error
        res.status(500).json({ error: 'Error fetching weather data' });
    }
});

// Mostrar
/*app.get('/api/history', async (req, res) => {
    try {
        const history = await Search.find().sort({ date: -1 });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching search history' });
    }
});*/

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
