import requests
from bs4 import BeautifulSoup


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
    return reviews
