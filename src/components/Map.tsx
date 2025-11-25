import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Map() {
  const center: [number, number] = [32.0853, 34.7818]; // example: Tel Aviv

  return (
    <div className="page-content">
      <MapContainer 
      center={center} zoom={12} 
      className="leaflet-container"   
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <Marker position={center}>
          <Popup>
            Example location — you can add markers for employees later.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
