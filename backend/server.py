from flask import Flask
from flask import request, make_response, jsonify
from flask_mysqldb import MySQL
import hashlib
import os
import json
import jwt

app=Flask(__name__)


app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'root'
app.config['MYSQL_DB'] = 'mihir'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
mysql = MySQL(app)

@app.route("/")
def home():
    return("home page")


def generate_salt():
    salt = os.urandom(16)
    print(salt.encode('base-64'))
    return salt.encode('base-64')

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    print(hash.hexdigest())
    return hash.hexdigest()

@app.route("/signup",methods=['POST'])
def create():
    name = str(request.json["name"])
    email= str(request.json["email"])
    password=request.json["password"]
    
    cursor = mysql.connection.cursor()
    
    salt=generate_salt()
    hash_password=md5_hash(salt+" "+password)
    for _ in range(50):
        hash_password=md5_hash(hash_password)
    
    try:
        cursor.execute (
        """INSERT INTO users (name,salt,password,email) VALUES (%s,%s,%s,%s)""", (name,salt,hash_password,email)
    )
        mysql.connection.commit()
    except Exception as e:
        return jsonify({"error": True,  "message": str(e)})
    finally:
        cursor.close()
    return json.dumps({"error": False,  "message": "Registration successful"})




@app.route("/login",methods=['POST'])
def login():
    email=str(request.json["email"])
    password=str(request.json["password"])
    cursor = mysql.connection.cursor()
    print(type(email))
    try:
        cursor.execute (
            """SELECT email FROM users WHERE email=%s""", (email,)
        )        
        result=cursor.fetchone()
        if(result==None):
            return jsonify({"error":True,"message": "Invalid user email!! Please register:)"})

    except Exception as e:
        print(e)
        return jsonify({"error":True,"message": str(e)})
    
    try:
        cursor.execute("""SELECT salt FROM users WHERE email=%s""",(email,))
        salt=cursor.fetchone()
        print(salt)
        hash_password=md5_hash(salt["salt"]+" "+password)
        for _ in range(50):
            hash_password = md5_hash(hash_password)
        cursor.execute("""SELECT password FROM users WHERE email=%s""",(email,))
        password=cursor.fetchone()
        # cursor.close()
        print(password)
        if(hash_password != password["password"]):
            return jsonify({"error":True,"message": "incorrect password"})
        else:
            key="secret"
            encoded = jwt.encode({'email':email},key,algorithm='HS256')
            cursor.execute("""SELECT id,name from users WHERE email=%s""",(email,))
            user=cursor.fetchone()
            return json.dumps({"error":False,"token":encoded,"user_id":user["id"],"name":user["name"],"email":email})
    except Exception as e:
        cursor.close()
        print(e)
        return jsonify({"error":True,"message": str(e)})

@app.route("/user",methods=['GET'])
def auth():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    email = jwt.decode(token_encoded, 'secret', algorithms=['HS256'])
    print(email)
    try:
        cursor=mysql.connection.cursor()
        cursor.execute("""SELECT count(id) FROM users WHERE email=%s""",(str(email["email"]),))
        result = cursor.fetchone()
        print(result)
    except Exception as e:
        return jsonify({"error":True,"message": str(e)})
    
    if(result["count(id)"]==0):
        return jsonify({"error":True,"message": "unauthorised access restricted"})
    else:
        cursor.execute("""SELECT id,name,email FROM users WHERE email=%s""",(str(email["email"]),))
        result = cursor.fetchone()
        cursor.close()
        return jsonify({"error":False,"data": result,"token":token_encoded})
    
@app.route("/update_blog",methods=['PUT'])
def update_blog():
    content=str(request.json["content"])
    category = str(request.json['category'])
    user_id = str(request.json['user_id'])
    blog_title = str(request.json['blog_title'])
    blog_id = str(request.json['blog_id'])
    auth_header = request.headers.get('Authorization')
    if auth_header == None:
        return jsonify({"error":True,"message": "Access Restricted"})
    token_encoded = auth_header.split(' ')[1]
    email = jwt.decode(token_encoded, 'secret', algorithms=['HS256'])
    print(email)
    try:
        cursor=mysql.connection.cursor()
        cursor.execute("""SELECT id FROM users WHERE email=%s""",(str(email["email"]),))
        result = cursor.fetchone()
        cursor.close()
        if result["id"] != int(user_id):
            return jsonify({"error":True,"message": "Access Restricted"})
        # authenticated
        else:
            cursor=mysql.connection.cursor()
            cursor.execute("""UPDATE blogs SET title=%s, content=%s,category_id=%s WHERE id=%s AND user_id=%s """,(blog_title,content,category,blog_id,user_id,))
            mysql.connection.commit()
    except Exception as e:
        return jsonify({"error":True,"message": str(e)})
    finally:
        cursor.close()
    return jsonify({"error":False,"message": "Blog updated successfully"})

@app.route("/delete_blog",methods=['DELETE'])
def delete_blog():
    blog_id = str(request.json["blog_id"])
    auth_header = request.headers.get('Authorization')
    if auth_header == None:
        return jsonify({"error":True,"message": "Access Restricted"})
    token_encoded = auth_header.split(' ')[1]
    email = jwt.decode(token_encoded, 'secret', algorithms=['HS256'])
    print(email)
    try:
        cursor=mysql.connection.cursor()
        cursor.execute("""SELECT id FROM users WHERE email=%s""",(str(email["email"]),))
        result = cursor.fetchone()
        cursor.close()
        print("user_id:",result)
        if(result):
            cursor=mysql.connection.cursor()
            cursor.execute("""SELECT id FROM blogs WHERE user_id=%s AND id=%s""",(result["id"],blog_id,))
            result=cursor.fetchone()
            cursor.close()
            print("blog_id to delete:",result)
            if(result):
                cursor=mysql.connection.cursor()
                cursor.execute("""DELETE FROM blogs WHERE id=%s""",(result["id"],))
                mysql.connection.commit()
                cursor.close()
            else:
                return jsonify({"error":True,"message": "No such blog available to delete"})
        else:
            cursor.close()
            return jsonify({"error":True,"message": "Access Restricted"}) 
    except Exception as e:
        cursor.close()
        return jsonify({"error":True,"message": str(e)})
    return jsonify({"error":False,"message": "blog deleted successfully."})


@app.route("/new_blog",methods=['POST'])
def create_blog():
    
    content=str(request.json["content"])
    category = str(request.json['category'])
    user_id = str(request.json['user_id'])
    blog_title = str(request.json['blog_title'])

    cursor = mysql.connection.cursor()
    try:
        cursor.execute("""INSERT INTO blogs (user_id,category_id,content,title) VALUES (%s,%s,%s,%s)""",(user_id,category,content,blog_title))
        mysql.connection.commit()
    except Exception as e:
        return jsonify({"error":True,"message":str(e)})
    finally:
        cursor.close()
    return jsonify({"error":False,"message":"New blog created successfully"})

@app.route("/show_blogs",methods=['GET'])
def show_blogs():
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("""SELECT blogs.id,blogs.user_id, category_id,content,published_on,updated_on,title,users.name FROM blogs JOIN users on blogs.user_id=users.id""")
        results=cursor.fetchall()
        
    except Exception as e:
        return jsonify({"error":True,"message":str(e)})
    finally:
        cursor.close()
    return jsonify({"error":False,"data":results})

@app.route("/show_comments",methods=['POST'])
def show_comments():
    blog_id=str(request.json["blog_id"])
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("""SELECT content,created_on,updated_on,users.name FROM comments JOIN users ON user_id=users.id WHERE blog_id=%s""",(blog_id,))
        results=cursor.fetchall()
        
    except Exception as e:
        return jsonify({"error":True,"message":str(e)})
    finally:
        cursor.close()
    return jsonify({"error":False,"data":results})


@app.route("/new_comment",methods=["POST"])
def create_comment():
    user_id = str(request.json['user_id'])
    content = str(request.json['content'])
    blog_id = int(request.json['blog_id'])
    cursor = mysql.connection.cursor()
    try:
        
        cursor.execute("""INSERT INTO comments (user_id,blog_id,content) VALUES (%s,%s,%s)""",(user_id,blog_id,content))
        mysql.connection.commit()
    except Exception as e:
        return jsonify({"error":True,"message":str(e)})
    finally:
        cursor.close()
    return jsonify({"error":False,"message":"New comment created successfully"})

@app.route("/get_user",methods=["POST"])
def get_user():
    user_id = int(request.json['id'])
    cursor = mysql.connection.cursor()
    try:
        cursor.execute("""SELECT name FROM users WHERE id=%s""",(user_id,)) 
        result = cursor.fetchone()
    except Exception as e:
        return jsonify({"error":True,"message":str(e)})
    finally:
        cursor.close()
    return jsonify({"error":False,"data":result})
