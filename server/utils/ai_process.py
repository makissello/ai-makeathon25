import json
import re

PROMPT = ("Compare these applicants based on the passed job description and give me a reasoned ranking. Also include "
          "a floating point (4sf) score between 0 and 10 that reflects the application."
          "You are a helpful assistant for recruiters and make their lives easier by ranking CVs of applicants. "
          "You should look at at the applicants CV like a recruiter would do."
          "There are some very important things to consider when ranking the CV of the applicants:"
          "1. The applicants work experience - especially the skills and impact they had during their work and"
          "at what company they worked at. For example if they worked at Google as a software engineer and are applying"
          "for a software engineering job for the company in the job description, they should be ranked higher."
          "2. The applicants education - especially the university/school they went to and what grade they got."
          "For example, if the applicant has a degree from a top university, they should be ranked higher than "
          "an applicant with a degree from a lower ranked university."
          "3. The applicants projects - especially the complexity and the skills used to create them."
          "4. The applicants achievements"
          "5. The applicants certifications - especially the skills covered by the certification and where they got it from."
          "The short description should give a good overview of the applicants work experience, education, projects and skills"
          "It should also shortly describe how the applicants experience and skills match the job description."
          "It shouldnt be longer than 8 sentences."
          "The output should feature: applicant_name, short_description, score, for all applicants.")


def __rank_user_CV(client, applicant, job_description_path):
    """
    Function evaluates and gives ranking to the CV based on a certain job description
    :param client: The model specified to be used in
    :param applicant: Object that saves information of the job applicant
    :param job_description_path: The description of the job in question in the form of a pdf
    :return: a float value between 0 and 100 that gives a ranking of how well the applicant fits the job description
    """
    CV = client.files.create(
        file=open(applicant.get_CV_path(), "rb"),
        purpose="user_data"
    )

    job_description_file = client.files.create(
        file=open(job_description_path, "rb"),
        purpose="user_data"
    )

    response = client.responses.create(
        model="gpt-4o-mini",
        input=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "input_file",
                        "file_id": CV.id,
                    },
                    {
                        "type": "input_file",
                        "file_id": job_description_file.id,
                    },
                    {
                        "type": "input_text",
                        "text": "Give me a numerical ranking (floating point value between 0 and 100) of this CV "
                                "based on the following job description. The response should only consist of a "
                                "singular number"
                    },
                ]
            }
        ]
    )
    try:
        return float(response.output_text)
    except ValueError:
        return -1





def rank_users(applicants, job_description, client):
    """
    function orders applicants based on CV fitting to given job description
    :param client: the API key client for the function
    :param applicants: list containing all applicants
    :param job_description: path to a pdf of the job description
    :return: a list of dictionaries of all applicants
    """
    # process the files to be able to be used for comparison evaluation

    print(job_description)
    job_description_file = client.files.create(
        file=open(job_description, "rb"),
        purpose="user_data"
    )

    model_input = [
                    {"type": "input_file",
                     "file_id": job_description_file.id,
                    },
                    {
                        "type": "input_text",
                        "text": PROMPT
                    }
                ]

    for applicant in applicants:
        file = client.files.create(
            file=open(applicant.get_CV_path(), "rb"),
            purpose="user_data"
        )

        model_input.append(
            {
                "type":"input_file",
                "file_id":file.id
            }
        )


    # getting response generated based on input

    ranking = client.responses.create(
        model="gpt-4o",
        input=[
            {
                "role": "system",
                "content": "You are a helpful assistant that only responds in JSON format. Make sure that the String "
                           "is valid to be parsed immediately"},
            {
                "role": "user",
                "content": model_input
            }
        ],
        temperature=0.1
    )

    match = re.search(r'(\[.*\]|\{.*\})', ranking.output_text, re.DOTALL)

    if match:
        string = match.group(1)
        dictionary = json.loads(string)
        return dictionary
    else:
        raise ValueError("❌ Could not find valid JSON in the output!")









