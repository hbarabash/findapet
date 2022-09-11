import flask
from flask import Flask, render_template, request, url_for
import pandas as pd
import numpy as np
import pickle
import sys; print(sys.path)
import petpy
from datetime import datetime
from datetime import date
from sklearn import preprocessing

cattopnames = ['Oliver',
 'Max',
 'Bella',
 'X',
 'Lily',
 'Oreo',
 'Daisy',
 'Charlie',
 'Lucy',
 'Sam',
 'Luna',
 'Kitty',
 'Molly',
 'Sophie',
 'Tiger',
 'George',
 'Jack',
 'Oscar',
 'Lilly',
 'Leo']

cattopbreeds = ['Domestic Shorthair Mix',
 'Domestic Medium Hair Mix',
 'Domestic Longhair Mix',
 'Siamese Mix',
 'Domestic Shorthair']

app = Flask(__name__)

@app.route('/')
def index():
    return flask.render_template('index.html')

def getModelResults(df):
    ages = {'Baby': 0, 'Young': 1, 'Adult': 2, 'Senior': 3}
    modeldf = df.copy(deep=True)
    modeldf["attributes.spayed_neutered"] = modeldf["attributes.spayed_neutered"].fillna("unknown")
    modeldf['year'] =  date.today().year
    modeldf['month'] =  date.today().month
    modeldf['day'] =  date.today().weekday()
    modeldf['age'] = modeldf['age'].map(ages)
    modeldf['age'] = modeldf['age'].fillna(2)
    modeldf['SexuponOutcome_Female-False'] = (modeldf['gender'] == 'Female') & (modeldf['attributes.spayed_neutered'] == False)
    modeldf['SexuponOutcome_Male-False'] = (modeldf['gender'] == 'Male') & (modeldf['attributes.spayed_neutered'] == False)
    modeldf['SexuponOutcome_Female-True'] = (modeldf['gender'] == 'Female') & (modeldf['attributes.spayed_neutered'] == True)
    modeldf['SexuponOutcome_Male-True'] = (modeldf['gender'] == 'Male') & (modeldf['attributes.spayed_neutered'] == True)
    modeldf["colors.primary"] = modeldf["colors.primary"].fillna("unknown")
    modeldf['SexuponOutcome_Unknown'] = modeldf['gender'].apply(lambda x: 0)
    modeldf = modeldf[["breeds.primary", "SexuponOutcome_Female-False", "SexuponOutcome_Male-False", "SexuponOutcome_Female-True", "SexuponOutcome_Male-True", "SexuponOutcome_Unknown", "year", "month", "day", "age", "colors.primary", "name"]]
    le = preprocessing.LabelEncoder()
    modeldf['colors.primary'] = le.fit_transform(modeldf['colors.primary'])
    
    modeldf['name'] = modeldf['name'].apply(lambda x: 0 if (x is np.nan) else (2 if (x in (cattopnames)) else 1))
    modeldf['breeds.primary'] = modeldf['breeds.primary'].apply(lambda x: 1 if (x in cattopbreeds) else 0)

    # rename and reorder columns
    modeldf = modeldf.rename(columns={"name": "Name", "breeds.primary": "Breed", "colors.primary": "Color", "SexuponOutcome_Female-True": "SexuponOutcome_Spayed Female", 
    "SexuponOutcome_Female-False": "SexuponOutcome_Intact Female", "SexuponOutcome_Male-True": "SexuponOutcome_Neutered Male", "SexuponOutcome_Male-False": "SexuponOutcome_Intact Male",
    "age": "AgeuponOutcome", "day": "weekday"})

    modeldf = modeldf[['Name', 'AgeuponOutcome', 'Breed', 'Color', 'SexuponOutcome_Intact Female', 'SexuponOutcome_Intact Male', 'SexuponOutcome_Neutered Male', 
    'SexuponOutcome_Spayed Female', 'SexuponOutcome_Unknown', 'weekday', 'year', 'month']]
    #normalizing data
    MinMaxScaler = preprocessing.MinMaxScaler()
    X_data_minmax = MinMaxScaler.fit_transform(modeldf)
    modeldf = pd.DataFrame(X_data_minmax,columns=modeldf.columns)
    loaded_model = pickle.load(open('cats_rf.pkl', 'rb'))
    query = modeldf
    query_pred = loaded_model.predict(query)
    df['predicted_outcome'] = query_pred.tolist()
    #return df

def getpets(gender=None, location=None, breed=None, age=None):
    pf = petpy.Petfinder(key='2p8Gsyz5kSnyKFNp4w7XqmNWD5UDHgPJ5Qkn9gLp9XHbkXOp68', secret='EEjObz7j3VQ0XhrOgITmyiZUK4nTg0LtJMcGzHdb')
    cats_df = pf.animals(animal_type='cat', status='adoptable', gender=gender, results_per_page=20, location=location, age=age,
    breed=breed, return_df = True)
    cats_df = cats_df.drop('organization_id', axis=1)
    getModelResults(cats_df)
    cats_json = cats_df.to_json(orient='records')
    return cats_json
    return np.array2string(cats_df[['id']].to_numpy())

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
        age = request.args.get('age')
        return getpets(gender=gender, location=location, breed=breed, age=age)
@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Constrol-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True)