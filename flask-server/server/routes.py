from flask import jsonify, send_file, request, make_response
from server import app
from server.models import Topics, Posts, Question, Tests, Users
from  werkzeug.security import generate_password_hash, check_password_hash
import uuid
import jwt
from datetime import datetime, timedelta, timezone
from functools import wraps


def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # jwt is passed in the request header
        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']
        # return 401 if token is not passed
        if not token:
            return jsonify({'message' : 'Token is missing !!'}), 401
  
        try:
            # decoding the payload to fetch the stored details
            data = jwt.decode(token, app.config['SECRET_KEY'])
            current_user = Users.query\
                .filter_by(public_id = data['public_id'])\
                .first()
        except:
            return jsonify({
                'message' : 'Token is invalid !!'
            }), 401
        # returns the current logged in users context to the routes
        return  f(current_user, *args, **kwargs)
  
    return decorated

@app.route("/topics", methods=['GET'])
@token_required
def get_topic(token):
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

@app.route("/users/login", methods=['POST'])
def login():
    auth = request.form
    print(auth)
    user = Users.query.filter_by(email=auth.get('email')).first()
    if not user:
        return make_response(
            'Could not verify',
            401,
            {'WWW-Authenticate' : 'Basic realm ="User does not exist !!"'}
        )
    if check_password_hash(user.password, auth.get('password')) or (user.is_admin and user.password == auth.get('password')):
        print(app.config['SECRET_KEY'])
        token = jwt.encode({
            'public_id': user.public_id,
            'exp' : datetime.utcnow() + timedelta(minutes = 30)
        }, app.config['SECRET_KEY'])
        return make_response(
            jsonify({
            'username': user.username,
            'email': user.email,
            'is_admin': user.is_admin,
            'is_active': user.is_active,
            'token' : token.decode('UTF-8')
            }),
            201
        )
    return make_response(
        'Could not verify',
        403,
        {'WWW-Authenticate' : 'Basic realm ="Wrong Password !!"'}
    )

@app.route("/users/signup", methods =['POST'])
def signup():
    # creates a dictionary of the form data
    data = request.form
  
    # gets name, email and password
    username, email = data.get('username'), data.get('email')
    password = data.get('password')
  
    # checking for existing user
    user = Users.query\
        .filter_by(email = email)\
        .first()
    _user = Users.query\
        .filter_by(username = username)\
        .first()
    
    if not user and not _user:
        # database ORM object
        user = Users(
            public_id = str(uuid.uuid4()),
            username = username,
            email = email,
            password = generate_password_hash(password),
            created_date = datetime.now(timezone.utc),
            is_active = False,
            is_admin = False,
            avatar = ''
        )
        Users.add_new_user(user)
        return make_response('Successfully registered.', 201)
    else:
        # returns 202 if user already exists
        return make_response('User already exists. Please Log in.', 202)