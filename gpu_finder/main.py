"""
main.py

FastAPI application for the GPU Price Tracker.

Routes:
    GET /          -> Full HTML dashboard
    GET /gpus      -> HTMX GPU table fragment
    GET /api/gpus  -> GPU pricing data as JSON
    GET /health    -> Application health check
"""

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

from database import create_tables, get_gpu_prices


# ---------------------------------------------------------
# Paths
# ---------------------------------------------------------

BASE_DIR = Path(__file__).resolve().parent
TEMPLATES_PATH = BASE_DIR / "templates"
STATIC_PATH = BASE_DIR / "static"


# ---------------------------------------------------------
# Application lifecycle
# ---------------------------------------------------------

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Handle application startup and shutdown.
    """

    # Runs once when FastAPI starts.
    # Make sure our SQLite tables exist before accepting requests.
    create_tables()

    # FastAPI runs here until the server shuts down.
    yield

    # Shutdown logic would go here in the future.


# ---------------------------------------------------------
# FastAPI application
# ---------------------------------------------------------

app = FastAPI(
    title="GPU Price Tracker",
    description="Track and compare cloud GPU pricing.",
    version="1.0.0",
    lifespan=lifespan,
)


# ---------------------------------------------------------
# Static files
# ---------------------------------------------------------

app.mount(
    "/static",
    StaticFiles(directory=str(STATIC_PATH)),
    name="static",
)


# ---------------------------------------------------------
# Jinja templates
# ---------------------------------------------------------

templates = Jinja2Templates(
    directory=str(TEMPLATES_PATH)
)


# ---------------------------------------------------------
# Dashboard
# ---------------------------------------------------------

@app.get("/", response_class=HTMLResponse)
async def dashboard(request: Request):
    """
    Render the complete GPU pricing dashboard.
    """

    gpus = get_gpu_prices()

    return templates.TemplateResponse(
        request=request,
        name="index.html",
        context={
            "gpus": gpus,
        },
    )


# ---------------------------------------------------------
# HTMX GPU table
# ---------------------------------------------------------

@app.get("/gpus", response_class=HTMLResponse)
async def gpu_table(request: Request):
    """
    Return only the GPU table HTML fragment.

    HTMX uses this endpoint to update the table without
    reloading the entire webpage.
    """

    gpus = get_gpu_prices()

    return templates.TemplateResponse(
        request=request,
        name="partials/gpu_table.html",
        context={
            "gpus": gpus,
        },
    )


# ---------------------------------------------------------
# JSON API
# ---------------------------------------------------------

@app.get("/api/gpus")
async def api_gpus():
    """
    Return GPU pricing data as JSON.

    This endpoint is useful for applications or clients
    that want the raw data instead of HTML.
    """

    gpus = get_gpu_prices()

    return {
        "count": len(gpus),
        "results": gpus,
    }


# ---------------------------------------------------------
# Health check
# ---------------------------------------------------------

@app.get("/health")
async def health_check():
    """
    Verify that the FastAPI application is running.
    """

    return {
        "status": "ok",
        "service": "gpu-price-tracker",
    }



