import React from 'react';
import ReactDOM from 'react-dom/client';
import { MapsApp } from './MapsApp';

import mapboxgl from 'mapbox-gl';


mapboxgl.accessToken = process.env.REACT_APP_MAP_ACCESS_TOKEN || '';

if (!navigator.geolocation) {
  alert('Your browser has not geolocation');
  throw new Error('Your browser has not geolocation');
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <MapsApp />
  </React.StrictMode>
);
