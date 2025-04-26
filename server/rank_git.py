from git_crawl import crawl_git_repo, find_top_repos_by_job_desc
from llm import call_model
from key import load_key
import numpy as np
import tiktoken

MODEL = 'gpt-4o-mini'
API_KEY = load_key()
USER = input("Enter the GitHub User: ").strip()
JOBDESCRIPTION_PATH = input("Enter the path to the job description PDF file: ").strip()

MAX_TOKENS = 100000  # adjust based on your model (e.g., 4096 for GPT-3.5, etc.)

def estimate_tokens(text, model_name=MODEL):
    enc = tiktoken.encoding_for_model(model_name)
    return len(enc.encode(text))

def candidate_git_repo_score(repo_url=None, job_description_path=None):
    """
    Ranks files in a GitHub repository based on their relevance to the provided prompt.
    Ensures the input stays within the max token limit.
    """
    if repo_url is None:
        print("No GitHub repository URL provided. Please provide a valid URL.")
        return
    
    if job_description_path is None:
        print("No job description provided. Please provide a path to a job description file.")
        return

    files = crawl_git_repo(repo_url)
    candidate_score = 0
    valid_file_count = 0

    for file_path, content in files:
        prompt = (
            "Provide a score from 1 to 10 for the content of the current file based on its relevance "
            "to the job description provided in the PDF file."
            "Also provide a summary about the file and what are the most important skills used relevant to the job."
            "Keep the summary short (maybe around 15-20 words)."
            "Return format (in json):"
            "{'summary': SUMMARY_OF_CANDIDATE, 'score': SCORE}\n\n"
        )
        prompt += f"File: {file_path}\nContent:\n{content}\n\n"

        # Estimate tokens
        total_tokens = estimate_tokens(prompt)

        if total_tokens > MAX_TOKENS:
            continue

        try:
            response = call_model(
                prompt,
                model=MODEL,
                api_key=API_KEY,
                pdf_path=job_description_path
            )
            file_score = int(response.strip())
            candidate_score += file_score
            valid_file_count += 1
        except Exception as e:
            print(f"Error scoring file {file_path}: {e}")
            continue

    return candidate_score / valid_file_count if valid_file_count else 0


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
        score = candidate_git_repo_score(repo, job_description_path)
        scores[repo] = score
    print(top_repos, scores.values())
    return np.mean(list(scores.values()))

print("Candidate GitHub User Score:", candidate_git_score(USER, JOBDESCRIPTION_PATH))