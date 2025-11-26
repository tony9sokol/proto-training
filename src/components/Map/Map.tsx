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
      const withCoordinates = await geocodeService.attachCoordinates(emps);
      setEmployees(withCoordinates);
    }
    load();
  }, []);

  // Group by coordinates object
  const groupedLocations = geocodeService.groupByCoordinates(employees);

  return (
    <div className="page-content map-page">
      <MapContainer center={center} zoom={12} className="map-container">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {Object.entries(groupedLocations).map(
          ([key, employeesAtLocation], index) => {
            const { lat, lng } = employeesAtLocation[0].coordinates!;

            return (
              <Marker key={index} position={[lat, lng]}>
                <Popup>
                  <div className="popup-container">
                    {employeesAtLocation.map((employee) => (
                      <div key={employee.id} className="popup-card">
                        <strong>
                          {employee.firstName} {employee.lastName}
                        </strong>
                        <br />
                        {employee.city}, {employee.country}
                        <br />
                        <img src={employee.imageUrl} alt="" />
                      </div>
                    ))}
                  </div>
                </Popup>
              </Marker>
            );
          }
        )}
      </MapContainer>
    </div>
  );
}
