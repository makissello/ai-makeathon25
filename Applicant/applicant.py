import os
from pathlib import Path


class Applicant:

    def __init__(self, CV_path, github_username):
        self.__CV_path = CV_path
        self.__github_username = github_username
        self.__ranking_score = -1


    def get_CV_path(self):
        return self.__CV_path

    def get_github_username(self):
        return self.__github_username

    def get_ranking_score(self):
        return self.__ranking_score

    def update_ranking_score(self, new_score):
        self.__ranking_score = new_score

    @staticmethod
    def get_applicants_from_dir(path_to_dir):
        """
        This function will take in the path to the directory and process the data at hand to make the evaluation
        process simpler.
        :param path_to_dir: Path to the specified directory that holds all applications
        :return: A list of applicant objects that represents the incoming applications
        """

        applicant_list = []

        applicant_directories = Applicant.__list_all_subdirs(path_to_dir)
        for dir in applicant_directories:
            applicant_list.append(Applicant(Applicant.__find_single_pdf(dir), Applicant.__extract_username_text(dir)))

        return applicant_list


    def to_string(self):
        return "This applicant has username: " + self.__github_username + "\nThe path to the CV is: " + self.__CV_path


######### Helper Methods for the function get_applicants_from_dir

    @staticmethod
    def __list_all_subdirs(root_dir):
        subdirs = []
        for dirpath, dirnames, _ in os.walk(root_dir):
            for dirname in dirnames:
                subdirs.append(os.path.join(dirpath, dirname))
        return subdirs

    @staticmethod
    def __extract_username_text(root_dir):
        for txt_file in Path(root_dir).rglob('username.txt'):
            try:
                with open(txt_file, 'r', encoding='utf-8') as f:
                    return f.read()
            except Exception as e:
                print(f"Error reading {txt_file}: {e}")
                return None
        return None

    @staticmethod
    def __find_single_pdf(root_dir):
        pdf_files = list(Path(root_dir).rglob('*.pdf'))
        if len(pdf_files) == 1:
            return str(pdf_files[0])
        else:
            raise FileNotFoundError(f"Expected 1 PDF, found {len(pdf_files)} in {root_dir}")



root_directory = "/Users/victorracu/PycharmProjects/ai-makeathon25/Applicant/pseudo_applicants"
applicants = Applicant.get_applicants_from_dir(root_directory)

for applicant in applicants:
    print(applicant.to_string())
