from flask import Flask, jsonify, request
# import pandas as pd
# import requests
from imdb import Cinemagoer

app = Flask(__name__)

# create an instance of the Cinemagoer class
ia = Cinemagoer()


@app.route('/', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        data = "Movie Sentiment Analysis API"
        return jsonify({'data': data})


@app.route('/search/<string:movie_name>', methods=['GET'])
def search_movie(movie_name):
    if request.method == 'GET':
        movies = ia.search_movie(movie_name)

        movies_data = []
        for i in range(len(movies)):
            title = movies[i]["long imdb title"]
            movie_id = movies[i].movieID
            cover_url = movies[i]["cover url"]
            movies_data.append({"title": title, "movie_id": movie_id, "cover_url": cover_url})

        data = movies_data
        return jsonify({'data': data})

#
# @app.route('/predict/<string:movie_name>', methods=['GET'])
# def predict(movie_name):
#     if request.method == 'GET':
#         data = movie_name
#         df = pd.read_csv("./data/title_basics.csv")
#         row = df[df["originalTitle"].str.lower() == movie_name.lower()]
#         if row.empty:
#             print("Sorry, unable to fetch movie id!!")
#         else:
#             movie_id = row["tconst"].iloc[0]
#
#             url = "https://movie-details1.p.rapidapi.com/imdb_api/movie"
#
#             querystring = {"id": str(movie_id)}
#
#             headers = {
#                 "X-RapidAPI-Host": "movie-details1.p.rapidapi.com",
#                 "X-RapidAPI-Key": "f7675e727amshe53f4fbbc4d89fcp1f83d9jsnc7bd80468883"
#             }
#
#             response = requests.request("GET", url, headers=headers, params=querystring)
#
#             print(response.text)
#         return jsonify({'data': data})


if __name__ == '__main__':
    app.run(debug=True)