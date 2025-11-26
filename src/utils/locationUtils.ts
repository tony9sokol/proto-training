export const countryNameToIsoCode = (country: string): string => {
  const c = country.trim().toUpperCase();
  return c === "USA" ? "US" : "GB";
};

export const cacheKey = (city: string, country: string): string =>
  `${city.trim()},${country.trim()}`;

//
