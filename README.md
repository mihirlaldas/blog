# blog
Registered user can create new blog post. Update and delete old blogs. Can comment on blogs as well.


```
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
```
