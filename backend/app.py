import flask
from flask import Flask, render_template, request, url_for
import pandas as pd
import numpy as np
import pickle

app = Flask(__name__)

@app.route('/')
def index():
    return flask.render_template('index.html')

def ValuePredictor(to_predict, category):
    loaded_model = pickle.load(open(category, 'rb'))
    result = loaded_model.predict(to_predict)
    return result

@app.route('/predictsong', methods = ['GET'])
# need result() to be distinct
def result1():
    if request.method == 'GET':
        args = request.args
        to_predict = args.get("date")
        result = ValuePredictor(to_predict, 'song.pkl')
        prediction = str(result)
        return prediction

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Constrol-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True)