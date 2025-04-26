import json

from server import app  # Import your Flask ap


def test_get_processed_applicants():
    tester = app.test_client()

    # Dummy paths for testing
    payload = {
        'path': 'utils/pseudo_applicants',  # Make sure this exists or mock
        'job_description': 'utils/JobDescription.pdf'
    }

    response = tester.post(
        '/Applicant/123',  # You can put any job_id
        data=json.dumps(payload),
        content_type='application/json'
    )
    assert response.status_code == 200
    data = response.get_json()
    print(data)
    # You can add more asserts here based on what you expect
    assert isinstance(data['applicants'], list)

if __name__ == '__main__':
    test_get_processed_applicants()