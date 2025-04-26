import { JobListing } from '../components/JobListing'
import { jobData } from "../data/job";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <header className="text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
            Welcome to <span className="text-blue-600">JobFlow</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leverage AI-powered insights to find the perfect candidates for your open positions
          </p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">{jobData.length}</p>
            <p className="text-gray-600">Active Listings</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">AI</p>
            <p className="text-gray-600">Powered Matching</p>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">24/7</p>
            <p className="text-gray-600">Candidate Analysis</p>
          </div>
        </div>

        {/* Job Listings Section */}
        <section className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Your Open Positions</h2>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Post New Job
            </button>
          </div>
          <div className="space-y-4">
            {jobData.map((job) => (
              <JobListing key={job.id} job={job} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
