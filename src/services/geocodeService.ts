import axios from "axios";
import type { Employee } from "../modules/Employee";
import { cacheKey, isoCountry } from "../utils/locationUtils";

const coordCache: Record<string, [number, number]> = {};

async function getCoordinates(city: string, country: string) {
  const key = cacheKey(city, country);
  if (coordCache[key]) return coordCache[key];

  try {
    const res = await axios.get("https://api.api-ninjas.com/v1/geocoding", {
      params: { city: city.trim(), country: isoCountry(country.trim()) },
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
    console.error(
      `Geocoding error for ${city} ${country}`,
      err.response?.data || err
    );
    return null;
  }
}

async function attachCoordinates(emps: Employee[]) {
  const uniqueLocations = Array.from(
    new Set(emps.map((e) => cacheKey(e.city, e.country)))
  );

  await Promise.all(
    uniqueLocations.map((loc) => {
      const [city, country] = loc.split(",");
      return getCoordinates(city, country);
    })
  );

  return emps.map((e) => ({
    ...e,
    coords: coordCache[cacheKey(e.city, e.country)] || null,
  }));
}

function groupByCoordinates(emps: Employee[]) {
  return emps.reduce<Record<string, Employee[]>>((acc, emp) => {
    if (!emp.coords) return acc;
    const key = `${emp.coords[0]},${emp.coords[1]}`;
    (acc[key] ||= []).push(emp);
    return acc;
  }, {});
}

export const geocodeService = {
  attachCoordinates,
  groupByCoordinates,
};
