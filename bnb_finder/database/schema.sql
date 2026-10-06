-- ============================================
-- StayFinder Database Schema
-- ============================================

-- Users can act as hosts, guests, or both.
CREATE TABLE users (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


-- Properties are listings created by users/hosts.
CREATE TABLE properties (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    host_id BIGINT NOT NULL,

    title VARCHAR(200) NOT NULL,
    description TEXT,

    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100),
    country VARCHAR(100) NOT NULL,

    latitude NUMERIC(9, 6),
    longitude NUMERIC(9, 6),

    nightly_rate NUMERIC(10, 2) NOT NULL
        CHECK (nightly_rate >= 0),

    max_guests INTEGER NOT NULL
        CHECK (max_guests > 0),

    bedrooms INTEGER NOT NULL DEFAULT 1
        CHECK (bedrooms >= 0),

    bathrooms NUMERIC(3, 1) NOT NULL DEFAULT 1
        CHECK (bathrooms >= 0),

    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_properties_host
        FOREIGN KEY (host_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);


-- Useful when looking up all properties belonging to a host.
CREATE INDEX idx_properties_host_id
    ON properties(host_id);


-- Useful for our initial city-based search.
CREATE INDEX idx_properties_city
    ON properties(city);