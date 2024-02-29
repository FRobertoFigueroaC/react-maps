import { useContext, useEffect, useReducer } from "react";
import { AnySourceData, LngLatBounds, Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { MapReducer } from "./MapReducer";
import { PlacesContext } from "../";
import { getKms, randomColor } from "../../helpers";
import { getDirectionsApi } from "../../apis";
import { DirectionsResponse } from "../../interfaces/directions";

export interface MapState {
  isMapReady: boolean;
  map?: Map;
  markers: Marker[];
}

const INITIAL_STATE : MapState = {
  isMapReady: false,
  map: undefined,
  markers: [],
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const MapProvider = ({children}: Props) => {

  const [state, dispatch] = useReducer(MapReducer, INITIAL_STATE);

  const { places } = useContext(PlacesContext)

  const setMap = (map: Map) => {
    const myLocationPopup = new Popup()
          .setHTML(
            `
              <h4>Here you are</h4>
            `
          )
    new Marker({
      color: '#61DBFB'
    })
          .setLngLat(map.getCenter())
          .setPopup(myLocationPopup)
          .addTo(map);
   dispatch({type: 'setMap', payload: map});
  }

  useEffect(() => {
    if (places.length > 0 && state.map) {
      // delete previous markers
      state.markers.forEach(marker => marker.remove());

      // add new markers
      const newMarkers: Marker[] = [];
      for (const place of places) {
        const [lng, lat] = place.center
        const popUp = new Popup().setHTML(`<h6>${place.text}</h6><p>${place.matching_place_name || place.place_name}</p>`);
        const newMarker = new Marker({
          color: randomColor()
        }).setLngLat([lng, lat])
          .setPopup(popUp)
          .addTo(state.map);

        newMarkers.push(newMarker)
      }
      dispatch({type: 'setMarkers', payload: newMarkers})
      // Todo: limpiar polyline
    }
  }, [places]);

  const getRouteBetweenPoints = async(start: [number,number], end: [number, number]) => {
    const {data} = await getDirectionsApi.get<DirectionsResponse>(`/${start.join(',')};${end.join(',')}`);
    const { distance, duration, geometry } = data.routes[0];
    const { coordinates: coords } = geometry
    let kms = getKms(distance);
    const minutes = Math.floor(duration /60);
    const bounds = new LngLatBounds(
      start,start
    );
    
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }
    state.map?.fitBounds(bounds, {
      padding: 300
    });

    // Polyline
    const sourceData: AnySourceData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            properties: {},
            geometry: {
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    if (state.map?.getLayer('RouteString')) {
      state.map.removeLayer('RouteString');
      state.map.removeSource('RouteString');
    }

    state.map?.addSource('RouteString', sourceData);
    state.map?.addLayer({
      id: 'RouteString',
      type: 'line',
      source: 'RouteString',
      layout: {
        'line-cap': 'round',
        'line-join': 'round',
      },
      paint: {
        'line-color': randomColor(),
        'line-width': 3
      }
    });
    // console.log({
    //   kms,minutes,  distance, duration, geometry
    // })
  }
  

  return (
    <MapContext.Provider value={{
      ...state,
      // Methods
      setMap, getRouteBetweenPoints
    }}>
      {children}

    </MapContext.Provider>
  )
}
