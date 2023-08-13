from flask_sqlalchemy import SQLAlchemy
from dataclasses import dataclass
from server import app
import datetime

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://thanhdxn@127.0.0.1:5432/tranning-website'

db = SQLAlchemy(app)

@dataclass
class Topics(db.Model):
    _id: int
    name: str
    level: int
    thumbnail: str
    description: str

    _id = db.Column("topic_id", db.Integer(), primary_key=True)
    name = db.Column("topic_name", db.String(), nullable=False)
    level = db.Column("topic_level", db.Integer(), nullable=False)
    thumbnail = db.Column("thumbnail", db.String(), nullable=False)
    description = db.Column("description", db.String(), nullable=False)

    def get_number_of_posts(self):
        return len(Posts.query.filter_by(topic_id=self._id).all())

@dataclass
class Posts(db.Model):
    _id: int
    topic_id: int
    title: str
    created_date: str
    description: str
    content: str
    banner: str

    _id = db.Column("post_id", db.Integer(), primary_key=True)
    topic_id = db.Column("topic_id", db.Integer(), db.ForeignKey(Topics._id), primary_key=True)
    title = db.Column("p_title", db.String(), nullable=False)
    created_date = db.Column(db.Date())
    description = db.Column("p_description", db.String())
    content = db.Column("p_text", db.String(), nullable=False)
    banner = db.Column(db.String())

class Question(db.Model):
    _id = db.Column("q_id", db.Integer(), primary_key=True)
    post_id = db.Column(db.Integer(), db.ForeignKey(Posts._id), primary_key=True)
    content = db.Column("q_text", db.String(), nullable=False)
    op_a = db.Column(db.String(), nullable=False)
    op_b = db.Column(db.String(), nullable=False)
    op_c = db.Column(db.String(), nullable=False)
    op_d = db.Column(db.String(), nullable=False)
    answer = db.Column("ans", db.Integer(), nullable=False)

class Users(db.Model):
    _id = db.Column("uuid", db.Integer(), primary_key=True)
    username = db.Column("username", db.String(), nullable=False)
    email = db.Column(db.String(), nullable=False)
    password = db.Column("passwrd", db.String())
    created_date = db.Column(db.Date())
    is_active = db.Column(db.Boolean())
    is_admin = db.Column(db.Boolean())
    avatar = db.Column("u_avatar", db.String())

class Tests(db.Model):
    _id = db.Column("test_id", db.Integer(), primary_key=True)
    uuid = db.Column(db.Integer(), db.ForeignKey(Users._id), primary_key=True)
    post_id = db.Column(db.Integer(), db.ForeignKey(Posts._id), primary_key=True)
    duration = db.Column(db.Integer(), nullable=False)
    num_of_question = db.Column("num_question", db.Integer(), nullable=False)
    score = db.Column(db.Integer())
