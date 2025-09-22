from pyloid_adapter.fastapi_adapter import FastAPIAdapter
from pyloid_adapter.context import PyloidContext
from fastapi import FastAPI, Depends

app = FastAPI()

def start(app: FastAPI, host: str, port: int):
    import uvicorn
    uvicorn.run(app, host=host, port=port)

server = FastAPIAdapter(app, start)

@app.get("/greet")
async def greet(name: str):
    return f"Hello, {name}!"

@app.get("/create_window")
async def create_window(ctx:PyloidContext = Depends(server.pyloid_context)):
    win = ctx.pyloid.create_window(title="Google Window")
    win.load_url("https://www.google.com")
    win.show_and_focus()
