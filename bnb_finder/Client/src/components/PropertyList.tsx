import type { Property } from "../types/Property";
import PropertyCard from "./PropertyCard";

type PropertyListProps = {
  properties: Property[];
  loading: boolean;
  maxPrice: number;

  onMaxPriceChange: (
    maxPrice: number
  ) => void;

  onPropertyClick: (
    property: Property
  ) => void;
};

function PropertyList({
  properties,
  loading,
  maxPrice,
  onMaxPriceChange,
  onPropertyClick,
}: PropertyListProps) {
  return (
    <section className="listings-panel">
      <div className="filters">
        <div>
          <h2>
            Places to stay
          </h2>

          <p>
            {properties.length}{" "}
            {properties.length === 1
              ? "property"
              : "properties"}{" "}
            found
          </p>
        </div>

        <div className="price-filter">
          <label htmlFor="price">
            Max price: ${maxPrice}
          </label>

          <input
            id="price"
            type="range"
            min="50"
            max="500"
            step="25"
            value={maxPrice}
            onChange={(event) =>
              onMaxPriceChange(
                Number(
                  event.target.value
                )
              )
            }
          />
        </div>
      </div>

      {loading && (
        <p className="status-message">
          Loading properties...
        </p>
      )}

      {!loading &&
        properties.length === 0 && (
          <p className="status-message">
            No properties match your search.
          </p>
        )}

      <div className="property-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
            onClick={onPropertyClick}
          />
        ))}
      </div>
    </section>
  );
}

export default PropertyList;