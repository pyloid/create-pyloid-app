from pyloid.ipc import PyloidIPC, Bridge

class CustomIPC(PyloidIPC):
    @Bridge(str, result=str)
    def echo(self, message):
        return f'Message received in Python: {message}'

    @Bridge(result=str)
    def create_window(self):
        win = self.pyloid.create_window(title='Pyloid Browser')
        win.load_url('https://www.google.com')
        win.show()
        win.focus()
        return win.get_id()