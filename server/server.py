import os

from dotenv import load_dotenv
from openai import OpenAI

from utils.ai_process import rank_users
from utils.applicant import Applicant

from flask import Flask, jsonify, request
from flask_cors import CORS

from rank_users import rankUsersForJob

load_dotenv('../project/.env')

CLIENT = OpenAI(api_key=os.getenv('OPENAI-KEY'))

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

@app.route("/Applicant/<job_id>", methods=["POST"])
def get_processed_applicants(job_id):
    """
    for input JSON need path to applicants folder and path to job description PDF
    returns JSON of applicants dictionaries ranked
    """
    
    data = request.json
    folder_path = data.get('path')
    job_desc_path = data.get('job_description')

    if not folder_path or not os.path.isdir(folder_path):
        return jsonify({'error': 'Invalid folder path'}), 400

    applicants_list = Applicant.get_applicants_from_dir(folder_path)
    applicants_ranked = rank_users(applicants=applicants_list, job_description=job_desc_path, client=CLIENT)

    return jsonify({'applicants': applicants_ranked})

"""
@app.route('/analyze', methods=['GET'])
def analyze():
    jobNum = request.args.get('jobNum')
    return rankUsersForJob(jobNum)
"""

if __name__ == "__main__":
    app.run(host="localhost", port=5001, debug=True)
