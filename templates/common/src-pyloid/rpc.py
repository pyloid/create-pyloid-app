from pyloid.rpc import PyloidRPC
from app import app
from pyloid.serve import pyloid_serve
from pyloid.utils import is_production, get_production_path

rpc = PyloidRPC()

@rpc.method()
async def greet(name: str):
    return f"Hello, {name}!"

@rpc.method()
async def create_window():
    print("Creating window")
    
    if is_production():
        url = pyloid_serve(directory=get_production_path("dist-front"))
        window = app.create_window(
            title="Pyloid Browser-production 2",
            rpc=rpc,
        )
        window.load_url(url)
    else:
        window = app.create_window(
            title="Pyloid Browser-dev 2",
            dev_tools=True,
            rpc=rpc,
        )
        window.load_url("http://localhost:5173")

    window.show_and_focus()