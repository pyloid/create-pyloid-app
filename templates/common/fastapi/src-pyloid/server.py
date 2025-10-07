from pyloid_adapter.base_adapter import BaseAdapter
from pyloid_adapter.context import PyloidContext
from fastapi import FastAPI
from fastapi import Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

def start(host: str, port: int):
	import uvicorn
	uvicorn.run(app, host=host, port=port)

def setup_cors():
	app.add_middleware(
		CORSMiddleware,
		allow_origins=['*'],
		allow_credentials=True,
		allow_methods=['*'],
		allow_headers=['*'],
	)

adapter = BaseAdapter(start, setup_cors)


@app.get('/greet')
async def greet(name: str):
	return f'Hello, {name}!'


@app.get('/create_window')
async def create_window(request: Request):
	window_id = request.headers.get("X-Pyloid-Window-Id")
 
	if adapter.is_pyloid(window_id):
		print("pyloid request")
	else:
		print("not pyloid request")
  
	ctx: PyloidContext = adapter.get_context(window_id) 
 
	win = ctx.pyloid.create_window(title='Google Window')
	win.load_url('https://www.google.com')
	win.show_and_focus()
