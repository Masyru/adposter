import os
import sys

BASEDIR = os.path.abspath(os.path.curdir)

STATIC = os.path.join(BASEDIR, 'frontend', 'static')

# Upload directory for photo
UPLOADS = os.path.join(STATIC, 'uploads')

# static path for xml
SERVICE = os.path.join(STATIC, 'service')

JAPANCAR = os.path.join(SERVICE, 'japancar')


# Allow extensions to upload files
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'mpeg'}


if __name__ == '__main__':
    print(__file__)
