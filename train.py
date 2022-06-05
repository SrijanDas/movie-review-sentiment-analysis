import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.svm import LinearSVC
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
import pickle
import os
import time

print("\nTraining model...", end="")
df = pd.read_csv("./data/cleaned_data.csv")

X = df["review"]
y = df["sentiment"]

# tokenization
tfidf = TfidfVectorizer(max_features=10000)
X = tfidf.fit_transform(X)

# train test split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.33, random_state=0)

# training model
# time.sleep(1)
svc = LinearSVC()
svc.fit(X_train, y_train)
print("Done")
time.sleep(1)

# model evaluation
y_pred = svc.predict(X_test)
accuracy_score = accuracy_score(y_test, y_pred)
print('SVC model accuracy is',str('{:04.2f}'.format(accuracy_score*100))+'%')
print('------------------------------------------------')
print('Confusion Matrix:')
print(pd.DataFrame(confusion_matrix(y_test, y_pred)))
print('------------------------------------------------')
print('Classification Report:')
print(classification_report(y_test, y_pred))

# save model
print("Do you want to save this model? [Y/N]", end=" ")
choice = input().lower()

if choice == 'y':
    files = os.listdir("./models/")
    filename = f"./models/model_{len(files)}.pkl"

    with open(filename, 'wb') as fout:
        pickle.dump((tfidf, svc), fout)
    print(f"Model saved -> './models/{filename}'")