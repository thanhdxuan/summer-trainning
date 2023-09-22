import os
from os.path import join, dirname, realpath

class Config(object):
    FLASK_DEBUG = True
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'secret-string'
    UPLOADS_PATH = join(dirname(realpath(__file__)), 'server/public/')
    MAIL_SERVER = 'smtp.sendgrid.net'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USERNAME = os.environ.get('EMAIL_USER')
    MAIL_PASSWORD = os.environ.get('EMAIL_PASS')
    SQLALCHEMY_DATABASE_URI = os.environ.get('SQLALCHEMY_DATABASE_URI')
class ProductConfig(Config):
    DEBUG = False