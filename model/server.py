from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

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

@app.route("/prediction", methods=["POST"])
def prediction():
    data = request.get_json()
    creator_id = str(data["id"])
    print(creator_id)
    result = recommend(creator_id, "Rating")
    string_ids = [str(obj_id) for obj_id in result]
    #print(string_ids)
    #print(jsonify({"ids": string_ids}))
    return jsonify({"ids": string_ids})

if __name__ == "__main__":
    app.run(port=5000)