# # app.py

# from flask import Flask, jsonify, request
# import pandas as pd
# from sklearn.feature_extraction.text import TfidfVectorizer
# from sklearn.metrics.pairwise import cosine_similarity
# from flask_cors import CORS
# app = Flask(__name__)
# CORS(app)  # Enable CORS for all routes
# # Load the data
# df = pd.read_csv('MERGED_DATA.csv')

# # Fill all null values with empty strings
# df = df.fillna('')

# # Concatenate skills and tech stacks into a single column
# df['SKILLS_AND_TECHSTACK'] = df['SKILLS'] + ' ' + df['TECHSTACK_USED']

# # Fit TF-IDF vectorizer
# tfidf_vectorizer = TfidfVectorizer()
# tfidf_matrix = tfidf_vectorizer.fit_transform(df['SKILLS_AND_TECHSTACK'])

# # Calculate cosine similarity
# cosine_sim = cosine_similarity(tfidf_matrix, tfidf_matrix)

# # Function to recommend training based on employee ID
# def recommend_training(employee_id, cosine_sim=cosine_sim, df=df):
#     idx = df[df['EMPLOYEE_ID'] == employee_id].index[0]
#     sim_scores = list(enumerate(cosine_sim[idx]))
#     sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
#     sim_scores = sim_scores[1:6]  # Top 5 similar users
#     similar_users = [i[0] for i in sim_scores]
#     recommendations = df.iloc[similar_users]['CERTIFICATE_NAME'].unique()
#     return recommendations

# @app.route('/recommendations', methods=['GET'])
# def get_recommendations():
#     employee_id = request.args.get('employee_id')
#     recommendations = recommend_training(employee_id)
#     return jsonify(recommendations=list(recommendations))

# if __name__ == '__main__':
#     app.run(debug=True)

# app.py
from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
from sklearn.linear_model import LogisticRegression
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# Read the data
df_merged = pd.read_csv('MERGED_DATA.csv')

# Feature Engineering
df_merged['HAS_SKILLS_CERT_TECH'] = ((df_merged['SKILLS'].notnull()) | 
                                     (df_merged['CERTIFICATE_NAME'].notnull()) | 
                                     (df_merged['TECHSTACK_USED'].notnull())).astype(int)

# Additional feature: Total experience
df_merged['TOTAL_EXPERIENCE'] = pd.to_datetime(df_merged['END_DATE']) - pd.to_datetime(df_merged['START_DATE'])
df_merged['TOTAL_EXPERIENCE'] = df_merged['TOTAL_EXPERIENCE'].dt.days

# Define features and target variable
X = df_merged[['HAS_SKILLS_CERT_TECH', 'RATING', 'TOTAL_EXPERIENCE']]
y = df_merged['EVENT_NAME']

# Drop rows with missing target values
X = X[~y.isnull()]
y = y.dropna()

# Impute missing values with mean
imputer = SimpleImputer(strategy='mean')
X_imputed = imputer.fit_transform(X)

# Scale the features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X_imputed)

# Initialize and train the Logistic Regression model
log_reg_model = LogisticRegression(random_state=42, max_iter=1000)
log_reg_model.fit(X_scaled, y)

# Define route for recommendations
@app.route('/recommendations')
def get_recommendations():
    # Get employee_id from query parameters
    employee_id = request.args.get('employee_id')
    
    # Filter data for the given employee_id
    employee_data = df_merged[df_merged['EMPLOYEE_ID'] == employee_id]
    
    if employee_data.empty:
        return jsonify({'error': 'Employee not found'}), 404
    
    # Extract features for prediction
    features = employee_data[['HAS_SKILLS_CERT_TECH', 'RATING', 'TOTAL_EXPERIENCE']]
    
    # Impute missing values with mean
    features_imputed = imputer.transform(features)
    
    # Scale features
    features_scaled = scaler.transform(features_imputed)
    
    # Predict probabilities for each class
    event_probabilities = log_reg_model.predict_proba(features_scaled)
    
    # Get the class labels
    class_labels = log_reg_model.classes_
    
    # Get the top recommended events
    top_event_indices = event_probabilities.argsort()[0][-5:][::-1]  # Get top 5 recommended events
    recommended_events = [class_labels[i] for i in top_event_indices]
    
    return jsonify({'employee_id': employee_id, 'recommended_events': recommended_events})

if __name__ == '__main__':
    app.run(debug=True)
