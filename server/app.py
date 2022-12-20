from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from imdb import Cinemagoer
from preprocessor import clean_text
from scraper import scrape_reviews
from model_loader import load_model

app = Flask(__name__)
CORS(app)

# create an instance of the Cinemagoer class
ia = Cinemagoer()

# loading pretrained svc model
tfidf, svc = load_model()


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
            title = movies[i].get("long imdb title")
            movie_id = movies[i].movieID
            cover_url = movies[i].get("full-size cover url")
            movies_data.append({"title": title, "movie_id": movie_id, "cover_url": cover_url})

        return jsonify(movies_data)


@app.route('/predict/<string:movie_id>', methods=['GET'])
def predict(movie_id):
    if request.method == 'GET':
        if tfidf is None or svc is None:
            return abort(500)

        movie = ia.get_movie(movie_id)
        title = movie["long imdb title"]
        cover_url = movie["full-size cover url"]

        t_movie_id = "tt"+str(movie_id)
        reviews = scrape_reviews(t_movie_id)

        if len(reviews) <= 0:
            abort(500)

        positive_count = 1
        negative_count = 1

        for review in reviews:
            cleaned_review = clean_text(review)
            pred_vec = tfidf.transform([cleaned_review])
            prediction = svc.predict(pred_vec)
            if prediction == 1:
                positive_count += 1
            else:
                negative_count += 1

        total = positive_count + negative_count
        pos_percentage = (positive_count / total) * 100
        neg_percentage = (negative_count / total) * 100

        # print(str('{:04.2f}'.format(pos_percentage)) + '%', "positive")
        # print(str('{:04.2f}'.format(neg_percentage)) + '%', "negative")

        final_sentiment = "Neutral"

        if pos_percentage > neg_percentage:
            if abs(50 - pos_percentage) <= 10:
                final_sentiment = "Slightly Positive"
            else:
                final_sentiment = "Positive"

        elif neg_percentage > pos_percentage:
            if abs(50 - neg_percentage) <= 10:
                final_sentiment = "Slightly Negative"
            else:
                final_sentiment = "Negative"

        return jsonify({'sentiment': final_sentiment,
                        'pos_percentage': str('{:04.2f}'.format(pos_percentage)),
                        'neg_percentage': str('{:04.2f}'.format(neg_percentage)),
                        "title": title,
                        "movie_id": movie_id,
                        "cover_url": cover_url,
                        'rating': movie['rating']
                        })


if __name__ == '__main__':
    app.run(debug=True)