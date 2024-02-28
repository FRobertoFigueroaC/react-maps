
import { useContext, useLayoutEffect, useRef } from "react"
import mapboxgl from 'mapbox-gl';
import { MapContext, PlacesContext } from "../context"
import { Spinner } from './';



export const MapView = () => {

  const { userLocation, isLoading} = useContext(PlacesContext);
  const { setMap } = useContext(MapContext);

  const mapDiv = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!isLoading) {
      const map = new mapboxgl.Map({
        container: mapDiv.current!,
        style: 'mapbox://styles/mapbox/dark-v10', // style URL
        center: userLocation, // starting position [lng, lat]
        zoom: 14, // starting zoom
      });
      setMap(map);
    }
  }, [isLoading]);


  if (!userLocation) {
    return (<Spinner/>)
  }

  

  return (
    <div ref={mapDiv}
      style={{
        height: '100vh',
        width: '100vw',
        position: 'fixed',
        top: 0,
        left: 0
      }}>
      Your location is:  
      { userLocation?.join(',') }
    </div>
  )
}




