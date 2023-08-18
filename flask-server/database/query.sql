-- Active: 1691565118154@@127.0.0.1@5432@tranning-website

-- # NOTE: Get all number of posts for each user
SELECT t.topic_id, t.topic_name, pt.uuid, COUNT(pt.post_id) AS passed_post_count
FROM topics t
JOIN posts p ON t.topic_id = p.topic_id
JOIN tests pt ON p.post_id = pt.post_id
WHERE pt.passed = true
GROUP BY t.topic_id, t.topic_name, pt.uuid;


SELECT * FROM get_passed_post_count_by_user(1);