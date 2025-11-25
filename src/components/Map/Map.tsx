import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useEffect, useState } from "react";
import type { Employee } from "../../modules/Employee";
import { employeeService } from "../../services/employeeService";
import { geocodeService } from "../../services/geocodeService";
import "leaflet/dist/leaflet.css";
import "./Map.css";


export default function Map() {
  const center: [number, number] = [39.8283, -98.5795];
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    async function load() {
      const emps = await employeeService.getEmployees();
      const withCoords = await geocodeService.attachCoordinates(emps);
      setEmployees(withCoords);
    }
    load();
  }, []);

  const groupedLocations = geocodeService.groupByCoordinates(employees);

  return (
    <div className="page-content" style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {Object.entries(groupedLocations).map(([coords, emps], index) => {
          const [lat, lon] = coords.split(",").map(Number);
          return (
            <Marker key={index} position={[lat, lon]}>
              <Popup>
                <div className="popup-container">
                  {emps.map((emp) => (
                    <div key={emp.id} className="popup-card">
                      <strong>
                        {emp.firstName} {emp.lastName}
                      </strong>
                      <br />
                      {emp.city}, {emp.country}
                      <br />
                      <img src={emp.imageUrl} alt="" />
                    </div>
                  ))}
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
