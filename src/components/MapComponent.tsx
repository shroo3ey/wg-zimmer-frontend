import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix für Leaflet Icons (React Problem)
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';

// Standard Leaflet Icon reparieren
const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapComponentProps {
  address: string;
  city: string;
  district: string;
  title: string;
  lat?: number;
  lng?: number;
  compact?: boolean; // Für kleine Sidebar-Version
}

// Komponente für automatisches Zentrieren
const MapCenter: React.FC<{ lat: number; lng: number; zoom: number }> = ({ lat, lng, zoom }) => {
  const map = useMap();
  
  useEffect(() => {
    map.setView([lat, lng], zoom);
  }, [map, lat, lng, zoom]);
  
  return null;
};

export const MapComponent: React.FC<MapComponentProps> = ({
  address,
  city,
  district,
  title,
  lat = 52.52, // Default: Berlin
  lng = 13.405,
  compact = false
}) => {
  // Koordinaten sind korrekt - Debug entfernt
  
  const position: [number, number] = [lat, lng];

  // Kompakte Version für Sidebar
  if (compact) {
    return (
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: '100%', width: '100%' }}
        className="z-0"
        zoomControl={true}
        attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Marker position={position}>
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold text-sm">{title}</h3>
              <p className="text-xs text-gray-600 mt-1">
                {address}<br />
                {district}, {city}
              </p>
            </div>
          </Popup>
        </Marker>
        
        <MapCenter lat={lat} lng={lng} zoom={16} />
      </MapContainer>
    );
  }

  // Vollständige Version (falls irgendwo anders gebraucht)
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">🗺️ Standort</h2>
      
      <div className="h-80 w-full rounded-lg overflow-hidden border border-gray-200">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          <Marker position={position}>
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-sm">{title}</h3>
                <p className="text-xs text-gray-600 mt-1">
                  {address}<br />
                  {district}, {city}
                </p>
              </div>
            </Popup>
          </Marker>
          
          <MapCenter lat={lat} lng={lng} zoom={15} />
        </MapContainer>
      </div>
      
      <div className="mt-3 text-sm text-gray-600">
        📍 {address}, {district}, {city}
      </div>
    </div>
  );
};