from git_crawl import crawl_git_repo
from llm import call_model
from key import load_key

MODEL = 'gpt-4o-mini'
API_KEY = load_key()
REPO_URL = input("Enter the GitHub repository URL: ").strip()
JOBDESCRIPTION_PATH = input("Enter the path to the job description PDF file: ").strip()

def candidate_git_score(repo_url=None, job_description_path=None):
    """
    Ranks files in a GitHub repository based on their relevance to the provided prompt.
    """
    if repo_url is None:
        print("No GitHub repository URL provided. Please provide a valid URL.")
        return
    
    if job_description_path is None:
        print("No job description provided. Please provide a path to a job description file.")
        return
    # Crawl the GitHub repository
    files = crawl_git_repo(repo_url)

    candidate_score = 0

    # Prepare the prompt for the LLM
    for file_path, content in files:
        prompt = '''
        Provide a score from 1 to 10 for the content of the current file based on its relevandce to the job description provided in the PDF file.
        Output only the score and nothing else.\n\n
        '''
        prompt += f"File: {file_path}\nContent: {content}...\n\n"

        # Call the LLM to rank the files
        response = call_model(prompt, model=MODEL, api_key=API_KEY, pdf_path=job_description_path)
        
        file_score = int(response.strip())
        candidate_score += file_score
    
    return candidate_score / len(files) if files else 0

print("Candidate GitHub Repository Score:", candidate_git_score(REPO_URL, JOBDESCRIPTION_PATH))