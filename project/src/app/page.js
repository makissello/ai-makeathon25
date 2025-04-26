import { JobListing } from '../components/JobListing'
import { jobData } from "../data/job";

export default function Home() {

  return (
      <>
        <main className="bg-gray-100 min-h-screen p-8">
          <header className="text-center mb-8">
            <h1 className="text-4xl font-bold text-blue-600">Welcome to JobFlow</h1>
            <p className="mt-4 text-lg text-gray-700">Manage your job listings and find top talent!</p>
          </header>

          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Open Job Listings</h2>
            <div className="space-y-4">
              {jobData.map((job) => (
                  <JobListing key={job.id} job={job} />
              ))}
            </div>
          </section>
        </main>
      </>
  )
}
