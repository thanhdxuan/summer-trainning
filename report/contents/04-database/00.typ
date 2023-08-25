= Database Design
Từ các yêu cầu về dữ liệu, chúng ta cần phân tích để thiết kế cơ sở dữ liệu.
== Thiết kế mô hình thực thể mối liên kế (ERD Model)
Từ các yêu cầu về dữ liệu, có thể nhận thấy có 5 thực thể chính trong hệ thống dữ liệu của ứng dụng:
- Người dùng - *Users* (bao gồm: Admin và Nhân viên)
#figure(
   caption: [Thực thể người dùng (users)],
   image("entity-users.png", width: 60%)
)
- Chủ đề - *Topics*
#figure(
   caption: [Thực thể Chủ đề (topics)],
   image("entity-topics.png", width: 40%)
)
- Bài đăng - *Posts*
Đây là một thực thể yếu vì nó phụ thuộc vào thực thể *Chủ đề*
#figure(
   caption: [Thực thể Bài đăng (posts)],
   image("entity-posts.png", width: 40%)
)
- Câu hỏi - *Questions*
#figure(
   caption: [Thực thể Câu hỏi (questions)],
   image("entity-questions.png", width: 40%)
)
\
- Bài kiểm tra - *Tests* (được tạo khi người dùng trả lời các câu hỏi)
#figure(
   caption: [Thực thể Bài kiểm tra (tests)],
   image("entity-tests.png", width: 40%)
)

*Phân tích các mối quan hệ trong hệ thống:*
- Các Chủ đề bao gồm các bài đăng:
Mỗi *Chủ đề* bao gồm nhiều *Bài đăng*, nhưng mỗi *Bài đăng* chỉ thuộc về một *Chủ đề* cụ thể.
#figure(
   caption: [Mối liên kết giữa Topics và Posts],
   image("relation-topics-posts.png", width: 60%)
)
...\
Tổng quan lược đồ thực thể mối liên kết:
#figure(
   caption: [Lược đồ thực thể mối liên kết cho website],
   image("erd.png", width: 100%)
)
\
== Lược đồ cơ sở dữ liệu quan hệ (Database Schema)
Từ lược đồ thực thể mối liên kết, chúng ta có thể ánh xạ thành một lược đồ cơ sở dữ liệu quan hệ.
#figure(
   caption: [Lược đồ cơ sở dữ liệu quan hệ của website],
   image("schema.png", width: 110%)
)

== Cơ sở dữ liệu trong PostgreSQL
Sau có lược đồ cơ sở dữ liệu quan hệ, chúng ta bắt tay vào thiết kế cơ sở dữ liệu trong PostgreSQL:
```sql
--- Bảng Topics
CREATE TABLE
    Topics (
        topic_id SERIAL,
        topic_name VARCHAR(255) NOT NULL,
        topic_level INT NOT NULL,
        thumbnail VARCHAR(255) NOT NULL
    );

--- Bảng Users
CREATE TABLE
    Users (
        uuid SERIAL NOT NULL,
        username VARCHAR(255) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL,
        passwrd VARCHAR(255),
        created_date DATE,
        is_active BOOLEAN,
        is_admin BOOLEAN,
        u_avatar VARCHAR(255)
    );
....
--- Các ràng buộc
ALTER TABLE Topics ADD CONSTRAINT pk_topic PRIMARY KEY (topic_id);

ALTER TABLE Users ADD CONSTRAINT pk_user PRIMARY KEY (uuid);
....
--- Các procedures, functions
....
--- Hàm lấy số lượng bài đăng mà một user đã hoàn thành
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
  SELECT t.topic_id, t.topic_name, pt.uuid, COUNT(pt.post_id)::INT AS passed_post_count
  FROM topics t
  JOIN posts p ON t.topic_id = p.topic_id
  JOIN tests pt ON p.post_id = pt.post_id
  WHERE pt.passed = true AND pt.uuid = user_id
  GROUP BY t.topic_id, t.topic_name, pt.uuid;
END;
$$ LANGUAGE plpgsql;

....
```
Các `relation` đang có trong cơ sở dữ liệu `trainning-website`:
```console
training-website-# \dt
          List of relations
 Schema |   Name   | Type  |  Owner
--------+----------+-------+----------
 public | posts    | table | thanhdxn
 public | question | table | thanhdxn
 public | tests    | table | thanhdxn
 public | topics   | table | thanhdxn
 public | users    | table | thanhdxn
(5 rows)
```
Xem cấu trúc schema của các bảng trong cơ sở dữ liệu, ví dụ:\
Bảng `topics`:
```shell-unix-generic
tranning-website-# \d topics
```
#figure(
   caption: [Topics Schema],
   image("psql-topics.png", width: 100%)
)

Bảng `users`:
```shell-unix-generic
tranning-website-# \d users
```
#figure(
   caption: [Users Schema],
   image("psql-users.png", width: 100%)
)


#pagebreak()
