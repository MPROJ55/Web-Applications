import os 

import requests


API_URL = os.getenv(
    "PRICING_API_URL",
    "http://localhost:8787/api/gpu-prices"
)

# fetches a list with nested dictionaries for the data structure of GPU's
def fetch_gpu_prices() -> list[dict]:
    response = requests.get(
        API_URL,
        timeout=15
    )

    response.raise_for_status()

    data = response.json()

    return data

