import { JobData } from "../types/job";

interface JobListingProps {
    job: JobData;
    onClick: () => void;
}

export const JobListing = ({ job, onClick } : JobListingProps) => {
    return (
        <div 
            className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-blue-100 group relative overflow-hidden cursor-pointer"
            onClick={onClick}
        >
            {/* Decorative line */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            
            <div className="space-y-3">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        <h3 className="text-xl font-semibold text-gray-800 group-hover:text-blue-600 transition-colors duration-300 font-dm-mono">{job.title}</h3>
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <span
                        className={`inline-block text-sm font-medium px-3 py-1 rounded-full transition-colors duration-300 font-dm-mono ${
                            job.status === 'Open' 
                                ? 'bg-green-50 text-green-600 group-hover:bg-green-100' 
                                : 'bg-gray-50 text-gray-600 group-hover:bg-gray-100'
                        }`}
                    >
                        {job.status}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 font-dm-mono">
                    <span className="font-medium">{job.company}</span>
                    <span className="text-gray-300">•</span>
                    <span>{job.location}</span>
                </div>
                <p className="text-sm text-gray-400 font-dm-mono">Posted {new Date(job.datePosted).toLocaleDateString('en-US')}</p>
                <p className="text-gray-600 line-clamp-2 font-dm-mono">{job.description}</p>
            </div>
        </div>
    )
}