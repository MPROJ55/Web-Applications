INSERT INTO users (first_name, last_name, email)
VALUES
    ('Maya', 'Johnson', 'maya@example.com'),
    ('Daniel', 'Lee', 'daniel@example.com'),
    ('Sofia', 'Martinez', 'sofia@example.com');


INSERT INTO properties (
    host_id,
    title,
    description,
    address,
    city,
    state,
    country,
    latitude,
    longitude,
    nightly_rate,
    max_guests,
    bedrooms,
    bathrooms
)
VALUES
(
    1,
    'Modern DC Apartment',
    'Bright modern apartment near museums and restaurants.',
    '123 Example Street',
    'Washington',
    'DC',
    'USA',
    38.9072,
    -77.0369,
    185.00,
    4,
    2,
    1.0
),
(
    1,
    'Cozy Arlington Condo',
    'Comfortable condo with quick access to Washington DC.',
    '456 Example Avenue',
    'Arlington',
    'VA',
    'USA',
    38.8816,
    -77.0910,
    145.00,
    3,
    1,
    1.0
),
(
    2,
    'Spacious Alexandria Townhouse',
    'Three bedroom townhouse ideal for families.',
    '789 Example Road',
    'Alexandria',
    'VA',
    'USA',
    38.8048,
    -77.0469,
    275.00,
    6,
    3,
    2.5
),
(
    3,
    'Downtown DC Studio',
    'Compact studio close to downtown attractions.',
    '321 Example Place',
    'Washington',
    'DC',
    'USA',
    38.9007,
    -77.0365,
    125.00,
    2,
    0,
    1.0
),
(
    2,
    'Luxury Georgetown Apartment',
    'Upscale apartment near Georgetown shopping and dining.',
    '654 Example Lane',
    'Washington',
    'DC',
    'USA',
    38.9097,
    -77.0654,
    325.00,
    4,
    2,
    2.0
);