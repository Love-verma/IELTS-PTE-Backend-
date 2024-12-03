from flask import Flask, render_template, request, jsonify


app = Flask(__name__)



@app.route('/flask', methods=['GET'])
def flk():
    data = {
        "success":True,
        "message":"Flask server is running here!"
    }
    return jsonify(data),200

@app.route('/user', methods=['POST'])
def getUser():
    data = request.get_json()
    name = data.get('name')
    email = data.get('email')
    user = {
        "name":name,
        "email":email
    }

    data = {
        "success":True,
        "message":"Flask server is running here!",
        "data":user
    }
    return jsonify(data),200

if __name__ == "__main__":
    app.run()