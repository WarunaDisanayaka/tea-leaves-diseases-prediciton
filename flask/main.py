from flask import Flask, jsonify, request, render_template
from flask_cors import CORS  # Import the CORS extension
import cv2
import numpy as np
import tensorflow as tf

app = Flask(__name__)
CORS(app, origins="*")

# Load pre-trained model
cnn = tf.keras.models.load_model('trained_plant_disease_model.keras')

# Assuming class_name is defined previously
class_name = ['Anthracnose', 'algal leaf', 'bird eye spot', 'brown blight', 'gray light', 'healthy', 'red leaf spot', 'white spot']  # Replace with your actual class names

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        # Read and preprocess the image
        img = cv2.imdecode(np.fromstring(file.read(), np.uint8), cv2.IMREAD_COLOR)
        img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        img = cv2.resize(img, (128, 128))
        img = img.reshape((1, 128, 128, 3))

        # Make predictions
        predictions = cnn.predict(img)
        result_index = np.argmax(predictions)
        disease_name = class_name[result_index]

        return jsonify({'prediction': disease_name})

    except Exception as e:
        return jsonify({'error': str(e)})
    
@app.after_request
def set_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'  # Allow Content-Type header
    return response

if __name__ == '__main__':
    app.run(debug=True)
