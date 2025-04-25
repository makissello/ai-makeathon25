class Applicant():

    def __init__(self, CV_path, github_username):
        self.__CV_path = CV_path
        self.__github_username = github_username
        self.__ranking_score = -1


    def get_CV_path(self):\
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




