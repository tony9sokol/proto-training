export function countryNameToIsoCode(country: string): string {
  const c = country.trim().toUpperCase();
  return c === "USA" ? "US" : "GB";
}

export function cacheKey(city: string, country: string): string {
  return `${city.trim()},${country.trim()}`;
}
