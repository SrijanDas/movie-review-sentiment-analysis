import pickle
import os


def load_model():
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
        print(e)
        return None, None