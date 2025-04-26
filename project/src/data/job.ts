import { JobData } from "../types/job";

export const jobData : JobData[] = [
    {
        id: 1,
        title: 'Frontend Developer',
        company: 'TechX Inc.',
        location: 'Berlin, Germany',
        description: 'Looking for a passionate frontend developer with React experience.',
        datePosted: '2025-04-10',
        applicationsReceived: 15, // Example number of applications
        status: 'Open',
    },
    {
        id: 2,
        title: 'Backend Developer',
        company: 'DevTech',
        location: 'Munich, Germany',
        description: 'Seeking a backend developer with Node.js experience.',
        datePosted: '2025-04-12',
        applicationsReceived: 8,
        status: 'Open',
    },
    {
        id: 3,
        title: 'Product Designer',
        company: 'CreativeTech',
        location: 'Hamburg, Germany',
        description: 'Join our team to create exceptional designs for new products.',
        datePosted: '2025-04-15',
        applicationsReceived: 22,
        status: 'Open',
    },
    // Add other jobs here for testing purposes
]