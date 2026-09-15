from flask import Flask, send_from_directory, request, jsonify
from deepface import DeepFace
import tempfile
import os


app = Flask(__name__, static_folder="..", static_url_path="")


# ==========================================
# SERVE EMOSENSE WEBSITE
# ==========================================

@app.route("/")
def home():
    return send_from_directory("../", "index.html")


@app.route("/<path:filename>")
def serve_files(filename):
    return send_from_directory("../", filename)


# ==========================================
# AI EMOTION ANALYSIS
# ==========================================

@app.route("/analyze", methods=["POST"])
def analyze():

    image = request.files.get("image")

    if image is None:
        return jsonify({
            "success": False,
            "message": "No image received"
        }), 400

    temp_path = None

    try:

        # Create a temporary image file
        with tempfile.NamedTemporaryFile(
            delete=False,
            suffix=".jpg"
        ) as temp_file:

            image.save(temp_file.name)
            temp_path = temp_file.name

        # ==================================
        # DEEPFACE EMOTION DETECTION
        # ==================================

        result = DeepFace.analyze(
            img_path=temp_path,
            actions=["emotion"],
            detector_backend="retinaface",
            enforce_detection=True,
            align=True
        )

        # DeepFace can return a list or dictionary
        if isinstance(result, list):
            result = result[0]

        emotions = result.get("emotion", {})

        dominant_emotion = result.get(
            "dominant_emotion",
            "neutral"
        )

        # ==================================
        # CONFIDENCE
        # ==================================

        confidence = emotions.get(
            dominant_emotion,
            0
        )

        # ==================================
        # CONVERT DEEPFACE EMOTIONS
        # TO YOUR EXISTING UI FORMAT
        # ==================================

        emotion_map = {
            "happy": "HAPPY",
            "sad": "SAD",
            "neutral": "NEUTRAL",
            "surprise": "SURPRISED",
            "angry": "ANGRY",
            "fear": "FEAR",
            "disgust": "DISGUST"
        }

        primary = emotion_map.get(
            dominant_emotion.lower(),
            dominant_emotion.upper()
        )

        # ==================================
        # SEND RESULT BACK TO JAVASCRIPT
        # ==================================

        return jsonify({
            "success": True,
            "emotion": str(primary),
            "confidence": float(
                round(float(confidence), 2)
            ),

            "happy": float(
                round(float(emotions.get("happy", 0)), 2)
            ),

            "sad": float(
                round(float(emotions.get("sad", 0)), 2)
            ),

            "neutral": float(
                round(float(emotions.get("neutral", 0)), 2)
            ),

            "surprised": float(
                round(float(emotions.get("surprise", 0)), 2)
            ),

            "angry": float(
                round(float(emotions.get("angry", 0)), 2)
            ),

            "fear": float(
                round(float(emotions.get("fear", 0)), 2)
            ),

            "disgust": float(
                round(float(emotions.get("disgust", 0)), 2)
            )
        })

    except Exception as error:

        print("DeepFace Error:", error)

        return jsonify({
            "success": False,
            "message": "Emotion analysis failed",
            "error": str(error)
        }), 500

    finally:

        # Delete temporary image
        if temp_path and os.path.exists(temp_path):
            os.remove(temp_path)


# ==========================================
# START FLASK SERVER
# ==========================================

if __name__ == "__main__":
    app.run(
        debug=True
    )