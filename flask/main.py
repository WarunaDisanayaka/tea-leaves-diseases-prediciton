from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf


app = Flask(__name__)

model = tf.keras.models.load_model("tea-leaves.h5")


# Define a route for model prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the image data from the request
        image = request.files['image'].read()
        img_array = tf.image.decode_image(image)
        img_array = tf.image.resize(img_array, (256, 256))  # Adjust the size as needed

        # Preprocess the image
        img_array = tf.expand_dims(img_array, 0)
        img_array = img_array / 255.0  # Normalize pixel values to [0, 1]

        # Make a prediction
        predictions = model.predict(img_array)
        predicted_class = np.argmax(predictions[0])
        confidence = np.max(predictions[0])

        # Map the class index to the class name
        class_names = ["class1", "class2", ..., "classN"]
        predicted_class_name = class_names[predicted_class]

        # Return the prediction as JSON
        result = {'class': predicted_class_name, 'confidence': float(confidence)}
        return jsonify(result)

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
