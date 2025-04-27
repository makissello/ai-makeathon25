'use client'

import { useState, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { DottedBackground } from '../../../components/DottedBackground';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

interface RepositoryData {
    name: string;
    description: string;
    owner: string;
    languages: { [key: string]: number };
    tags: string[];
    stars: number;
    forks: number;
    openIssues: number;
    lastUpdated: string;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function DashboardPage() {
    const [repository, setRepository] = useState<RepositoryData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showContent, setShowContent] = useState(false);
    const [expandedSections, setExpandedSections] = useState({
        commits: false,
        issues: false,
        contributors: false
    });
    const [description, setDescription] = useState('');
    const pathname = usePathname();
    const searchParams = useSearchParams();

    if (!pathname) {
        throw new Error('No pathname provided');
    }

    const id = pathname.split('/').pop();

    if (!id) throw new Error('No id provided');

    useEffect(() => {
        const description = searchParams.get('description');
        setDescription(description || '');

        const fetchRepositoryData = async () => {
            try {
                const response = await fetch(`https://api.github.com/repos/makissello/scones-ml-workflow`);
                const data = await response.json();
                
                const languagesResponse = await fetch(`https://api.github.com/repos/makissello/scones-ml-workflow/languages`);
                const languagesData = await languagesResponse.json();

                const tagsResponse = await fetch(`https://api.github.com/repos/makissello/scones-ml-workflow/tags`);
                const tagsData = await tagsResponse.json();

                setRepository({
                    name: data.name,
                    description: data.description,
                    owner: data.owner.login,
                    languages: languagesData,
                    tags: tagsData.map((tag: any) => tag.name),
                    stars: data.stargazers_count,
                    forks: data.forks_count,
                    openIssues: data.open_issues_count,
                    lastUpdated: new Date(data.updated_at).toLocaleDateString()
                });
                setLoading(false);
                setTimeout(() => {
                    setShowContent(true);
                }, 2000);
            } catch (error) {
                console.error('Error fetching repository data:', error);
                setLoading(false);
            }
        };

        fetchRepositoryData();
    }, []);

    const toggleSection = (section: 'commits' | 'issues' | 'contributors') => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const languageData = repository?.languages ? Object.entries(repository.languages).map(([name, value]) => ({
        name,
        value
    })) : [];

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

    if (!repository) {
        return <div>Repository not found or failed to fetch data.</div>;
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
                        <h1 className="text-3xl font-bold text-gray-800 font-dm-mono">{repository.name}</h1>
                        <div className="flex gap-4 mt-4">
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                    <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                {repository.stars} stars
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 5a3 3 0 100 6 3 3 0 000-6zm7 0a3 3 0 100 6 3 3 0 000-6zm-7 7a3 3 0 100 6 3 3 0 000-6zm7 0a3 3 0 100 6 3 3 0 000-6z" clipRule="evenodd" />
                                </svg>
                                {repository.forks} forks
                            </div>
                            <div className="flex items-center text-gray-600">
                                <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                                </svg>
                                {repository.openIssues} open issues
                            </div>
                        </div>
                    </div>

                    <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:shadow-md transition-all duration-300 border border-gray-100 mb-8">
                        <div className="space-y-4">
                            <div>
                                <h2 className="text-xl font-semibold text-gray-900 font-dm-mono mb-4">Description</h2>
                                <div className="p-4 bg-white rounded-lg">
                                    <p className="text-gray-700 font-dm-mono">{description}</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:shadow-md transition-all duration-300 border border-gray-100">
                        <h2 className="text-xl font-semibold text-gray-900 font-dm-mono mb-4">Languages used</h2>
                        <div className="h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={languageData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {languageData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
} 