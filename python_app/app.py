from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from Models import get_model
from app_utils import model_predict

app = Flask(__name__)
CORS(app)


@app.route("/", methods=["GET"])
def main():
    return "Main page of NMT application"


@app.route("/translate", methods=["POST"])
def translate_function():
    data = request.get_json()
    sentence = data["sentence"]
    try:
        result = model_predict(sentence)
        res = {
            "result": result,
            "success": 1
        }
        return jsonify(res)
    except Exception as e:
        print("Cannot make prediction due to {}".format(e))
        res = {
            "result": "",
            "success": 0
        }
        return jsonify(res)


if __name__ == "__main__":
    app.run()
