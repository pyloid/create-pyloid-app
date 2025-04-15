from pyloid.rpc import PyloidRPC, RPCContext

rpc = PyloidRPC()

@rpc.method()
async def greet(name: str):
    return f"Hello, {name}!"

@rpc.method()
async def create_window(ctx: RPCContext):
    win = ctx.pyloid.create_window(title="Google Window")
    win.load_url("https://www.google.com")
    win.show_and_focus()