import { useEffect, useReducer } from "react";
import { PlacesContext } from "./PlacesContext";
import { placesReducer } from "./PlacesReducer";
import { getUserLocation } from "../../helpers";
import { searchApi } from "../../apis";
import { PlacesResponse, Feature } from "../../interfaces/places";


export interface PlacesState {
  isLoading: boolean;
  userLocation?: [number, number];
  isLoadingPlaces: boolean;
  places: Feature[];
}

const INITIAL_STATE: PlacesState = {
  isLoading: true,
  userLocation: undefined,
  isLoadingPlaces: false,
  places: []
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
  }, []);

  // * search
  const searchByTerm = async(query: string):Promise<Feature[]> => {
    if (!state.userLocation) {
      dispatch({type: 'setPlaces', payload: []});
      return [];
    };
    if (query.trim().length === 0) return [];
    dispatch({type: 'setLoadingPlaces'});

    const { data } = await searchApi.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation.join(',')
      }
    });
    dispatch({type: 'setPlaces', payload: data.features});
    // console.log(data.features)
    return data.features;
  }
  
  
  return (
    <PlacesContext.Provider value={{
      ...state,
      // methods
      searchByTerm
    }}>
      {children}
    </PlacesContext.Provider>
  )
}
