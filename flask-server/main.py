from server import app
import json
import psycopg2
import random


conn = psycopg2.connect(database="tranning-website", user="thanhdxn",
                        password="", host="127.0.0.1", port="5432")

print(f'Connection: {conn.status}')
cursor = conn.cursor()

def add_dumy_questions():
   # Sample JSON objects representing the questions
   json_objects = []

   # Generate and add the JSON objects to the array
   random.seed(10)
   for i in range(1, 6):
      json_object = {
         "q_text": f"Question {i + 5} related to Health",
         "post_id": 1,
         "op_a": f"Option A for Question {i}",
         "op_b": f"Option B for Question {i}",
         "op_c": f"Option C for Question {i}",
         "op_d": f"Option D for Question {i}",
         "ans": random.randint(1, 4)
      }
      json_objects.append(json_object)
   # Iterate over the JSON objects and call the procedure for each object
   for json_object in json_objects:
      # Convert the JSON object to a JSON string
      json_string = json.dumps(json_object)

      # Call the stored procedure with the JSON string as a parameter
      cursor.execute(f"CALL ADD_QUESTION_FROM_JSON('{json_string}')")

   # Commit the changes and close the database connection


add_dumy_questions()
conn.commit()
conn.close()