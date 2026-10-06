export type Property = {
  id: string;
  host_id: string;
  title: string;
  description: string | null;
  city: string;
  state: string | null;
  country: string;
  latitude: string;
  longitude: string;
  nightly_rate: string;
  max_guests: number;
  bedrooms: number;
  bathrooms: string;
};