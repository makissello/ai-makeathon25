import { JobListing } from '../components/JobListing'
import { jobData } from "../data/job";

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <header className="text-center mb-12 animate-fade-in">
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-4 font-dm-mono">
                        Welcome to <span className="text-blue-600 hover:text-blue-700 transition-colors duration-300">JobFlow</span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto font-dm-mono">
                        Leverage AI-powered insights to find the perfect candidates for your open positions
                    </p>
                </header>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300">
                        <p className="text-3xl font-bold text-blue-600 font-dm-mono">{jobData.length}</p>
                        <p className="text-gray-600 font-dm-mono">Active Listings</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300">
                        <p className="text-3xl font-bold text-blue-600 font-dm-mono">AI</p>
                        <p className="text-gray-600 font-dm-mono">Powered Matching</p>
                    </div>
                    <div className="bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow duration-300">
                        <p className="text-3xl font-bold text-blue-600 font-dm-mono">24/7</p>
                        <p className="text-gray-600 font-dm-mono">Candidate Analysis</p>
                    </div>
                </div>

                {/* Job Listings Section */}
                <section className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow duration-300">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-2xl font-semibold text-gray-900 font-dm-mono">Your Open Positions</h2>
                        <button className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-dm-mono">
                            Post New Job
                        </button>
                    </div>
                    <div className="space-y-6">
                        {jobData.map((job) => (
                            <JobListing key={job.id} job={job} />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}