import { useContext, useState } from "react"
import { MapContext, PlacesContext } from "../context"
import { LoadingPlaces } from "./";
import { Feature } from "../interfaces/places";

export const SearchResults = () => {
  const { places, isLoadingPlaces, userLocation } = useContext(PlacesContext);
  const { map, getRouteBetweenPoints } = useContext(MapContext);

  const onPlaceClicked = (place: Feature) => {
    const [lng, lat] = place.center;
    setActivePlace(place.id)
    map?.flyTo({zoom: 14,center: [lng, lat]})
  }

  const [activePlace, setActivePlace] = useState('');

  const getRoute = (place:Feature) => {
    if (!userLocation) return;
    const [lgn, lat] = place.center
    getRouteBetweenPoints(userLocation, [lgn, lat])
  }

  if (isLoadingPlaces) return (<LoadingPlaces/>)
  
  if (places.length === 0) return (<> </>)

  return (
    <ul className="list-group">
      {
        places.map(place => 
          (
            <li key={place.id}
                onClick={() => onPlaceClicked(place)}
                className={`${activePlace === place.id ? 'active' : ''} list-group-item pointer`}>
              <h6>{place.text}</h6>
              <p style={{fontSize: '12px'}}>
                {place.matching_place_name || place.place_name}
              </p>
              <button onClick={() => getRoute(place)}
                  className={`btn  btn-sm ${activePlace === place.id ? 'btn-outline-light' : 'btn-outline-primary'}`}>
                Directions
              </button>
            </li>
          )
        )
      }
    </ul>
  )
}
    