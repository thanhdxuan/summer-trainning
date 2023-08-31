-- Active: 1691565118154@@127.0.0.1@5432@tranning-website

-- # NOTE: Procedure 
CREATE OR REPLACE PROCEDURE ADD_QUESTION_FROM_JSON (
   IN question_json JSON
)
LANGUAGE plpgsql
AS $$
DECLARE
   q_text VARCHAR;
   post_id INT;
   op_a VARCHAR;
   op_b VARCHAR;
   op_c VARCHAR;
   op_d VARCHAR;
   ans INT;
BEGIN
   q_text := question_json ->> 'q_text';
   post_id := question_json ->> 'post_id';
   op_a := question_json ->> 'op_a';
   op_b := question_json ->> 'op_b';
   op_c := question_json ->> 'op_c';
   op_d := question_json ->> 'op_d';
   ans := question_json ->> 'ans';

   INSERT INTO Question (post_id, q_text, op_a, op_b, op_c, op_d, ans)
   VALUES (post_id, q_text, op_a, op_b, op_c, op_d, ans);
END;
$$;

-- # NOTE: Get random question from collection

DROP FUNCTION GENERATE_TEST_FOR_POST;
CREATE OR REPLACE FUNCTION GENERATE_TEST_FOR_POST (
   IN num_question INT,
   IN p_id INT
)
RETURNS TABLE(qu_text VARCHAR, o_a VARCHAR, o_b VARCHAR, o_c VARCHAR, o_d VARCHAR)
-- RETURNS TABLE()
LANGUAGE plpgsql
AS $$
BEGIN
   RETURN QUERY
   SELECT q_text, op_a, op_b, op_c, op_d FROM Question
   WHERE Question.post_id = p_id
   ORDER BY RANDOM()
   LIMIT num_question;
END;
$$;

SELECT GENERATE_TEST_FOR_POST(5, 1);


--- # NOTE: Function to make a test

--- # NOTE: 
CREATE OR REPLACE FUNCTION get_passed_post_count_by_user(user_id INT)
RETURNS TABLE (
  topic_id INT,
  topic_name VARCHAR(255),
  uuid INT,
  passed_post_count INT
)
AS $$
BEGIN
  RETURN QUERY
  SELECT t.topic_id, t.topic_name, pt.uuid, COUNT(DISTINCT pt.post_id)::INT AS passed_post_count
  FROM topics t
  JOIN posts p ON t.topic_id = p.topic_id
  JOIN tests pt ON p.post_id = pt.post_id
  WHERE pt.passed = true AND pt.uuid = user_id
  GROUP BY t.topic_id, t.topic_name, pt.uuid;
END;
$$ LANGUAGE plpgsql;

DROP Function get_passed_post_count_by_user;

