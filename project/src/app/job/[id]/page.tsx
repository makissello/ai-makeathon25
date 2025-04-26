'use client'

import { usePathname, useRouter } from 'next/navigation';

// Sample job data (you would fetch this from an API or database in a real application)
const jobData = {
    1: {
        title: 'Frontend Developer',
        company: 'TechX Inc.',
        location: 'Berlin, Germany',
        description: 'Looking for a passionate frontend developer with React experience.',
        datePosted: '2025-04-10',
        applicationsReceived: 15, // Example number of applications
        status: 'Open',
    },
    2: {
        title: 'Backend Developer',
        company: 'DevTech',
        location: 'Munich, Germany',
        description: 'Seeking a backend developer with Node.js experience.',
        datePosted: '2025-04-12',
        applicationsReceived: 8,
        status: 'Open',
    },
    // Add other jobs here for testing purposes
};

export default function JobDetails() {
    const pathname = usePathname(); // Access the current path
    const router = useRouter();

    if (!pathname) {
        throw new Error('No pathname provided');
    }
    // Extract the job ID from the pathname
    const id = pathname.split('/').pop(); // Extracts the last part of the URL (i.e., job ID)

    if (!id) {
        return <div>Loading...</div>; // You can add a loading spinner or message here
    }

    // Find the job by ID
    const job = jobData[id as string]; // Match the ID to the job data

    if (!job) {
        return <div>Job not found</div>; // Show message if job doesn't exist
    }

    const handleReroute = () => {
        router.push(`/analyze/${id}`); // Redirect to the "analyze" page
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
            <p className="text-sm text-gray-500">{job.company} - {job.location}</p>
            <p className="text-sm text-gray-400">Posted on {new Date(job.datePosted).toLocaleDateString('en-US')}</p>

            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
                <p className="text-gray-600">{job.description}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Applications Received</h3>
                <p className="text-gray-600">{job.applicationsReceived} applications</p>
            </div>

            <div className="mt-6">
                <span
                    className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${job.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                    {job.status}
                </span>
            </div>
            {/* Button to reroute to the analyze page */}
            <div className="mt-6">
                <button
                    onClick={handleReroute}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Go to Analyze Page
                </button>
            </div>
        </div>
    );
}
