from pyloid.rpc import PyloidRPC, RPCContext

server = PyloidRPC()

@server.method()
async def greet(name: str):
    return f"Hello, {name}!"

@server.method()
async def create_window(ctx: RPCContext):
    win = ctx.pyloid.create_window(title="Google Window")
    win.load_url("https://www.google.com")
    win.show_and_focus()