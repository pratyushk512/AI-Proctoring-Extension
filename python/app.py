from flask import Flask, request, jsonify
import tensorflow as tf
import numpy as np

model = tf.saved_model.load('risk_model/')

app = Flask(__name__)

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    try:
        inputs = np.array(data['inputs'], dtype=np.float32)

        if inputs.shape[1] != 6:
            return jsonify({'error': 'Each input must have exactly 6 features'}), 400
        inputs_tensor = tf.convert_to_tensor(inputs)

        prediction_fn = model.signatures['serving_default']
        predictions = prediction_fn(keras_tensor=inputs_tensor)['output_0'].numpy()

        return jsonify({'predictions': predictions.flatten().tolist()})
    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)
