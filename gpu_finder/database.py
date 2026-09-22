import sqlite3 
from pathlib import Path
from datetime import datetime, timezone

DATABASE_PATH = Path(__file__).resolve().parent / "gpu_prices.db"

def get_connection() -> sqlite3.Connection:
    """
    Create and return a connection to the SQlite database
    """

    connection = sqlite3.connect(DATABASE_PATH)

    connection.row_factory = sqlite3.Row

    return connection

def create_tables() -> None:
    """
    Create the GPU prices table if it does not already exist.
    """
    with get_connection() as connection:
            connection.execute(
                 """
                CREATE TABLE IF NOT EXISTS gpu_prices (
                id INTEGER PRIMARY KEY AUTOINCREMENT,

                gpu TEXT NOT NULL,
                provider TEXT NOT NULL,

                price_per_hour REAL NOT NULL,
                pricing_type TEXT,

                source_updated_at TEXT,
                collected_at TEXT NOT NULL
                )
                """
            )

def save_gpu_price(
    gpu: str,
    provider: str,
    price_per_hour: float,
    pricing_type: str | None = None,
    source_updated_at: str | None = None,
) -> None:
    """
    Save one GPU price record.
    """

    collected_at = datetime.now(timezone.utc).isoformat()

    with get_connection() as connection:
        connection.execute(
            """
            INSERT INTO gpu_prices (
                gpu,
                provider,
                price_per_hour,
                pricing_type,
                source_updated_at,
                collected_at
            )
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (
                gpu,
                provider,
                price_per_hour,
                pricing_type,
                source_updated_at,
                collected_at,
            ),
        )


def get_gpu_prices() -> list[dict]:
    """
    Return the most recently collected GPU prices.
    """

    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT
                id,
                gpu,
                provider,
                price_per_hour,
                pricing_type,
                source_updated_at,
                collected_at
            FROM gpu_prices
            ORDER BY price_per_hour ASC
            """
        ).fetchall()

    return [dict(row) for row in rows]


def delete_all_gpu_prices() -> None:
    """
    Delete all GPU pricing records.

    Useful during development/testing.
    """

    with get_connection() as connection:
        connection.execute(
            "DELETE FROM gpu_prices"
        )


if __name__ == "__main__":
    create_tables()

    print(f"Database initialized at: {DATABASE_PATH}")