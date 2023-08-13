from flask import jsonify, send_file, request
from server import app
from server.models import Topics, Posts, Question, Tests, Users

@app.route("/topics", methods=['GET'])
def get_topic():
    # conn = psycopg2.connect(database="tranning-website", user="thanhdxn",
    #                     password="", host="127.0.0.1", port="5432")
    
    topics = Topics.query.order_by(Topics._id).all()
    topic_list = []

    for topic in topics:
        topic_data = {
            'id': topic._id,
            'name': topic.name,
            'level': topic.level,
            'thumbnail': topic.thumbnail,
            'description': topic.description,
            'num_posts': topic.get_number_of_posts()
        }
        topic_list.append(topic_data)
    return jsonify(topic_list)

@app.route("/search/topics", methods=['GET'])
def get_topic_have_token():
    topics = Topics.query.order_by(Topics._id).all()
    topic_list = []

    token = request.args.get('name')
    level = request.args.get('level')

    for topic in topics:
        if token is not None and token.lower() in topic.name.lower():
            topic_data = {
                'id': topic._id,
                'name': topic.name,
                'level': topic.level,
                'thumbnail': topic.thumbnail,
                'num_posts': topic.get_number_of_posts()
            }
            topic_list.append(topic_data)

    
    return jsonify(topic_list)

@app.route("/topics/<topic_id>/posts")
def get_all_posts_from_topic_id(topic_id):
    posts = Posts.query.filter_by(topic_id=topic_id).all()
    topic = Topics.query.filter_by(_id=topic_id).all()

    infor = {
        "topic_name": topic[0].name,
        "posts": posts
    }

    return jsonify(infor)

@app.route('/images/<typ>/<filename>')
def get_image(typ, filename):
    image_path = f'public/images/{typ}/{filename}'

    if typ in ['topics']:
        res = send_file(image_path, mimetype='image/svg+xml')
    elif typ in ['logo', 'general']:
        res = send_file(image_path, mimetype='image/png')
    return res
    

@app.route('/topics/<topicId>/images/posts/<filename>')
def get_image_for_posts(topicId, filename):
    image_path = f'public/images/posts/{filename}'
    res = send_file(image_path, mimetype='image/jpg')
    return res