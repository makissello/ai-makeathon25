'use client'

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DottedBackground } from '../../../components/DottedBackground';
import { Applicant } from '../../../types/applicant';
import { RepositoryBox } from '../../../components/RepositoryBox';
import { ResourceButton } from '../../../components/ResourceButton';

export default function ApplicantPage() {
    const [applicant, setApplicant] = useState<Applicant | null>(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        github: false,
        resources: false
    });
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (!pathname) {
        throw new Error('No pathname provided');
    }

    const id = pathname.split('/').pop();

    if (!id) throw new Error('No id provided');

    useEffect(() => {
        const name = searchParams.get('name');
        const score = searchParams.get('score');
        const description = searchParams.get('description');

        if (name && score && description) {
            setApplicant({
                applicant_name: name,
                score: parseFloat(score),
                short_description: description
            });
            setLoading(false);
            setTimeout(() => {
                setShowContent(true);
            }, 2000);
        } else {
            setLoading(false);
        }
    }, [searchParams]);

    const toggleSection = (section: 'github' | 'resources') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    if (loading || !showContent) {
        return (
            <div className="min-h-screen">
                <DottedBackground />
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-96 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!applicant) {
        return <div>Applicant not found or failed to fetch data.</div>;
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
                        <h1 className="text-3xl font-bold text-gray-800 font-dm-mono">{applicant.applicant_name}</h1>
                        <p className="text-sm text-gray-500 font-dm-mono">Score: {applicant.score}</p>
                    </div>

                    <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:shadow-md transition-all duration-300 border border-gray-100">
                        <div className="space-y-4">
                            {/* General Summary Section - Always Visible */}
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 font-dm-mono mb-4">Résume</h2>
                                <div className="p-4 bg-white rounded-lg">
                                    <p className="text-gray-700 font-dm-mono">{applicant.short_description}</p>
                                </div>
                            </div>

                            {/* GitHub Summary Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('github')}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <h2 className="text-xl font-semibold text-gray-900 font-dm-mono">GitHub Projects</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-600 transform transition-transform duration-200 ${expandedSections.github ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {expandedSections.github && (
                                    <div className="p-4 bg-white rounded-lg mt-2">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <RepositoryBox
                                                name="react-portfolio"
                                                description="A modern portfolio website built with React and TypeScript, featuring responsive design and smooth animations. Conduct user research and usability testing to gather feedback and refine designs.
Collaborate with developers to ensure accurate implementation of designs.
Ensure design consistency across all product touchpoints, maintaining high-quality design standards.
Stay up to date with design trends and emerging tools and technologies to continuously improve our products.
Required Skills:

Proven experience as a Product Designer, UI/UX Designer, or similar role with a portfolio that demonstrates your design skills.
Proficiency in design tools such as Figma, Sketch, or Adobe XD.
Strong understanding of interaction design, visual design, and user research.
Experience in designing for both web and mobile platforms.
Ability to create prototypes and conduct user testing.
Excellent communication skills and a collaborative mindset.
A passion for solving complex design challenges and improving user experiences.
Nice to Have:

Experience with motion design or animations.
Familiarity with design systems and component-based design.
Knowledge of front-end development or experience working closely with developers."
                                                url="https://github.com/username/react-portfolio"
                                            />
                                            <RepositoryBox
                                                name="ai-chatbot"
                                                description="An intelligent chatbot implementation using natural language processing and machine learning algorithms."
                                                url="https://github.com/username/ai-chatbot"
                                            />
                                            <RepositoryBox
                                                name="e-commerce-api"
                                                description="A RESTful API for an e-commerce platform with user authentication and product management."
                                                url="https://github.com/username/e-commerce-api"
                                            />
                                            <RepositoryBox
                                                name="data-visualization"
                                                description="Interactive data visualization dashboard using D3.js and React for real-time data analysis."
                                                url="https://github.com/username/data-visualization"
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Download Resources Section */}
                            <div>
                                <button
                                    onClick={() => toggleSection('resources')}
                                    className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                                >
                                    <h2 className="text-xl font-semibold text-gray-900 font-dm-mono">Download Resources</h2>
                                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 text-gray-600 transform transition-transform duration-200 ${expandedSections.resources ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {expandedSections.resources && (
                                    <div className="p-4 bg-white rounded-lg mt-2">
                                        <div className="space-y-4">
                                            <ResourceButton
                                                type="cv"
                                                url="/path/to/cv.pdf" // TODO: Replace with actual CV path
                                            />
                                            <ResourceButton
                                                type="github"
                                                url="https://github.com/username" // TODO: Replace with actual GitHub URL
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
} 