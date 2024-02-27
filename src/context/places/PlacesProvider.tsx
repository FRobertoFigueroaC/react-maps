import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers";


export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true
}

interface Props {
  children: JSX.Element | JSX.Element[]
}


export const PlacesProvider = ({children}: Props) => {

  const [state, dispatch] = useReducer(placesReducer, INITIAL_STATE);

  // * Getting location
  useEffect(() => {
    getUserLocation()
      .then(coords => dispatch({type: 'setUserLocation', payload: coords}))
      .catch(error => console.log)
  }, [])
  
  
  return (
    <PlacesContext.Provider value={{
      ...state
    }}>
      {children}
    </PlacesContext.Provider>
  )
}
