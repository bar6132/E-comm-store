import subprocess


venv_name = 'venv'
subprocess.call(['python', '-m', 'venv', venv_name])


packages_to_install = [
    'asgiref',
    'certifi',
    'charset-normalizer',
    'Django',
    'django-cors-headers',
    'djangorestframework',
    'idna',
    'pytz',
    'requests',
    'sqlparse',
    'tzdata',
    'urllib3'
    'Pillow'
]

for package in packages_to_install:
    subprocess.call(['pip', 'install', package])

print("Packages installed successfully!")
