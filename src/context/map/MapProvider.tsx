import { useContext, useEffect, useReducer } from "react";
import { Map, Marker, Popup } from "mapbox-gl";
import { MapContext } from "./MapContext";
import { MapReducer } from "./MapReducer";
import { PlacesContext } from "../";
import { randomColor } from "../../helpers";

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
  }, [places])
  

  return (
    <MapContext.Provider value={{
      ...state,
      // Methods
      setMap
    }}>
      {children}

    </MapContext.Provider>
  )
}
