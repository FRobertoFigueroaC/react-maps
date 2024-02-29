import axios from 'axios';

const getDirectionsApi = axios.create({
  baseURL: 'https://api.mapbox.com/directions/v5/mapbox/driving',
  params: {
    language: 'en',
    alternatives: true,
    geometries: 'geojson',
    overview: 'simplified',
    steps: false,
    access_token: process.env.REACT_APP_MAP_ACCESS_TOKEN,
  }

});

export default getDirectionsApi