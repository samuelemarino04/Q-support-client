import React, { useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import Geocode from "react-geocode";



const MapsAutocomplete = ({ eventData, setEventData }) => {
    const [value, setValue] = useState()

    Geocode.setApiKey("AIzaSyBsRneeSd2He0UERMXg95M7mefD9lDZNJM")
    value && Geocode
        .fromAddress(value.label)
        .then((response) => {
            const { lat, lng } = response.results[0].geometry.location
            setEventData({ ...eventData, location: { type: 'Point', coordinates: [lng, lat] }, address: value.label })
        },
            (error) => {
                console.error(error);
            }
        );


    return (
        <div>
            <GooglePlacesAutocomplete
                apiKey="AIzaSyBsRneeSd2He0UERMXg95M7mefD9lDZNJM"
                selectProps={{
                    value,
                    onChange: setValue,
                }}
            />
        </div>
    );
}

export default MapsAutocomplete