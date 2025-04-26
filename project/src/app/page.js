"use client"
import { JobListing } from '../components/JobListing'
import { jobData } from "../data/job";
import { AnimatedBackground } from 'animated-backgrounds';
import { DottedBackground } from '../components/DottedBackground';

export default function Home() {
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
                    <section className="bg-white rounded-2xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-2xl font-semibold text-gray-900 font-dm-mono">Open Positions</h2>
                        </div>
                        <div className="space-y-6">
                            {jobData.map((job) => (
                                <JobListing key={job.id} job={job} />
                            ))}
                        </div>
                    </section>
                </main>
            </div>
        </div>
    )
}