export const applicantMap = {
    "Michael Chen": 1,
    "Jordan Lee": 2,
    "Samantha Ortiz": 3,
    "Alexandra Bennett": 4,
    "Leonard W. Bumblebee": 5,
}

export const reverseApplicantMap = Object.fromEntries(
    Object.entries(applicantMap).map(([key, value]) => [value, key])
);