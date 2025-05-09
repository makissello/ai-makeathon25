import { JobData } from "../types/job";
import { DisplayMarkdown } from './DisplayMarkdown';
import { jobDescriptions } from "../data/jobDescriptions";
import Link from 'next/link';

interface JobDetailsProps {
    job: JobData;
    onBack: () => void;
}

export const JobDetails = ({ job, onBack }: JobDetailsProps) => {
    const jobDescription = jobDescriptions.find(desc => desc.id === job.id);
    return (
        <div className="animate-fade-in">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onBack}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
                <Link href={`/analyze/${job.id}`}>
                    <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-dm-mono relative overflow-hidden group">
                        <span className="relative z-10">Analyze Applicants</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </Link>
            </div>

            <div className="space-y-6">
                <div className="bg-white/80 backdrop-blur-sm border border-gray-100 rounded-xl p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-900 font-dm-mono mb-2">{job.title}</h3>
                            <div className="flex items-center gap-2 text-gray-600 font-dm-mono">
                                <span className="font-medium">{job.company}</span>
                                <span className="text-gray-300">•</span>
                                <span>{job.location}</span>
                            </div>
                        </div>
                        <span
                            className={`inline-block text-sm font-medium px-3 py-1 rounded-full ${
                                job.status === 'Open' 
                                    ? 'bg-green-50 text-green-600' 
                                    : 'bg-gray-50 text-gray-600'
                            } font-dm-mono`}
                        >
                            {job.status}
                        </span>
                    </div>

                    <DisplayMarkdown content={jobDescription?.description || ''} />
                </div>
            </div>
        </div>
    );
}; 