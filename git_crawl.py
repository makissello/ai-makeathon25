import git
import os
import tempfile
import shutil

def crawl_git_repo(url):
    # Create a temporary directory
    temp_dir = tempfile.mkdtemp()
    result_files = []

    try:
        # Clone the repo (shallow clone with depth=1 for speed)
        repo_path = os.path.join(temp_dir, "repo")
        git.Repo.clone_from(url, repo_path, depth=1)

        # Walk through files and print basic info
        for root, dirs, files in os.walk(repo_path):
            for file in files:
                file_path = os.path.join(root, file)
                file_content = ''
                #print(f"Found file: {file_path}")
                # Example: Read and print the first 5 lines
                with open(file_path, 'r', errors='ignore') as f:
                    for i, line in enumerate(f):
                        file_content += line
                result_files.append((file_path.replace(temp_dir, ''), file_content))
    finally:
        # Clean up
        shutil.rmtree(temp_dir)
    
    return result_files