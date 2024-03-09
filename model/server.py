from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity


ratings = pd.read_csv("Final_ratings.csv")

rating_column = ratings["rating"]

def get_prediction(creator_id, k):
    df = pd.DataFrame()
    suggestions=[]
    uim=ratings.pivot_table(index='creator_id',columns='sponsor_id',values='rating')
    uim.fillna(0,inplace=True)
    sim_score=cosine_similarity(uim)
    #index=np.where(uim.index==creator_id)[0][0]
    idx = 0
    for i in rating_column:
    
        if(i == creator_id):
            idx = i
        
    sim_item=sorted(list(enumerate(sim_score[idx])),key=lambda x:x[1],reverse=True)[1:11]
    for i in sim_item:
        suggestions.append(uim.index[i[0]])

    x = suggestions
    print("Recommendations:", x)
    return x


app = Flask(__name__)
CORS(app)

@app.route("/prediction", methods=["POST"])
def prediction():
    data = request.get_json()
    creator_id = data["id"]
    print(creator_id)
    result = get_prediction(creator_id, 'rating')
    return jsonify({"ids": result})


if __name__ == "__main__":
    app.run(port=8000)
