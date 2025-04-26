import git
import os
import tempfile
import shutil

def is_text_file(file_path):
    try:
        with open(file_path, 'rb') as f:
            chunk = f.read(1024)
            if b'\0' in chunk:
                return False  # Found null byte -> likely binary
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
                    continue  # Skip binary files
                
                file_content = ''
                with open(file_path, 'r', errors='ignore') as f:
                    file_content = f.read()
                
                result_files.append((file_path.replace(temp_dir, ''), file_content))
    finally:
        shutil.rmtree(temp_dir)
    
    return result_files
