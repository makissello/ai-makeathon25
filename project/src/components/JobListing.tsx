import Link from 'next/link';
import { JobData, JobListingProps } from "../types/job";

export const JobListing = ({ job } : JobListingProps) => {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:border-l-4 hover:border-blue-500 group">
            <Link href={`/job/${job.id}`} passHref className="block">
                <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 font-dm-mono">{job.title}</h3>
                    <p className="text-sm text-gray-500 flex items-center gap-2 font-dm-mono">
                        <span className="font-medium">{job.company}</span>
                        <span className="text-gray-300">•</span>
                        <span>{job.location}</span>
                    </p>
                    <p className="text-sm text-gray-400 font-dm-mono">Posted on {new Date(job.datePosted).toLocaleDateString()}</p>
                    <p className="mt-2 text-gray-600 line-clamp-2 font-dm-mono">{job.description}</p>

                    <div className="mt-4">
                        <span
                            className={`inline-block text-sm font-semibold px-3 py-1 rounded-full transition-colors duration-300 font-dm-mono ${
                                job.status === 'Open' 
                                    ? 'bg-green-100 text-green-600 group-hover:bg-green-200' 
                                    : 'bg-gray-100 text-gray-600 group-hover:bg-gray-200'
                            }`}
                        >
                            {job.status}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}