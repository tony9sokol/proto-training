export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  title: string;
  country: string;
  city: string;
  birthDate: string;
  imageUrl: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}
