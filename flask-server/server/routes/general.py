from flask import jsonify, send_file, request, make_response
from server import app
from server.models import Topics, Posts, Question, Tests, Users
from .auth import token_required


@app.route("/topics", methods=['GET'])
@token_required
def get_topic(token):
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
@app.route('/posts/<public_id>/<post_id>/status')
def get_all_question_of_posts(post_id, public_id):
    uid = Users.get_real_id(public_id=public_id)

    questions = Question.query.filter_by(post_id=post_id).order_by(Question._id).all()
    taken_test = Tests.query.filter_by(post_id=post_id, uuid=uid).all()
    
    passed_test = False
    for test in taken_test:
        if test.passed == True:
            passed_test = True
            break

    status = {
        "questions": questions,
        "history": taken_test,
        "status": passed_test
    }
    return jsonify(status)

@app.route('/images/<typ>/<filename>')
def get_image(typ, filename):
    image_path = f'public/images/{typ}/{filename}'

    if typ in ['topics']:
        res = send_file(image_path, mimetype='image/svg+xml')
    elif typ in ['logo', 'general']:
        res = send_file(image_path, mimetype='image/png')
    elif typ in ['posts']:
        res = send_file(image_path, mimetype='image/jpg')
    return res
    

@app.route('/topics/<topicId>/images/posts/<filename>')
def get_image_for_posts(topicId, filename):
    image_path = f'public/images/posts/{filename}'
    res = send_file(image_path, mimetype='image/jpg')
    return res

@app.route('/topics/add', methods=['POST'])
def add_new_topic():
    data = request.form

    new_topic = Topics(
        name = data.get('name'),
        level = data.get('level'),
        thumbnail = data.get('thumbnail'),
        description = data.get('description')
    )
    try:
        Topics.add_new_topic(new_topic)
        return make_response("Add topic successfully!", 201)
    except:
        return make_response("Failed", 401)

@app.route('/posts/add', methods=['POST'])
def add_new_post():
    data = request.form

    new_post = Posts(
        topic_id = data.get('topic_id'),
        title = data.get('title'),
        created_date = data.get('created_date'),
        description = data.get('description'),
        banner = data.get('banner')
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
        op_d = data.get('op_d')
    )
    Question.add_new_question(new_question)
    


