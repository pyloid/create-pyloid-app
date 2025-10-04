from pyloid_builder.pyinstaller import pyinstaller
from pyloid.utils import get_platform


name = 'pyloid-app'
dist_path = './dist'
work_path = './build'


if get_platform() == 'windows':
	icon = './src-pyloid/icons/icon.ico'
elif get_platform() == 'macos':
	icon = './src-pyloid/icons/icon.icns'
else:
	icon = './src-pyloid/icons/icon.png'


if __name__ == '__main__':
	pyinstaller(
		'./src-pyloid/main.py',
		[
			f'--name={name}',
			f'--distpath={dist_path}',
			f'--workpath={work_path}',
			'--clean',
			'--noconfirm',
			'--onedir',
			'--windowed',
			'--add-data=./src-pyloid/icons/:./src-pyloid/icons/',
			'--add-data=./dist-front/:./dist-front/',
			f'--icon={icon}',
		],
	)