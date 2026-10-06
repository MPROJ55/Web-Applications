import {
  useEffect,
  useRef,
  useState,
} from "react";

import "./App.css";

import SearchBar from "./components/SearchBar";
import PropertyList from "./components/PropertyList";

import PropertyMap, {
  type PropertyMapHandle,
} from "./components/PropertyMap";

import type { Property } from "./types/Property";

function App() {
  // -----------------------------------
  // Data
  // -----------------------------------

  const [
    properties,
    setProperties,
  ] = useState<Property[]>([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  // -----------------------------------
  // Search form state
  // -----------------------------------

  const [
    location,
    setLocation,
  ] = useState("");

  const [
    guests,
    setGuests,
  ] = useState(1);

  const [
    maxPrice,
    setMaxPrice,
  ] = useState(500);

  // -----------------------------------
  // Applied search state
  // -----------------------------------

  const [
    searchLocation,
    setSearchLocation,
  ] = useState("");

  const [
    searchGuests,
    setSearchGuests,
  ] = useState(1);

  // -----------------------------------
  // Map component reference
  // -----------------------------------

  const mapRef =
    useRef<PropertyMapHandle | null>(
      null
    );

  // -----------------------------------
  // Fetch properties
  // -----------------------------------

  useEffect(() => {
    async function loadProperties() {
      try {
        const response =
          await fetch(
            "/api/properties"
          );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch properties: ${response.status}`
          );
        }

        const data: Property[] =
          await response.json();

        setProperties(data);
      } catch (error) {
        console.error(
          "Could not load properties:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadProperties();
  }, []);

  // -----------------------------------
  // Filter properties
  // -----------------------------------

  const filteredProperties =
    properties.filter(
      (property) => {
        const price =
          Number(
            property.nightly_rate
          );

        const matchesPrice =
          price <= maxPrice;

        const matchesGuests =
          property.max_guests >=
          searchGuests;

        const query =
          searchLocation
            .trim()
            .toLowerCase();

        const searchableLocation =
          [
            property.city,
            property.state,
            property.country,
          ]
            .filter(Boolean)
            .join(" ")
            .toLowerCase();

        const matchesLocation =
          query === "" ||
          searchableLocation.includes(
            query
          );

        return (
          matchesPrice &&
          matchesGuests &&
          matchesLocation
        );
      }
    );

  // -----------------------------------
  // Search
  // -----------------------------------

  function handleSearch() {
    setSearchLocation(
      location
    );

    setSearchGuests(
      guests
    );
  }

  // -----------------------------------
  // Property -> map interaction
  // -----------------------------------

  function handlePropertyClick(
    property: Property
  ) {
    mapRef.current?.focusProperty(
      property
    );
  }

  // -----------------------------------
  // Render
  // -----------------------------------

  return (
    <div className="app">

      <SearchBar
        location={location}
        guests={guests}
        onLocationChange={
          setLocation
        }
        onGuestsChange={
          setGuests
        }
        onSearch={
          handleSearch
        }
      />

      <main className="content">

        <PropertyList
          properties={
            filteredProperties
          }
          loading={loading}
          maxPrice={maxPrice}
          onMaxPriceChange={
            setMaxPrice
          }
          onPropertyClick={
            handlePropertyClick
          }
        />

        <PropertyMap
          ref={mapRef}
          properties={
            filteredProperties
          }
        />

      </main>

    </div>
  );
}

export default App;