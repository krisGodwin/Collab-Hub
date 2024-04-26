from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import pairwise_distances
from math import sqrt
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
from pymongo import MongoClient

client = MongoClient("mongodb+srv://kaushikap3001:1pmEWZfyu4YUHpuR@cluster0.xouu6el.mongodb.net/Collab_hub?retryWrites=true&w=majority&appName=Cluster0")
db = client['Collab_hub'] 
rating = db['ratings']
ratings = pd.DataFrame(list(cursor))
cursor = rating.find({})  
client.close()
mask = (ratings['sponsor_type'] == ratings['creator_type']) | (ratings['Fix_rating'] * ratings['click_count'] > 1000)
filtered_ratings = ratings[mask]
recommend_rating = pd.DataFrame({
    'sponsor_id': filtered_ratings['sponsor_id'],
    'creator_id': filtered_ratings['creator_id'],
    'Rating': (filtered_ratings['Fix_rating']) +(0.2* filtered_ratings['click_count'])
})
rating_column = recommend_rating["Rating"]
print(recommend_rating)
def recommend(creator_id,attribute):
    suggestions=[]
    uim=recommend_rating.pivot_table(index='creator_id',columns='sponsor_id',values=attribute)
    uim.fillna(0,inplace=True)
    sim_score=cosine_similarity(uim)
    index=np.where(uim.index==creator_id)[0][0]
    sim_item=sorted(list(enumerate(sim_score[index])),key=lambda x:x[1],reverse=True)[1:6]
    for i in sim_item:
        suggestions.append(uim.index[i[0]])
    return suggestions,sim_score

def output(creator_id, k):
    df = pd.DataFrame()
    x, s = recommend(creator_id, k)
    print("Recommendations:", x)
    # df = df.append({'Id': creator_id, '1': x[0], '2': x[1], '3': x[2], '4': x[3], '5': x[4]}, ignore_index=True)
    return x


app = Flask(__name__)
CORS(app)


@app.route("/prediction", methods=["POST"])
def prediction():
    data = request.get_json()
    creator_id = data["id"]
    print(type(creator_id))
    print(creator_id)
    result = output(creator_id, "Rating")
    return jsonify({"ids": result})


if __name__ == "__main__":
    app.run(port=5000)
