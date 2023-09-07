import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from "react-geocode";



const MapsAutocomplete = ({ eventData, setEventData }) => {
    const [value, setValue] = useState()


    Geocode.setApiKey(import.meta.env.VITE_MAPS_API_KEY)
    value && Geocode
        .fromAddress(value.label)
        .then((response) => {
            const { lat, lng } = response.results[0].geometry.location
            setEventData({ ...eventData, location: { type: 'Point', coordinates: [lng, lat] }, address: value.label })
            setValue(undefined)
        },
            (error) => {
                console.error(error);
            }
        );


    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey={import.meta.env.VITE_MAPS_API_KEY}
                selectProps={{
                    value,
                    onChange: setValue,
                }}
            />
        </div>
    );
}

export default MapsAutocomplete