from flask import Flask, jsonify, send_from_directory
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

MODEL_DIRECTORY = os.path.join(os.getcwd(), "models")

@app.route('/model', methods=['GET'])
def get_gltf_model():
    filename = 'Sample.glb'
    try:
        return send_from_directory(MODEL_DIRECTORY, filename)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
