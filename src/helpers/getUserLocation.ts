import { resolve } from "path";

export const getUserLocation = async(): Promise<[number, number]> => {
 return new Promise((resolve, reject ) => {
  navigator.geolocation.getCurrentPosition(
    ({coords}) => resolve([coords.longitude, coords.latitude]),
    (error) => {
      alert('Error when trying to get location');
      console.log(error);
      reject();
    }
  )
 });
}