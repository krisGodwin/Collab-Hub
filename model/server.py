from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
<<<<<<< HEAD
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.metrics.pairwise import pairwise_distances
from math import sqrt
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

ratings=pd.read_csv('Final_ratings.csv')
rating_column = ratings["rating"]


def recommend(creator_id,attribute):
    suggestions=[]
    uim=ratings.pivot_table(index='creator_id',columns='sponsor_id',values=attribute)
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

=======
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient
>>>>>>> chat

app = Flask(__name__)
CORS(app)

<<<<<<< HEAD
=======
client = MongoClient("mongodb+srv://kaushikap3001:1pmEWZfyu4YUHpuR@cluster0.xouu6el.mongodb.net/Collab_hub?retryWrites=true&w=majority&appName=Cluster0")
db = client['Collab_hub'] 
rating = db['ratings']

def recommend(creator_id, attribute):
    suggestions = []
    cursor = rating.find({})
    ratings = pd.DataFrame(list(cursor))

    if ratings.empty:
        return suggestions
    mask = (ratings['sponsor_type'] == ratings['creator_type']) | (ratings['Fix_rating'] * ratings['click_count'] > 1000)
    filtered_ratings = ratings[mask]
    recommend_rating = pd.DataFrame({
        'sponsor_id': filtered_ratings['sponsor_id'],
        'creator_id': filtered_ratings['creator_id'],
        'Rating': (filtered_ratings['Fix_rating']) + (0.2 * filtered_ratings['click_count'])
    })
    #print(recommend_rating)
    uim = recommend_rating.pivot_table(index='creator_id', columns='sponsor_id', values=attribute)
    #print(uim)
    uim.fillna(0, inplace=True)
    sim_score = cosine_similarity(uim)
    index_list = uim.index.astype(str).tolist()
    creator_id_str = str(creator_id)
    #print(sim_score)
    if creator_id in index_list:
        index = index_list.index(creator_id_str)
        #print(index)
        sim_item = sorted(list(enumerate(sim_score[index])), key=lambda x: x[1], reverse=True)[1:6]
        print(sim_item)
        for i in sim_item:
            suggestions.append(uim.index[i[0]])
        #print(suggestions)
    return suggestions
>>>>>>> chat

@app.route("/prediction", methods=["POST"])
def prediction():
    data = request.get_json()
<<<<<<< HEAD
    creator_id = data["id"]
    print(type(creator_id))
    print(creator_id)
    result = output(creator_id, "rating")
    return jsonify({"ids": result})


if __name__ == "__main__":
    app.run(port=5000)
=======
    creator_id = str(data["id"])
    print(creator_id)
    result = recommend(creator_id, "Rating")
    string_ids = [str(obj_id) for obj_id in result]
    #print(string_ids)
    #print(jsonify({"ids": string_ids}))
    return jsonify({"ids": string_ids})

if __name__ == "__main__":
    app.run(port=5000)
>>>>>>> chat
