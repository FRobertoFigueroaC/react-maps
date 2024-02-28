import { useContext } from "react"
import { PlacesContext } from "../context"
import { LoadingPlaces } from "./";

export const SearchResults = () => {
  const { places, isLoadingPlaces } = useContext(PlacesContext);

  if (isLoadingPlaces) return (<LoadingPlaces/>)
  
  if (places.length === 0) return (<> </>)

  return (
    <ul className="list-group">
      {
        places.map(place => 
          (
            <li key={place.id}
                className="list-group-item">
              <h6>{place.text}</h6>
              <p className="text-muted" style={{fontSize: '12px'}}>
                {place.matching_place_name || place.place_name}
              </p>
              <button className="btn btn-outline-primary btn-sm">
                Directions
              </button>
            </li>
          )
        )
      }
    </ul>
  )
}
    