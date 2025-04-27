'use client'

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DottedBackground } from '../../../components/DottedBackground';
import { Applicant } from '../../../types/applicant';
import { RepositoryBox } from '../../../components/RepositoryBox';
import { ResourceButton } from '../../../components/ResourceButton';
import { applicantMap } from '../../../data/applicantMap';

interface Repository {
    Name: string;
    link_to_repository: string;
    score_of_repository: number;
    evaluation_of_repository: string;
    repo_name: string;
    score: number;
    evaluation: string;
}

interface RepositoryData {
    name: string;
    score: number;
    evaluation: string;
    url: string;
}

interface ApplicantData {
    [key: string]: Repository[];
}

// Mapping of applicant names to their repository indices
const applicantRepositoryIndices: { [key: string]: [number, number] } = {
    'Michael Chen': [0, 1],
    'Jordan Lee': [2, 3],
    'Samantha Ortiz': [4, 5],
    'Alexandra Bennett': [6, 7],
    'Leonard W. Bumblebee': [8, 9]
};

export default function ApplicantPage() {
    const [applicant, setApplicant] = useState<Applicant | null>(null);
    const [repositories, setRepositories] = useState<RepositoryData[]>([]);
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

        const fetchRepositoryData = async () => {
            try {
                const response = await fetch(`http://localhost:5001/repo/${id}`);
                const data: ApplicantData = await response.json();
                const applicantName = searchParams.get('name');
                if (applicantName) {
                    const repos = data[applicantName];
                    if (repos) {
                        setRepositories(repos
                            .filter((_, index) => {
                                const applicantName = searchParams.get('name');
                                if (!applicantName) return false;
                                const indices = applicantRepositoryIndices[applicantName];
                                if (!indices) return false;
                                return indices.includes(index);
                            })
                            .map(repo => ({
                                name: repo.link_to_repository.split('/').pop()?.replace('.git', '') || repo.Name,
                                score: repo.score_of_repository,
                                evaluation: repo.evaluation_of_repository,
                                url: repo.link_to_repository
                            })));
                    }
                }
            } catch (error) {
                console.error('Error fetching repository data:', error);
            }
        };

        if (name && score && description) {
            setApplicant({
                applicant_name: name,
                score: parseFloat(score),
                short_description: description
            });
            fetchRepositoryData();
            setLoading(false);
            setShowContent(true);    
        } else {
            setLoading(false);
        }
    }, [searchParams, id]);

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
                
                <button 
                    onClick={() => window.history.back()}
                    className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-lg hover:bg-white transition-colors duration-200 z-20"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                </button>
                
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
                                            {repositories
                                                .slice(0, 2) // Only show first 2 projects
                                                .map((repo, index) => (
                                                    <RepositoryBox
                                                        key={index}
                                                        name={repo.name}
                                                        description={repo.evaluation}
                                                        url={repo.url}
                                                    />
                                                ))}
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
                                            {applicant && (
                                                <ResourceButton
                                                    type="cv"
                                                    url={`http://localhost:5001/cv/${applicantMap[applicant.applicant_name]}`}
                                                />
                                            )}
                                            {repositories.length > 0 && (
                                                <ResourceButton
                                                    type="github"
                                                    url={`https://github.com/${repositories[0].url.split('/')[3]}`}
                                                />
                                            )}
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