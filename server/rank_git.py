from git_crawl import crawl_git_repo, find_top_repos_by_job_desc
from llm import call_model
from key import load_key
import numpy as np
import tiktoken
import concurrent.futures
import json##


MODEL = 'gpt-4o-mini'
API_KEY = load_key()


USER = "flaviogoetzlopez"

JOBDESCRIPTION_PATH = input("Enter the path to the job description PDF file: ").strip()
dictOfCandidates = {}
dictOfCandidates[USER] = []
dictOfCandidates_score = {}

with open('JobDescription.txt', 'r', encoding='utf-8') as file:
    JOBDESCRIPTION_TEXT = file.read()


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
    try:#
        response = call_model(
            prompt,
            model=MODEL,
            api_key=API_KEY,
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


    with concurrent.futures.ThreadPoolExecutor() as executor:
        futures = []
        for file_path, content in files:
            prompt = BASE_PROMPT + f"File: {file_path}\nContent:\n{content}\n\n"
            if estimate_tokens(prompt) > MAX_TOKENS:
                continue
            futures.append(executor.submit(process_file, file_path, prompt, job_description_path))

        for future in concurrent.futures.as_completed(futures):
            resp = future.result()
            if resp is not None:
                repo_comments += resp


    prompt = """All of the following infos, are the names of Files, and then their brief description, in a Github repository. 
    Your task, is to rate the entire repository, on its own, but especially its relevance to the job description given to you.
    I am trying to decide wether i should hire  the person that created this repository, for the given job description. Are they the right fit?
    ATTENTION! Your output will constitute of two parts. 
    PART 1: A WHOLE Number between 0 and 10, evaluating the quality of the Repository, ONLY THE NUMBER, not a single character of text is allowed in this line.  
    PART 2: After that, you will make a Newline. Then I want you to explain your answer, and give reasoning. 
    """
    # print(repo_comments)
    response = call_model(
                    "The following Text is the Job description, that should be considered: " + JOBDESCRIPTION_TEXT + "The following Text is the Prompt" + prompt + repo_comments,
                    model=MODEL,
                    api_key=API_KEY,

                    # pdf_path=job_description_path
                )
    print(response.strip())

    lines = response.strip().split('\n', 1)
    evaluation_number = int(lines[0].strip())
    evaluation_text = lines[1].strip() if len(lines) > 1 else ""
    print("Evaluation number is: ", evaluation_number)


    dictOfCandidates[USER].append(
        {
            "link_to_repository": repo_url,
            "score_of_repository": evaluation_number,
            "evaluation_of_repository": evaluation_text,
        },
    )
    return evaluation_number


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
    scores = []
    for repo in top_repos:
        print(repo)
        score = candidate_git_repo_score(repo, job_description_path)
        scores.append(score)

    print(top_repos, scores)

    dictOfCandidates_score[USER] = float(np.mean(scores))
    return None

candidate_git_score(USER, JOBDESCRIPTION_PATH)
print("dictOfCandidates", dictOfCandidates)
print("dictOfCandidates_score", dictOfCandidates_score)

with open("dictOfCandidates.json", "w", encoding='utf-8') as f:
    json.dump(dictOfCandidates, f, ensure_ascii=False)

with open("dictOfCandidates_score.json", "w", encoding='utf-8') as f:
    json.dump(dictOfCandidates_score, f, ensure_ascii=False)

