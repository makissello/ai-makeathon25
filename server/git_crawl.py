import git
import os
import tempfile
import shutil
import requests
from rank_bm25 import BM25Okapi
import PyPDF2

def is_text_file(file_path):
    try:
        with open(file_path, 'rb') as f:
            chunk = f.read(1024)
            if b'\0' in chunk:
                return False
    except Exception:
        return False
    return True

def crawl_git_repo(url):
    temp_dir = tempfile.mkdtemp()
    result_files = []

    try:
        repo_path = os.path.join(temp_dir, "repo")
        git.Repo.clone_from(url, repo_path, depth=1)

        for root, dirs, files in os.walk(repo_path):
            for file in files:
                file_path = os.path.join(root, file)
                
                if not is_text_file(file_path):
                    continue
                
                with open(file_path, 'r', errors='ignore') as f:
                    file_content = f.read()
                
                result_files.append((file_path.replace(temp_dir, ''), file_content))
    finally:
        shutil.rmtree(temp_dir)
    
    return result_files

def extract_text_from_pdf(pdf_path):
    reader = PyPDF2.PdfReader(pdf_path)
    text = ""
    for page in reader.pages:
        text += page.extract_text()
    return text

def get_user_repos(username):
    url = f"https://api.github.com/users/{username}/repos"
    response = requests.get(url)
    response.raise_for_status()
    repos = response.json()
    return [repo['clone_url'] for repo in repos]

def find_top_repos_by_job_desc(username, job_desc_pdf_path, top_n=3):
    job_desc_text = extract_text_from_pdf(job_desc_pdf_path)
    job_desc_tokens = job_desc_text.lower().split()

    repo_urls = get_user_repos(username)
    
    corpus = []
    url_to_repo_text = {}
    
    for url in repo_urls:
        try:
            files = crawl_git_repo(url)
            full_text = " ".join(content for _, content in files)
            tokens = full_text.lower().split()
            corpus.append(tokens)
            url_to_repo_text[url] = tokens
        except Exception as e:
            print(f"Failed to process {url}: {e}")

    bm25 = BM25Okapi(corpus)
    scores = bm25.get_scores(job_desc_tokens)

    scored_repos = list(zip(repo_urls, scores))
    scored_repos.sort(key=lambda x: x[1], reverse=True)

    top_repos = [url for url, score in scored_repos[:top_n]]
    
    return top_repos
