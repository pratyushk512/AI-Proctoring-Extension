import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, confusion_matrix
import joblib

data = pd.read_csv('typing_data_high_variance.csv')

X = data['WPM Intervals'].apply(lambda x: list(map(int, x.split()))).tolist()
y = data['Label']

fixed_length = 600

X_fixed = []
for seq in X:
    if len(seq) < fixed_length:
        seq += [0] * (fixed_length - len(seq))
    else:
        seq = seq[:fixed_length]
    X_fixed.append(seq)

X_array = np.array(X_fixed)

X_train, X_test, y_train, y_test = train_test_split(X_array, y, test_size=0.2, random_state=42)

classifier = RandomForestClassifier(n_estimators=100)
classifier.fit(X_train, y_train)

y_pred = classifier.predict(X_test)

print(confusion_matrix(y_test, y_pred))
print(classification_report(y_test, y_pred))

sample_indices = np.random.choice(len(X_train), size=10, replace=False)
sample_X = X_train[sample_indices]
sample_y_true = y_train.iloc[sample_indices]

sample_y_pred = classifier.predict(sample_X)

print("\nSample Predictions vs Actual:")
for i in range(len(sample_y_true)):
    print(f"Actual: {sample_y_true.iloc[i]}, Predicted: {sample_y_pred[i]}")

joblib.dump(classifier, 'random_forest_classifier.pkl')