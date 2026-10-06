import type { Property } from "../types/Property";

type PropertyCardProps = {
  property: Property;
  onClick: (property: Property) => void;
};

function PropertyCard({
  property,
  onClick,
}: PropertyCardProps) {
  return (
    <article
      className="property-card"
      onClick={() => onClick(property)}
    >
      <div className="property-image">
        <span>StayFinder</span>
      </div>

      <div className="property-info">
        <div className="property-location">
          {property.city}

          {property.state
            ? `, ${property.state}`
            : ""}
        </div>

        <h3>
          {property.title}
        </h3>

        <p className="property-details">
          {property.bedrooms} bedrooms
          {" · "}
          {property.bathrooms} baths
          {" · "}
          {property.max_guests} guests
        </p>

        <p className="property-price">
          <strong>
            $
            {Number(
              property.nightly_rate
            ).toFixed(2)}
          </strong>{" "}
          / night
        </p>
      </div>
    </article>
  );
}

export default PropertyCard;