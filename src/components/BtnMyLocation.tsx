import { useContext } from "react"
import { MapContext, PlacesContext } from "../context"

export const BtnMyLocation = () => {

  const { userLocation } = useContext(PlacesContext);
  const { map, isMapReady } = useContext(MapContext);

  const onClick = () => {
    if (!isMapReady) throw new Error('Map is not ready');
    if (!userLocation) throw new Error('Not user location defined');
    map?.flyTo({
      zoom: 14,
      center: userLocation
    })
   
  }
  return (
    <button onClick={onClick}
      style={{
        position: 'fixed',
        top: '5%',
        right: '5%',
        zIndex: 999
      }}
      className="btn btn-primary btn-sm">
      My Location
    </button>
  )
}
