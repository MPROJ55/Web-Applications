import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import * as maplibregl from "maplibre-gl";

import type { Property } from "../types/Property";

type PropertyMapProps = {
  properties: Property[];
};

export type PropertyMapHandle = {
  focusProperty: (
    property: Property
  ) => void;
};

const PropertyMap = forwardRef<
  PropertyMapHandle,
  PropertyMapProps
>(function PropertyMap(
  { properties },
  ref
) {
  const mapContainer =
    useRef<HTMLDivElement | null>(null);

  const map =
    useRef<maplibregl.Map | null>(null);

  const markers = useRef<
    Map<
      string,
      {
        marker: maplibregl.Marker;
        element: HTMLButtonElement;
      }
    >
  >(new Map());

  // -----------------------------------
  // Create map
  // -----------------------------------

  useEffect(() => {
    if (
      !mapContainer.current ||
      map.current
    ) {
      return;
    }

    const newMap =
      new maplibregl.Map({
        container:
          mapContainer.current,

        style:
          "https://demotiles.maplibre.org/style.json",

        center: [
          -77.0369,
          38.9072,
        ],

        zoom: 10,
      });

    newMap.addControl(
      new maplibregl.NavigationControl(),
      "top-right"
    );

    map.current = newMap;

    return () => {
      newMap.remove();
      map.current = null;
    };
  }, []);

  // -----------------------------------
  // Markers
  // -----------------------------------

  useEffect(() => {
    if (!map.current) {
      return;
    }

    markers.current.forEach(
      ({ marker }) => {
        marker.remove();
      }
    );

    markers.current.clear();

    properties.forEach(
      (property) => {
        const longitude =
          Number(
            property.longitude
          );

        const latitude =
          Number(
            property.latitude
          );

        if (
          Number.isNaN(
            longitude
          ) ||
          Number.isNaN(
            latitude
          )
        ) {
          return;
        }

        const element =
          document.createElement(
            "button"
          );

        element.className =
          "price-marker";

        element.type =
          "button";

        element.textContent =
          `$${Number(
            property.nightly_rate
          ).toFixed(0)}`;

        const popup =
          new maplibregl.Popup({
            offset: 18,
          }).setHTML(`
            <div class="map-popup">

              <strong>
                ${property.title}
              </strong>

              <div>
                ${property.city}${
                  property.state
                    ? `, ${property.state}`
                    : ""
                }
              </div>

              <div>
                <strong>
                  $${Number(
                    property.nightly_rate
                  ).toFixed(2)}
                </strong>
                / night
              </div>

            </div>
          `);

        const marker =
          new maplibregl.Marker({
            element,
            anchor: "bottom",
          })
            .setLngLat([
              longitude,
              latitude,
            ])
            .setPopup(popup)
            .addTo(
              map.current!
            );

        markers.current.set(
          property.id,
          {
            marker,
            element,
          }
        );
      }
    );

    return () => {
      markers.current.forEach(
        ({ marker }) => {
          marker.remove();
        }
      );

      markers.current.clear();
    };
  }, [properties]);

  // -----------------------------------
  // Dynamically fit visible properties
  // -----------------------------------

  useEffect(() => {
    if (
      !map.current ||
      properties.length === 0
    ) {
      return;
    }

    if (
      properties.length === 1
    ) {
      const property =
        properties[0];

      map.current.flyTo({
        center: [
          Number(
            property.longitude
          ),
          Number(
            property.latitude
          ),
        ],

        zoom: 12,
        duration: 700,
      });

      return;
    }

    const bounds =
      new maplibregl.LngLatBounds();

    properties.forEach(
      (property) => {
        const longitude =
          Number(
            property.longitude
          );

        const latitude =
          Number(
            property.latitude
          );

        if (
          Number.isNaN(
            longitude
          ) ||
          Number.isNaN(
            latitude
          )
        ) {
          return;
        }

        bounds.extend([
          longitude,
          latitude,
        ]);
      }
    );

    if (bounds.isEmpty()) {
      return;
    }

    map.current.fitBounds(
      bounds,
      {
        padding: 100,
        maxZoom: 12,
        duration: 700,
      }
    );
  }, [properties]);

  // -----------------------------------
  // Expose focusProperty to App
  // -----------------------------------

  useImperativeHandle(
    ref,
    () => ({
      focusProperty(
        property: Property
      ) {
        if (!map.current) {
          return;
        }

        const longitude =
          Number(
            property.longitude
          );

        const latitude =
          Number(
            property.latitude
          );

        map.current.flyTo({
          center: [
            longitude,
            latitude,
          ],

          zoom: 13,
          duration: 900,
        });

        const markerData =
          markers.current.get(
            property.id
          );

        if (!markerData) {
          return;
        }

        const popup =
          markerData.marker.getPopup();

        if (
          popup &&
          !popup.isOpen()
        ) {
          markerData.marker.togglePopup();
        }

        markerData.element.classList.add(
          "price-marker-active"
        );

        window.setTimeout(
          () => {
            markerData.element.classList.remove(
              "price-marker-active"
            );
          },
          1200
        );
      },
    }),
    []
  );

  return (
    <section className="map-panel">
      <div
        ref={mapContainer}
        className="map"
      />
    </section>
  );
});

export default PropertyMap;