# FindAPet
This is a web app where you can search for cats available for adoption in your area, with their basic information given, as well as a label of 'high', 'low', or 'medium' risk in terms of finding an adoption home. 

A random forest classifier model has been applied to the cats' information to predict their likelihood of getting adopted. The model was trained on data provided by the Austin Animal Shelter for this Kaggle competition: https://www.kaggle.com/competitions/shelter-animal-outcomes.

Since shelters are often overwhelmed and overcrowded, this can help people looking for pets make a decision that will not only result in a wonderful companion for them, but also aid in finding cats that are more at risk 'forever homes'!
## How to run

Make sure you have the cats_rf.pkl file downloaded in the backend folder so that the API can access the model. It can be obtained by running the 'fostercomp.ipynb' notebook

### In 2 terminals, navigate to the 'frontend' folder

#### In the first terminal, start the API:
`npm run start-api`

#### In the second terminal, start the React app:
`npm start`

### That's all!
