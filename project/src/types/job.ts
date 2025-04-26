export type JobData = {
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    datePosted: string;
    applicationsReceived: number;
    status: string;
}

export type JobListingProps = {
    job: JobData;
}