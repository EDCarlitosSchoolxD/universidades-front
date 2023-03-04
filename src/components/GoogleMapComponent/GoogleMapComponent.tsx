import { useMemo, useState } from "react";
import { GoogleMap,useLoadScript,Marker } from "@react-google-maps/api";
import { StandaloneSearchBox } from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import { LoadScript } from "@react-google-maps/api";


export function GoogleMapComponent(props:any){
    const [ libraries ] = useState(['places']);
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
        libraries,
    });
    const center = useMemo(() => ({lat:21.2899187,lng:-99.3845342}),[])


    console.log("XDDD MAPS|");
    
    
    if(!isLoaded)return <div>LOADING....</div>
    

    return(<>
            
            <GoogleMap onClick={e => props.onClick(e)} zoom={10} center={props.center||center} mapContainerClassName="map-container" >
                <Marker position={props.center||center}/>
            </GoogleMap>
        
    </>)
}