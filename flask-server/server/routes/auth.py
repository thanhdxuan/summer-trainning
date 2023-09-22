from server import app
from flask import request, make_response, jsonify
from  werkzeug.security import generate_password_hash, check_password_hash
from server.models import Users
import datetime
from datetime import datetime, timedelta, timezone
import jwt
import uuid
import random
from functools import wraps
from flask_mail import Message, Mail
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
            'uid': user.public_id,
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
def sign_up():
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

@app.route("/users/activate", methods=['POST'])
def activate_user():
    data = request.form

    username = data.get('username')
    Users.activate(username=username)
    return make_response("Success", 201)

@app.route("/users/deactivate", methods=['POST'])
def deactivate_user():
    data = request.form

    username = data.get('username')
    Users.deactivate(username=username)
    return make_response("Success", 201)




@app.route('/change_password/submit', methods=['POST'])
def submit_change_password():
   data = request.form

   curr_pass = data.get('current_pass')
   new_pass = data.get('new_pass')
   uid = data.get('uid')
   user = Users.query.filter_by(public_id=uid).first()
   if not check_password_hash(user.password, curr_pass):
        return make_response("Password is incorrect!", 401)

   user.password = generate_password_hash(new_pass)
   user.save()

   return make_response("Successfully", 200)

def send_reset_email(user):
    token = user.get_reset_token()
    mail = Mail(app)
    msg = Message('STraining: Password Reset Request',
                  sender='forum.akselos@gmail.com',
                  recipients=[user.email])
    msg.body = f'''Please click to folowing link to reset password:
http://127.0.0.1:3000/reset_password/{token.decode('ASCII')}
This link is deleted after 3 minutes.
'''
    mail.send(msg)
    

@app.route('/reset_password', methods=['POST'])
def reset_request():
    data = request.form
    email = data.get('email')

    user = Users.query.filter_by(email=email).first()

    if user is None:
        return make_response("User is not exists!", 404)
    
    send_reset_email(user)

    return make_response("Reset email is sent!", 200)
@app.route('/reset_password/<token>/verify', methods=['GET'])
def reset_token(token):
    user =  Users.verify_reset_token(token)
    if user is None:
        return make_response("Token is invalid or expired!", 401)
    
    return make_response("Reset password successfully!", 201)

@app.route('/reset_password/<token>/submit', methods=['POST'])
def reset_token_submit(token):
    user =  Users.verify_reset_token(token)
    if user is None:
        return make_response("Token is invalid or expired!", 401)
    
    data = request.form

    new_pass = data.get('new_pass')
    
    user.password = generate_password_hash(new_pass)
    user.save()

    return make_response("Reset password successfully!", 201)


