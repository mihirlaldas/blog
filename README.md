# blog

Registered user can create new blog post. Update and delete old blogs. Can comment on blogs as well.
Authentication done using JWT. password saved using md5_hash encruption

## How to run

- First import mihir_blog.sql . you will get all the tables with some data
  - Tables are Users, blogs, comments, category
  - user credentials. email - mihir@gmail.com, password - mihir. email - somu@in.com, password - somu.
- allow CORS . ** gives error if not allowed **

  - [install chrome extension cors](https://chrome.google.com/webstore/detail/allow-cors-access-control/lhobafahddgcelffkeicbaginigeejlf?hl=en)

- start flask app.

  - in your terminal goto blog/backend
  - run the following commands
    - export FLASK_ENV=development
    - export FLASK_APP=server.py
    - flask run

- start frontend
  - in your terminal go to frontend
    - npm i
    - npm start

```
mysql> describe users;
+----------+--------------+------+-----+---------+----------------+
| Field    | Type         | Null | Key | Default | Extra          |
+----------+--------------+------+-----+---------+----------------+
| id       | int(11)      | NO   | PRI | NULL    | auto_increment |
| name     | varchar(255) | NO   |     | NULL    |                |
| email    | varchar(255) | NO   | UNI | NULL    |                |
| password | varchar(255) | NO   |     | NULL    |                |
| salt     | varchar(255) | NO   |     | NULL    |                |
+----------+--------------+------+-----+---------+----------------+
5 rows in set (0.01 sec)


mysql> describe blogs;
+--------------+--------------+------+-----+-------------------+-----------------------------+
| Field        | Type         | Null | Key | Default           | Extra                       |
+--------------+--------------+------+-----+-------------------+-----------------------------+
| id           | int(11)      | NO   | PRI | NULL              | auto_increment              |
| user_id      | int(11)      | NO   | MUL | NULL              |                             |
| category_id  | int(11)      | NO   | MUL | NULL              |                             |
| content      | text         | NO   |     | NULL              |                             |
| published_on | datetime     | NO   |     | CURRENT_TIMESTAMP |                             |
| updated_on   | datetime     | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
| title        | varchar(255) | YES  |     | NULL              |                             |
+--------------+--------------+------+-----+-------------------+-----------------------------+
7 rows in set (0.01 sec)

mysql> describe comments;
+------------+----------+------+-----+-------------------+-----------------------------+
| Field      | Type     | Null | Key | Default           | Extra                       |
+------------+----------+------+-----+-------------------+-----------------------------+
| id         | int(11)  | NO   | PRI | NULL              | auto_increment              |
| blog_id    | int(11)  | NO   | MUL | NULL              |                             |
| user_id    | int(11)  | NO   | MUL | NULL              |                             |
| content    | text     | NO   |     | NULL              |                             |
| created_on | datetime | NO   |     | CURRENT_TIMESTAMP |                             |
| updated_on | datetime | NO   |     | CURRENT_TIMESTAMP | on update CURRENT_TIMESTAMP |
+------------+----------+------+-----+-------------------+-----------------------------+
6 rows in set (0.00 sec)


mysql> describe category;

+-------+--------------+------+-----+---------+----------------+
| Field | Type         | Null | Key | Default | Extra          |
+-------+--------------+------+-----+---------+----------------+
| id    | int(11)      | NO   | PRI | NULL    | auto_increment |
| name  | varchar(255) | NO   |     | NULL    |                |
+-------+--------------+------+-----+---------+----------------+
2 rows in set (0.00 sec)


```
