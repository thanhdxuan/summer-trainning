from flask import jsonify, send_file, request, make_response
from server import app
from server.models import Topics, Posts, Question, Tests, Users
from .users import get_passed_post_status
from .auth import token_required
import os
from hashlib import sha512
import base64
from datetime import datetime
import json

def generate_hashed_filename(file, max_length=50):
    file_hash = sha512(str(file.filename).encode('utf-8')).hexdigest()

    _, file_extension = os.path.splitext(file.filename)


    hashed_filename = file_hash[max_length:] + file_extension

    return hashed_filename

@app.route("/topics", methods=['POST', 'GET'])
@token_required
def get_topic(token):
    topics = Topics.query.order_by(Topics._id).all()
    topic_list = []

    uid = request.form.get('public_id')
    status_data = json.loads(get_passed_post_status(uid).data)
    for topic in topics:
        status = False
        if str(topic._id) in status_data:
            status = True
        topic_data = {
            'id': topic._id,
            'name': topic.name,
            'level': topic.level,
            'thumbnail': topic.thumbnail,
            'description': topic.description,
            'num_posts': topic.get_number_of_posts(),
            'status': status
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
                'description': topic.description,
                'thumbnail': topic.thumbnail,
                'num_posts': topic.get_number_of_posts()
            }
            topic_list.append(topic_data)

    
    return jsonify(topic_list)
@app.route('/filter/topics', methods=['POST'])
@token_required
def filter_topic(token):
    level = int(request.form.get('level'))
    status = int(request.form.get('status'))

    topic_data = get_topic().json

    fT = []
    if level == -1 and status == -1:
        for topic in topic_data:
            fT.append(topic)
        return jsonify(fT)
    elif level == -1:
        for topic in topic_data:
            if topic['status'] == status:
                fT.append(topic)
    elif status == -1:
        for topic in topic_data:
            if topic['level'] - 1 == level:
                fT.append(topic)
    else:
        for topic in topic_data:
            if topic['status'] == status and topic['level'] - 1 == level:
                fT.append(topic)
    return jsonify(fT)


@app.route("/topics/<topic_id>/posts")
def get_all_posts_from_topic_id(topic_id):
    posts = Posts.query.filter_by(topic_id=topic_id).all()
    topic = Topics.query.filter_by(_id=topic_id).all()

    
    def get_num_of_question(postId):
        return len(Question.query.filter_by(post_id=postId).all())
    infor = {
        "topic_name": topic[0].name,
        "posts": [{
            '_id': post._id,
            'title': post.title,
            'number_of_questions': get_num_of_question(postId=post._id),
            'created_date': post.created_date.strftime('%B %d, %Y'),
            'banner': post.banner,
            'read_time': post.read_time,
            'content': post.content,
            'description': post.description
        } for post in posts]
    }
    return jsonify(infor)

@app.route('/posts/<post_id>/questions')
def get_all_question_of_posts(post_id):
    questions = Question.query.filter_by(post_id=post_id).order_by(Question._id).all()
    
    return jsonify(questions)


@app.route('/posts/<public_id>/<post_id>/status')
def user_get_all_question_of_posts(post_id, public_id):
    uid = Users.get_real_id(public_id=public_id)

    questions = Question.query.filter_by(post_id=post_id).order_by(Question._id).all()
    taken_test = Tests.query.filter_by(post_id=post_id, uuid=uid).all()
    
    passed_test = False
    for test in taken_test:
        if test.passed == True:
            passed_test = True
            break

    reformat_test = [
        {
            "_id": test._id,
            "passed": test.passed,
            "post_id": test.post_id,
            "score": test.score,
            "taken_time": test.taken_time.strftime('%B %d, %Y'),
            "topic_id": test.topic_id,
        } for test in taken_test
    ]
    status = {
        "questions": questions,
        "history": reformat_test,
        "status": passed_test
    }
    return jsonify(status)

@app.route('/images/<typ>/<filename>')
def get_image(typ, filename):
    image_path = f'public/images/{typ}/{filename}'

    if typ in ['topics']:
        res = send_file(image_path, mimetype='image/*+xml')
    elif typ in ['logo', 'general']:
        res = send_file(image_path, mimetype='image/*')
    elif typ in ['posts']:
        res = send_file(image_path, mimetype='image/*')
    return res
    

@app.route('/topics/<topicId>/images/posts/<filename>')
def get_image_for_posts(topicId, filename):
    image_path = f'public/images/posts/{filename}'
    res = send_file(image_path, mimetype='image/jpg')
    return res

@app.route('/topics/add', methods=['POST'])
def add_new_topic():
    data = request.form

    file = request.files['file']
    if file:
        hashed_filename = generate_hashed_filename(file)
        upload_path = os.path.join(app.config['UPLOADS_PATH'], 'images/topics/', hashed_filename)
        file.save(upload_path)

    new_topic = Topics(
        name = data.get('name'),
        level = data.get('level'),
        thumbnail = f"/images/topics/{hashed_filename}",
        description = data.get('description')
    )
    try:
        Topics.add_new_topic(new_topic)
        return make_response("Add topic successfully!", 201)
    except:
        return make_response("Failed", 401)

@app.route('/topics/delete', methods=['POST'])
def delete_topic():
    data = request.form

    _id = data.get('id')

    Topics.remove_topic(topic_id=_id)
    return make_response("Success", 201)

@app.route('/posts/add', methods=['POST'])
def add_new_post():
    data = request.form

    file = request.files['file']
    if file:
        hashed_filename = generate_hashed_filename(file)
        upload_path = os.path.join(app.config['UPLOADS_PATH'], 'images/posts/', hashed_filename)
        file.save(upload_path)
    
    new_post = Posts(
        topic_id = data.get('topic_id'),
        title = data.get('title'),
        created_date = datetime.now(),
        description = data.get('description'),
        content = data.get('content'),
        read_time = data.get('read_time'),
        banner = f"/images/posts/{hashed_filename}"
    )

    try:
        Posts.add_new_post(new_post)
        return make_response("Add new posts successfully", 201)
    except:
        return make_response("Failed", 401)


@app.route('/questions/add', methods=['POST'])
def add_new_question():
    data = request.form

    new_question = Question(
        post_id = data.get('post_id'),
        content = data.get('content'),
        op_a = data.get('op_a'),
        op_b = data.get('op_b'),
        op_c = data.get('op_c'),
        op_d = data.get('op_d'),
        answer = data.get('answer')
    )
    Question.add_new_question(new_question)

    return make_response("Success", 201)

@app.route('/questions/delete', methods=['POST'])
def delete_post():
    data = request.form
    _id = data.get('id')

    Question.remove_question(id=_id)
    return make_response("Success", 201)


@app.route('/posts/update', methods=['POST'])
def update_post():
    data = request.form
    _id = data.get('id')

    updated = {
        'title': data.get('title'),
        'description': data.get('description'),
        'content': data.get('content'),
        'read_time': data.get('read_time'),
    }
    Posts.update_post(_id, update=updated)    
    return make_response("Success", 201)
    


