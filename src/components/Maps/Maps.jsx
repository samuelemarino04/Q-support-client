import React, { useState } from 'react';
import { GoogleMap, LoadScript, Autocomplete, Marker } from '@react-google-maps/api';
import { useEffect } from 'react';


const Maps = ({ event }) => {
    const containerStyle = {
        width: '400px',
        height: '400px',
    };

    console.log('En los maps', event)
    const center = {
        lat: event.location.coordinates[1],
        lng: event.location.coordinates[0]
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBsRneeSd2He0UERMXg95M7mefD9lDZNJM&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = initMap;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const initMap = () => {
        const map = new window.google.maps.Map(document.getElementById('map'), {
            center,
            zoom: 15,
        });

        // Add markers or other components here
        new window.google.maps.Marker({
            position: center,
            map,
        });
    }

    return (<div id="map" style={containerStyle} />)
}


export default Maps
