export function isoCountry(country: string) {
    const c = country.trim().toUpperCase();
    return c === "USA" ? "US" : "GB";
}

export function cacheKey(city: string, country: string) {
  return `${city.trim()},${country.trim()}`;
}
