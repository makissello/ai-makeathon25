import Link from 'next/link';
import { JobData, JobListingProps } from "../types/job";

export const JobListing = ({ job } : JobListingProps) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            <Link href={`/job/${job.id}`} passHref>
                    <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
                    <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
                    <p className="text-sm text-gray-400">Posted on {new Date(job.datePosted).toLocaleDateString()}</p>
                    <p className="mt-2 text-gray-600">{job.description}</p>

                    <div className="mt-4">
            <span
                className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
            >
              {job.status}
            </span>
                </div>
            </Link>
        </div>
)
}
