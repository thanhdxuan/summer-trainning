from flask_sqlalchemy import SQLAlchemy
from server import app

db = SQLAlchemy(app)

class Topics(db.Model):
    topic_id = db.Column(db.Integer(), primary_key=True)
    topic_name = db.Column(db.String(), nullable=False)
    topic_level = db.Column(db.Integer(), nullable=False)
    thumbnail = db.Column(db.String(), nullable=False)