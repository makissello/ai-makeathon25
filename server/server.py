from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Sample job data (you could later load this from a database)
job_data = {
    "1": {
        "id": 1,
        "title": "Frontend Developer",
        "company": "TechX Inc.",
        "location": "Berlin, Germany",
        "description": "Looking for a passionate frontend developer with React experience.",
        "datePosted": "2025-04-10",
        "applicationsReceived": 15,
        "status": "Open",
    },
    "2": {
        "id": 2,
        "title": "Backend Developer",
        "company": "DevTech",
        "location": "Munich, Germany",
        "description": "Seeking a backend developer with Node.js experience.",
        "datePosted": "2025-04-12",
        "applicationsReceived": 8,
        "status": "Open",
    },
    "3": {
        "id": 3,
        "title": "Product Designer",
        "company": "CreativeTech",
        "location": "Hamburg, Germany",
        "description": "Join our team to create exceptional designs for new products.",
        "datePosted": "2025-04-15",
        "applicationsReceived": 22,
        "status": "Open",
    },
}


@app.route("/job/<job_id>", methods=["GET"])
def get_job(job_id):
    job = job_data.get(job_id)
    if job:
        return jsonify(job)
    else:
        return jsonify({"message": "Job not found"}), 404


if __name__ == "__main__":
    app.run(host="localhost", port=5001, debug=True)
