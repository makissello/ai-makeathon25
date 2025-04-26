import { JobListing } from './components/JobListing'

export default function Home() {
  const jobListings = [
    {
      id: 1,
      title: 'Frontend Developer',
      company: 'TechX Inc.',
      location: 'Berlin, Germany',
      datePosted: '2025-04-10',
      description: 'Looking for a passionate frontend developer with React experience.',
      status: 'Open',
    },
    {
      id: 2,
      title: 'Backend Engineer',
      company: 'DevSolutions',
      location: 'Remote',
      datePosted: '2025-04-12',
      description: 'We need a backend engineer skilled in Node.js and AWS.',
      status: 'Open',
    },
    {
      id: 3,
      title: 'Product Designer',
      company: 'CreativeTech',
      location: 'Hamburg, Germany',
      datePosted: '2025-04-15',
      description: 'Join our team to create exceptional designs for new products.',
      status: 'Open',
    },
  ]

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
              {jobListings.map((job) => (
                  <JobListing key={job.id} job={job} />
              ))}
            </div>
          </section>
        </main>
      </>
  )
}
