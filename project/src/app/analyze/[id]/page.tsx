'use client'

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { JobData } from "../../../types/job";
import { ApplicantCarousel } from '../../../components/ApplicantCarousel';
import { DottedBackground } from '../../../components/DottedBackground';

export default function AnalyzePage() {
    const [jobData, setJobData] = useState<JobData | null>(null);
    const [loading, setLoading] = useState(true);
    const pathname = usePathname();

    if (!pathname) {
        throw new Error('No pathname provided');
    }

    const id = pathname.split('/').pop(); // Extract job ID from the URL

    if (!id) throw new Error('No id provided');

    useEffect(() => {
        console.log("Job ID: ", id);

        // Fetch job data
        fetch(`http://localhost:5001/job/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch data");
                }
                return response.json();
            })
            .then((data) => {
                setJobData(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching job data:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!jobData) {
        return <div>Job not found or failed to fetch data.</div>;
    }

    return (
        <div>
            <div className="min-h-screen">
                <DottedBackground />
                
                <Link 
                    href="/" 
                    className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200 z-20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </Link>
                
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 font-dm-mono">{jobData.title}</h1>
                        <p className="text-sm text-gray-500 font-dm-mono">{jobData.company} - {jobData.location}</p>
                    </div>

                    <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:shadow-md transition-all duration-300 border border-gray-100">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 font-dm-mono">Applicants</h2>
                            <div className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                                <span className="text-sm text-gray-500 font-dm-mono">3 applicants</span>
                            </div>
                        </div>
                        <ApplicantCarousel />
                    </section>
                </div>
            </div>
        </div>
    );
}
