import pickle
import time
from preprocessor import clean_text
import os
import pandas as pd
import requests
from bs4 import BeautifulSoup
import matplotlib.pyplot as plt
import warnings
warnings.filterwarnings("ignore") 

def load_model():
    print("\nLoading the model please wait...", end="")
    time.sleep(1)
    # loading pretrained model
    try:
        files = os.listdir("./models/")
        filename = f"model_{len(files)-1}.pkl"
        with open(f'./models/{filename}', 'rb') as f:
            tfidf, svc = pickle.load(f)
        print("Done")
        return tfidf, svc

    except Exception as e:
        print("Error loading the model")
        return None, None


def get_movie_id():
    movie_name = input("\nEnter movie name: ")
    # loading movie id
    df = pd.read_csv("./data/title_basics.csv")
    row = df[df["originalTitle"].str.lower() == movie_name.lower()]
    if row.empty:
        print("Sorry, unable to fetch movie id!!")
        print("Please try again.")
        get_movie_id()
    else:
        movie_id = row["tconst"].iloc[0]
        print(f"\n-------{movie_name}-------")
        return movie_id


def scrape_reviews(movie_id):
    url = f"https://www.imdb.com/title/{movie_id}/reviews?ref_=tt_urv"
    r = requests.get(url)
    soup = BeautifulSoup(r.content, 'html.parser')
    raw_reviews = soup.find_all('div', {'class': 'text'})

    reviews = []
    for r in raw_reviews:
        reviews.append(r.text)
    print("Scraped reviews successfully")

    if len(reviews) <= 0:
        print("Something went wrong!")
        get_movie_id()
    return reviews


def show_plotting(pos_percentage, neg_percentage):
    # bar plot
    x = pos_percentage
    y = neg_percentage

    data = {"pos": x, "neg": y}
    b = plt.figure(figsize=(6, 4))

    sentiment = list(data.keys())
    percentage = list(data.values())

    # creating the bar plot
    plt.bar(sentiment, percentage, width=0.3, color=['g', 'r'])
    plt.xlabel("Sentiment")
    plt.ylabel("Percentage")

    # pie chart
    p = plt.figure(figsize=(6, 4))
    y1 = [neg_percentage, pos_percentage]
    mylabels = ["Negative", "Positive"]
    plt.pie(y1, labels=mylabels)

    plt.show()


if __name__ == '__main__':
    tfidf, svc = load_model()
    if tfidf is None or svc is None:
        exit()

    while True:
        try:
            print("\nPress 1 to give movie name")
            print("Press 0 to exit")
            choice = int(input("Choice: "))

            if choice == 0:
                break
            movie_id = get_movie_id()
            reviews = scrape_reviews(movie_id)

            # predictions = []
            positive_count = 1
            negative_count = 1

            print("\nAnalyzing review sentiments")
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

            print(str('{:04.2f}'.format(pos_percentage))+'%', "positive")
            print(str('{:04.2f}'.format(neg_percentage))+'%', "negative")

            final_sentiment = "Neutral"

            if pos_percentage > neg_percentage:
                final_sentiment = "Positive"

            elif neg_percentage > pos_percentage:
                final_sentiment = "Negative"

            print("Final Sentiment: ", final_sentiment)

            show_plot = input("\nShow plotting? [Y/N] ")
            if show_plot.lower() == 'y':
                show_plotting(pos_percentage, neg_percentage)
            print("-"*27)

        except Exception as e:
            print("Something went wrong!")