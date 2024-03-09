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

ratings = pd.read_csv("C:/Users/prana/Desktop/MLintegr/MLintegrate/backend/Final_ratings.csv")
#ratings = open("C:/Users/prana/Desktop/MLintegr/MLintegrate/backend/Final_ratings.csv", "r")
#print(ratings.read())

def recommend(creator_id, attribute):
    suggestions = []
    uim = ratings.pivot_table(index='creator_id', columns='sponsor_id', values=attribute)
    uim.fillna(0, inplace=True)
  
    # Check if creator_id exists in the index
    if creator_id in uim.index:
        sim_score = cosine_similarity(uim)
        index = np.where(uim.index == creator_id)[0][0]
        sim_item = sorted(list(enumerate(sim_score[index])), key=lambda x: x[1], reverse=True)[1:6]
        for i in sim_item:
            suggestions.append(uim.index[i[0]])
    else:
        print(f"Creator ID {creator_id} not found in the dataset.")
      
    return suggestions, sim_score




def get_prediction(creator_id, k):
    df = pd.DataFrame()
    x, s = recommend(creator_id, k)
    print("Recommendations:", x)
    df = df.append({'Id': creator_id, '1': x[0], '2': x[1], '3': x[2], '4': x[3], '5': x[4]}, ignore_index=True)
    return x





   
res = get_prediction(206644.0, "rating")
print(res)



