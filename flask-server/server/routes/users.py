from server import app
from .auth import token_required
from flask import make_response, jsonify, request
from server.models import Users, Tests, Posts, engine, db, Topics
from sqlalchemy import text
from datetime import datetime

@app.route('/users/<public_uid>/status', methods=['GET'])
# @token_required
def get_passed_post_status(public_uid):
   user = Users.query.filter_by(public_id=public_uid).first()

   if user:
      uid = user._id
   query = text(f'SELECT * FROM get_passed_post_count_by_user({uid});')
   data = {}
   with engine.connect() as con:
      result = con.execute(query)
      result = result.all()
      for row in result:
         row_data = {
            'topic_name': row.topic_name,
            'uuid': row.uuid,
            'passed_count': row.passed_post_count
         }
         row_data = {
            row.topic_id: row_data
         }
         data.update(row_data)
   return jsonify(data)

@app.route('/users/<public_uid>/<topic_id>/posts', methods=['GET'])
def get_post_status(public_uid, topic_id):
   user = Users.query.filter_by(public_id=public_uid).first()
   uid = user._id

   taken_test = Tests.query.filter_by(uuid=uid, topic_id=topic_id).all()
   return jsonify(taken_test)

@app.route('/users/test/submit', methods=['POST'])
def submit_test():
   data = request.form
   public_id = data.get('public_id')
   post_id = data.get('post_id')
   passed = data.get('passed')
   score = data.get('score')

   topic_id = Posts.query.filter_by(_id=post_id).first().topic_id
   uid = Users.get_real_id(public_id=public_id)
   new_test = Tests(
      uuid = uid,
      post_id = post_id,
      score = score,
      passed = passed == 'true',
      topic_id = topic_id
   )

   Tests.add_new_test(new_test=new_test)

   return make_response("Success!", 201)

@app.route('/users/all', methods=['GET'])
def get_all_user():
   users = Users.query.order_by(Users._id).all()
   users = [{'_id': user.public_id, 'email': user.email, 
            'is_active': user.is_active, 'username': user.username,
            'is_admin': user.is_admin,
            'created_date': user.created_date.strftime('%B %d, %Y')
            } for user in users ]
   return jsonify(users)

# @app.route('/users/activate', methods=['POST'])
# def activate_user():
#    data = request.form
   
#    public_id = data.get('_id')

#    Users.activate(public_id)
#    return make_response("Activate success", 201)
"""
   test_id uid p_id        pid_
   Select *
   from test
   where (post_id == post_id) and passed == passed
"""