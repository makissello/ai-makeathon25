'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyzePage() {
    const [jobData, setJobData] = useState(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    if (!pathname) {
        throw new Error('No pathname provided');
    }

    const id = pathname.split('/').pop(); // Extract job ID from the URL

    useEffect(() => {
        if (id) {
            // Make an API request to the Next.js API route (new path /analyze/[id])
            fetch(`/analyze/${id}`)
                .then((response) => response.json())
                .then((data) => {
                    setJobData(data);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching job data:', error);
                    setLoading(false);
                });
        }
    }, [id]); // Re-run the effect if the `id` changes

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!jobData) {
        return <div>Job not found or failed to fetch data.</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800">{jobData.title}</h1>
            <p className="text-sm text-gray-500">{jobData.company} - {jobData.location}</p>
            <p className="text-sm text-gray-400">Posted on {new Date(jobData.datePosted).toLocaleDateString('en-US')}</p>

            <div className="mt-6">
                <h2 className="text-lg font-semibold text-gray-800">Job Description</h2>
                <p className="text-gray-600">{jobData.description}</p>
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800">Applications Received</h3>
                <p className="text-gray-600">{jobData.applicationsReceived} applications</p>
            </div>

            <div className="mt-6">
                <span
                    className={`inline-block text-sm font-semibold px-3 py-1 rounded-full ${jobData.status === 'Open' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}
                >
                    {jobData.status}
                </span>
            </div>
        </div>
    );
}
