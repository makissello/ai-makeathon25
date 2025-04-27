import os#
from rank_git import candidate_git_score
import json
##
allCandidates = {}

def rankUsersForJob(jobNum = '1'):
    if jobNum == '1':
        job_description_path = "utils/JobDescriptions/first.txt"
    elif jobNum == '2':
        job_description_path = "utils/JobDescriptions/second.txt"
    elif jobNum == '3':
            job_description_path = "utils/JobDescriptions/third.txt"
    else:
        job_description_path = "utils/JobDescriptions/first.txt"

    usernames = []
    for applicant_folder in os.listdir("utils/pseudo_applicants"):
        applicant_path = os.path.join("utils/pseudo_applicants", applicant_folder)
        username_file = os.path.join(applicant_path, "username.txt")

        if os.path.isdir(applicant_path) and os.path.isfile(username_file):
            with open(username_file, 'r', encoding='utf-8') as file:
                usernames.append(file.read().strip())



    for applicant in usernames:
        listContents = candidate_git_score(username=applicant, job_description_path=job_description_path)
        allCandidates[applicant] = listContents



    with open("job" + jobNum + "Candidates.json", "w", encoding='utf-8') as f:
        json.dump(allCandidates, f, ensure_ascii=False)

rankUsersForJob('1')