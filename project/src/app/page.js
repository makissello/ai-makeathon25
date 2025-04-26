"use client"
import { useState } from 'react';
import { JobListing } from '../components/JobListing'
import { JobDetails } from '../components/JobDetails'
import { jobData } from "../data/job";
import { AnimatedBackground } from 'animated-backgrounds';
import { DottedBackground } from '../components/DottedBackground';

export default function Home() {
    const [selectedJobId, setSelectedJobId] = useState(null);
    const selectedJob = jobData.find(job => job.id === selectedJobId);

    return (
        <div>
            <div className="min-h-screen">
                <DottedBackground />
                
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <header className="text-center mb-16 animate-fade-in">
                        <h1 className="text-6xl font-extrabold text-gray-900 mb-6 font-dm-mono">
                            Welcome to <span className="text-blue-600 hover:text-blue-700 transition-colors duration-300">JobFlow</span>
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto font-dm-mono">
                            AI-powered recruitment platform
                        </p>
                    </header>

                    {/* Job Listings Section */}
                    <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:shadow-md transition-all duration-300 border border-gray-100">
                        <div className="flex justify-between items-center mb-8">
                            <div className="flex items-center gap-3">
                                <h2 className="text-2xl font-semibold text-gray-900 font-dm-mono">
                                    {selectedJob ? 'Job Details' : 'Open Positions'}
                                </h2>
                            </div>
                        </div>
                        
                        {selectedJob ? (
                            <JobDetails 
                                job={selectedJob} 
                                onBack={() => setSelectedJobId(null)} 
                            />
                        ) : (
                            <div className="space-y-6">
                                {jobData.map((job) => (
                                    <JobListing 
                                        key={job.id} 
                                        job={job} 
                                        onClick={() => setSelectedJobId(job.id)} 
                                    />
                                ))}
                            </div>
                        )}
                    </section>
                </main>
            </div>
        </div>
    )
}