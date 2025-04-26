from git_crawl import crawl_git_repo, find_top_repos_by_job_desc
from llm import call_model
from key import load_key
import numpy as np
import tiktoken
import concurrent.futures


MODEL = 'gpt-4o-mini'
API_KEY = load_key()
USER = input("Enter the GitHub User: ").strip()
JOBDESCRIPTION_PATH = input("Enter the path to the job description PDF file: ").strip()

MAX_TOKENS = 100000  # adjust based on your model (e.g., 4096 for GPT-3.5, etc.)

BASE_PROMPT = (
    """I am giving you one file, that is part of a Project (a Github Repository)
    Your task, is to write a text for this file containing the following information.
    Summary of the File Content. Summary of the Quality of the Code.
    Short comment on anything worthy of mentioning for this file.
    THe reason why you have to say this about this file, is that later, i will give you a prompt, with all the summaries of each
    file that i gave you, and you will have to rate the quality and give a brief Review of the Github Repository.
    You should give enough information about this file, that it is later possible to understand the whole project.
    If the file is simple and irrelevant, a very brief remark, like: (Correct HTML file), is enough.
    Do not structure you answer too formally, just use your own criteria, and make it brief. 
    """
)

def estimate_tokens(text, model_name=MODEL):
    enc = tiktoken.encoding_for_model(model_name)
    return len(enc.encode(text))

def process_file(file_path, prompt, job_description_path):
    """
    Function to call the model and return the result for one file.
    """
    try:
        response = call_model(
            prompt,
            model=MODEL,
            api_key=API_KEY,
            pdf_path=job_description_path
        )
        tmpadd = file_path + response.strip() + "\n\n\n"
        print(tmpadd)
        return tmpadd  # Return the result
    except Exception as e:
        print(f"Error scoring file {file_path}: {e}")
        return None

def candidate_git_repo_score(repo_url=None, job_description_path=None):
    """
    Ranks files in a GitHub repository based on their relevance to the provided prompt.
    Ensures the input stays within the max token limit.
    """
    repo_comments = ""

    if repo_url is None:
        print("No GitHub repository URL provided. Please provide a valid URL.")
        return
    
    if job_description_path is None:
        print("No job description provided. Please provide a path to a job description file.")
        return

    files = crawl_git_repo(repo_url)



    for file_path, content in files:
        prompt = BASE_PROMPT + f"File: {file_path}\nContent:\n{content}\n\n"
        if estimate_tokens(prompt) > MAX_TOKENS:
            continue
        resp = process_file(file_path, prompt, job_description_path)
        if resp is not None:
            repo_comments += resp



    prompt = """All of the following infos, are the names of Files, and then their brief description.
    Your task, is to rate the entire repository, on its own, but especially its relevance to the job description given to you.
    I am trying to decide wether i should hire  the person that created this repository, for the given job description. Are they the right fit?
    Only give as answer an Number between 0 and 10.
    """
    # print(repo_comments)
    response = call_model(
                    prompt + repo_comments,
                    model=MODEL,
                    api_key=API_KEY,
                    pdf_path=job_description_path
                )
    return int(response.strip())


def candidate_git_score(user_url=None, job_description_path=None):
    """
    Ranks files in a GitHub repository based on their relevance to the provided prompt.
    """
    if user_url is None:
        print("No GitHub repository URL provided. Please provide a valid URL.")
        return
    
    if job_description_path is None:
        print("No job description provided. Please provide a path to a job description file.")
        return

    # Get the top repositories based on the job description
    top_repos = find_top_repos_by_job_desc(user_url, job_description_path, top_n=2)

    # Calculate scores for each top repository
    scores = {}
    for repo in top_repos:
        print(repo)
        score = candidate_git_repo_score(repo, job_description_path)
        scores[repo] = score
    print(top_repos, scores.values())
    return np.mean(list(scores.values()))

print("Candidate GitHub User Score:", candidate_git_score(USER, JOBDESCRIPTION_PATH))

