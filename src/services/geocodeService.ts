import axios from "axios";
import type { Employee } from "../modules/Employee";
import { cacheKey, countryNameToIsoCode } from "../utils/locationUtils";
import { NINJAS_API_KEY, NINJA_URL } from "../config/api";

type Coordinates = { lat: number; lng: number };

const coordinatesCache: Record<string, Coordinates> = {};

export const getCoordinates = async (
  city: string,
  country: string
): Promise<Coordinates | null> => {
  const key = cacheKey(city, country);
  if (coordinatesCache[key]) return coordinatesCache[key];

  try {
    const result = await axios.get(NINJA_URL, {
      params: {
        city: city.trim(),
        country: countryNameToIsoCode(country.trim()),
      },
      headers: { "X-Api-Key": NINJAS_API_KEY },
    });

    if (!result.data || result.data.length === 0) return null;

    const coords: Coordinates = {
      lat: parseFloat(result.data[0].latitude),
      lng: parseFloat(result.data[0].longitude),
    };

    coordinatesCache[key] = coords;
    return coords;
  } catch (err: any) {
    console.error(
      `Geocoding error for ${city} ${country}`,
      err.response?.data || err
    );
    return null;
  }
};

export const attachCoordinates = async (
  employees: Employee[]
): Promise<(Employee & { coordinates: Coordinates | null })[]> => {
  const uniqueLocations = Array.from(
    new Set(
      employees.map((employee) => cacheKey(employee.city, employee.country))
    )
  );

  await Promise.all(
    uniqueLocations.map((location) => {
      const [city, country] = location.split(",");
      return getCoordinates(city, country);
    })
  );

  return employees.map((employee) => ({
    ...employee,
    coordinates:
      coordinatesCache[cacheKey(employee.city, employee.country)] || null,
  }));
};

export const groupByCoordinates = (
  employees: Employee[]
): Record<string, Employee[]> => {
  return employees.reduce<Record<string, Employee[]>>((acc, employee) => {
    if (!employee.coordinates) return acc;
    const key = `${employee.coordinates.lat},${employee.coordinates.lng}`;
    (acc[key] ||= []).push(employee); // Using logical OR assignment
    return acc;
  }, {});
};

export const geocodeService = {
  attachCoordinates,
  groupByCoordinates,
};
