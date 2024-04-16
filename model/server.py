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


app = Flask(__name__)
CORS(app)


@app.route("/prediction", methods=["POST"])
def prediction():
    data = request.get_json()
    creator_id = data["id"]
    print(type(creator_id))
    print(creator_id)
    result = output(creator_id, "rating")
    return jsonify({"ids": result})


if __name__ == "__main__":
    app.run(port=5000)
