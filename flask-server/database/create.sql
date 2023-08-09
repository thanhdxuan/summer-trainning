-- Active: 1691565118154@@127.0.0.1@5432@tranning-website

-- Create Topic table

CREATE TABLE
    Topics (
        topic_id SERIAL,
        topic_name VARCHAR(255) NOT NULL,
        topic_level INT NOT NULL,
        thumbnail VARCHAR(255) NOT NULL
    );

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

CREATE TABLE
    Posts (
        post_id SERIAL,
        topic_id INT,
        p_title VARCHAR(255) NOT NULL,
        created_date DATE,
        p_description VARCHAR(255),
        p_text VARCHAR(255) NOT NULL,
        banner VARCHAR(255)
    );

CREATE TABLE
    Tests (
        test_id SERIAL,
        uuid INT,
        post_id INT,
        duration INT NOT NULL,
        num_question INT NOT NULL,
        score INT
    );

CREATE TABLE
    Question (
        q_id SERIAL,
        post_id SERIAL,
        q_text VARCHAR(255) NOT NULL,
        op_a VARCHAR(255) NOT NULL,
        op_b VARCHAR(255) NOT NULL,
        op_c VARCHAR(255) NOT NULL,
        op_d VARCHAR(255) NOT NULL,
        ans INT NOT NULL -- (0 - 3)
    );

--- Create primary key constaints

ALTER TABLE Topics ADD CONSTRAINT pk_topic PRIMARY KEY (topic_id);

ALTER TABLE Users ADD CONSTRAINT pk_user PRIMARY KEY (uuid);

ALTER TABLE Posts
ADD
    CONSTRAINT pk_post PRIMARY KEY (post_id, topic_id);

ALTER TABLE Tests
ADD
    CONSTRAINT pk_test PRIMARY KEY (test_id, post_id, uuid);

ALTER TABLE Question
ADD
    CONSTRAINT pk_question PRIMARY KEY (q_id, post_id);

--- Create foreign key constraints

ALTER TABLE Posts
ADD
    CONSTRAINT fk_posts_topicId FOREIGN KEY (topic_id) REFERENCES Topics(topic_id);

ALTER TABLE Tests
ADD
    CONSTRAINT fk_tests_uid FOREIGN KEY (uuid) REFERENCES Users(uuid);

ALTER TABLE Posts ADD CONSTRAINT unique_post_postID UNIQUE (post_id);

ALTER TABLE Tests
ADD
    CONSTRAINT fk_tests_postId FOREIGN KEY (post_id) REFERENCES Posts(post_id);

ALTER TABLE Question
ADD
    CONSTRAINT fk_question_postId FOREIGN KEY (post_id) REFERENCES Posts(post_id);

--- Add some constraints

ALTER TABLE Users
ADD
    CONSTRAINT users_chk_valid_email CHECK (
        email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    ),
ADD
    CONSTRAINT users_chK_valid_username CHECK (
        length(username) > 5
        AND username <> 'admin'
        AND username <> 'username'
    );

ALTER TABLE Tests
ADD
    CONSTRAINT tests_chk_validnumq CHECK (
        num_question > 0
        AND duration > 0
    );

ALTER TABLE Topics
ADD
    CONSTRAINT topic_chk_valid_level CHECK (
        topic_level > 0
        AND topic_level < 4
    );

--- Add dummy datas

-- # NOTE: Dummy data for topic table

INSERT INTO
    Topics (
        topic_name,
        topic_level,
        thumbnail
    )
VALUES (
        'Training: Culture',
        1,
        'images/culture.svg'
    );

INSERT INTO
    Topics (
        topic_name,
        topic_level,
        thumbnail
    )
VALUES (
        'Training: Health',
        2,
        'images/health.svg'
    ), (
        'Training: Food and drink',
        3,
        'images/food_and_drink.svg'
    ), (
        'Training: Politics and society',
        2,
        'images/food_and_drink.svg'
    ), (
        'Training: Sport',
        2,
        'images/sport.svg'
    );

-- # NOTE: dummy data for user table

INSERT INTO
    Users (
        username,
        email,
        passwrd,
        created_date,
        is_active,
        is_admin,
        u_avatar
    )
VALUES (
        'chipheo_01',
        'chipheo_01@gmail.com',
        'chipheo_01',
        '2023-08-09',
        true,
        false,
        'images/avatar/chipheo_01.jpg'
    ), (
        'thino_01',
        'thino@gmail.com',
        'thino_01',
        '2023-08-09',
        true,
        false,
        'images/avatar/thino_01.jpg'
    ), (
        'thanhdau',
        'hello.thanhdauxuan@gmail.com',
        'thanhdau',
        '2023-08-09',
        true,
        true,
        'images/avatar/thanhdau.jpg'
    );

-- # NOTE: Dummy data for posts

INSERT INTO
    posts (
        topic_id,
        p_title,
        created_date,
        p_description,
        p_text,
        banner
    )
VALUES (
        2,
        'The Power of Daily Exercise: Boost Your Health and Well-being',
        '2023-08-09',
        'Discover the transformative effects of incorporating daily exercise into your routine. Improve your physical fitness, mental clarity, and overall health.',
        'topics/health/posts/p_01/index.html',
        'images/p_banner/the-power-of-daily-exercise.jpg'
    ), (
        2,
        'Nutrition Essentials: Nourish Your Body for Optimal Health and Vitality',
        '2023-08-10',
        'Unlock the secrets of healthy eating with essential nutrition tips. Learn how to fuel your body with nutrient-rich foods that promote optimal health and vitality.',
        'topics/health/posts/p_02/index.html',
        'images/p_banner/nutrition-esstials.jpg'
    ), (
        2,
        'Stress Management Techniques: Achieve Inner Balance and Mental Well-being',
        '2023-08-11',
        'Uncover the secrets of good sleep hygiene for restful nights and enhanced vitality. Learn about the importance of sleep, establish healthy sleep habits',
        'topics/health/posts/p_03/index.html',
        'images/p_banner/stress-management-techniques.jpg'
    );