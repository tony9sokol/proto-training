import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from "react";
import axios from "axios";
import 'leaflet/dist/leaflet.css';
import type { Employee } from "./Employee/EmployeeContainer";

const coordCache: Record<string, [number, number]> = {};

function isoCountry(country: string) {
    console.log (country.trim().toUpperCase());
    return country.trim().toUpperCase() === "USA" ? "US" : "GB";
}

function cacheKey(city: string, country: string) {
    return `${city.trim()},${country.trim()}`;
}

async function getCoordinates(city: string, country: string) {
    const key = cacheKey(city, country);
    if (coordCache[key]) return coordCache[key];

    try {
        const res = await axios.get("https://api.api-ninjas.com/v1/geocoding", {
            params: { city: city.trim(), country: isoCountry(country) },
            headers: { "X-Api-Key": "0FzeDDgojdRyUF7b56VHOA==BluVfRKE3QSdWqZ7" },
        });

        if (!res.data || res.data.length === 0) return null;

        const coords: [number, number] = [
            parseFloat(res.data[0].latitude),
            parseFloat(res.data[0].longitude),
        ];
        coordCache[key] = coords;
        return coords;
    } catch (err: any) {
        console.error(`Geocoding error for ${city} ${country}`, err.response?.data || err);
        return null;
    }
}

export default function Map() {
    const center: [number, number] = [39.8283, -98.5795];
    const [employees, setEmployees] = useState<Employee[]>([]);

    useEffect(() => {
        async function fetchEmployees() {
            try {
                const res = await axios.get("http://localhost:3030/api/employees");
                const emps: Employee[] = res.data;

                // Pre-cache unique locations
                const uniqueLocations = Array.from(
                    new Set(emps.map(e => cacheKey(e.city, e.country)))
                );
                await Promise.all(uniqueLocations.map(loc => {
                    const [city, country] = loc.split(",");
                    return getCoordinates(city, country);
                }));

                // Assign coordinates from cache
                const empsWithCoords = emps.map(e => ({
                    ...e,
                    coords: coordCache[cacheKey(e.city, e.country)] || null
                }));

                setEmployees(empsWithCoords);
            } catch (err) {
                console.error(err);
            }
        }

        fetchEmployees();
    }, []);

    // Group employees by coordinates
    const groupedByLocation = employees.reduce<Record<string, Employee[]>>((acc, emp) => {
        if (!emp.coords) return acc;
        const key = `${emp.coords[0]},${emp.coords[1]}`;
        (acc[key] ||= []).push(emp);
        return acc;
    }, {});

    return (
        <div className="page-content" style={{ height: '100vh', width: '100%' }}>
            <MapContainer center={center} zoom={12} className="leaflet-container" style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                />

                {Object.entries(groupedByLocation).map(([coords, empsAtLocation], idx) => {
                    const [lat, lon] = coords.split(",").map(Number);
                    return (
                        <Marker key={idx} position={[lat, lon]}>
                            <Popup>
                                <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxWidth: "220px", maxHeight: "300px", overflowY: "auto" }}>
                                    {empsAtLocation.map(emp => (
                                        <div key={emp.id} style={{ padding: "6px", border: "1px solid #ccc", borderRadius: "6px", background: "#f9f9f9", textAlign: "center" }}>
                                            <strong>{emp.firstName} {emp.lastName}</strong><br />
                                            {emp.title}<br />
                                            {emp.city}, {emp.country}<br />
                                            <img src={emp.imageUrl} alt="" style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "50%", marginTop: "4px" }} />
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
