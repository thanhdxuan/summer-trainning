from flask_sqlalchemy import SQLAlchemy
from flask import jsonify, send_file
from server import app
import psycopg2

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://thanhdxn@127.0.0.1:5432/tranning-website'
db = SQLAlchemy(app)

class Topics(db.Model):
    topic_id = db.Column(db.Integer(), primary_key=True)
    topic_name = db.Column(db.String(), nullable=False)
    topic_level = db.Column(db.Integer(), nullable=False)
    thumbnail = db.Column(db.String(), nullable=False)

@app.route("/topics", methods=['GET'])
def get_topic():
    # conn = psycopg2.connect(database="tranning-website", user="thanhdxn",
    #                     password="", host="127.0.0.1", port="5432")
    
    topics = Topics.query.all()
    topic_list = []

    for topic in topics:
        topic_data = {
            'id': topic.topic_id,
            'name': topic.topic_name,
            'level': topic.topic_level,
            'thumbnail': topic.thumbnail
        }
        topic_list.append(topic_data)
    return jsonify(topic_list)

@app.route('/images/<filename>')
def get_image(filename):
    # Assuming the images are stored in a folder named 'images'
    image_path = f'public/images/{filename}'

    return send_file(image_path, mimetype='image/svg+xml')
