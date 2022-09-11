import flask
from flask import Flask, render_template, request, url_for
import pandas as pd
import numpy as np
import pickle
import sys; print(sys.path)
import petpy

app = Flask(__name__)

@app.route('/')
def index():
    return flask.render_template('index.html')

def ValuePredictor(to_predict, category):
    loaded_model = pickle.load(open(category, 'rb'))
    result = loaded_model.predict(to_predict)
    return result

def getpets(gender=None, location=None, breed=None):
    pf = petpy.Petfinder(key='2p8Gsyz5kSnyKFNp4w7XqmNWD5UDHgPJ5Qkn9gLp9XHbkXOp68', secret='EEjObz7j3VQ0XhrOgITmyiZUK4nTg0LtJMcGzHdb')
    cats_df = pf.animals(animal_type='cat', status='adoptable', gender=gender, location=location, 
    breed=breed, return_df = True)
    cats_df = cats_df.drop('organization_id', axis=1)
    cats_json = cats_df.to_json(orient='records')
    return cats_json
    return np.array2string(cats_df[['id']].to_numpy())

@app.route('/predictsong', methods = ['GET'])
# need result() to be distinct
def result1():
    if request.method == 'GET':
        args = request.args
        to_predict = args.get("date")
        result = ValuePredictor(to_predict, 'song.pkl')
        prediction = str(result)
        return prediction

@app.route('/breeds', methods = ['GET'])
# need result() to be distinct
def resulta():
    if request.method == 'GET':
        pf = petpy.Petfinder(key='2p8Gsyz5kSnyKFNp4w7XqmNWD5UDHgPJ5Qkn9gLp9XHbkXOp68', secret='EEjObz7j3VQ0XhrOgITmyiZUK4nTg0LtJMcGzHdb')
        cat_breeds_df = pf.breeds('cat', return_df = True)
        return np.array_str(cat_breeds_df[['name']].to_numpy())
@app.route('/cats', methods = ['GET'])
# need result() to be distinct
def resultb():
    if request.method == 'GET':
        
        gender = request.args.get('gender')
        location = request.args.get('location')
        breed = request.args.get('breed')
        return getpets(gender=gender, location=location, breed=breed)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Constrol-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True)