// src/components/OSMMapComponent.js
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix marker icon issue with Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const OSMMapComponent = ({ onLocationSelect, initialPosition }) => {
  const [markerPosition, setMarkerPosition] = useState(initialPosition);

  useEffect(() => {
    if (initialPosition) {
      setMarkerPosition(initialPosition);
    }
  }, [initialPosition]);

  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setMarkerPosition({ lat, lng });
        onLocationSelect({ lat, lng });
      },
    });

    return markerPosition ? <Marker position={markerPosition} /> : null;
  };

  return (
    <MapContainer center={initialPosition || [51.505, -0.09]} zoom={13} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  );
};

export default OSMMapComponent;
