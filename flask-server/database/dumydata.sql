-- Active: 1691565118154@@127.0.0.1@5432@tranning-website

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


-- # NOTE: Dummy data for questions table
CALL ADD_QUESTION_FROM_JSON('{
   "q_text": "What is the recommended daily water intake for adults?",
   "post_id": 1,
   "op_a": "2 liters",
   "op_b": "4 liters",
   "op_c": "8 liters",
   "op_d": "10 liters",
   "ans": 1
}');

CALL ADD_QUESTION_FROM_JSON('{
  "q_text": "Which nutrient is essential for maintaining healthy bones and teeth?",
  "post_id": 2,
  "op_a": "Vitamin C",
  "op_b": "Vitamin D",
  "op_c": "Vitamin B12",
  "op_d": "Vitamin A",
  "ans": 2
}');

CALL ADD_QUESTION_FROM_JSON('{
  "q_text": "Which of the following foods is a good source of dietary fiber?",
  "post_id": 2,
  "op_a": "Eggs",
  "op_b": "White bread",
  "op_c": "Broccoli",
  "op_d": "Soda",
  "ans": 3
}');

CALL ADD_QUESTION_FROM_JSON('{
  "q_text": "What is the normal resting heart rate for adults?",
  "post_id": 2,
  "op_a": "50 beats per minute",
  "op_b": "70 beats per minute",
  "op_c": "90 beats per minute",
  "op_d": "110 beats per minute",
  "ans": 2
}');
