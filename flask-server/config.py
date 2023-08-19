import os
from os.path import join, dirname, realpath

class Config(object):
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-string'
    UPLOADS_PATH = join(dirname(realpath(__file__)), 'server/public/')