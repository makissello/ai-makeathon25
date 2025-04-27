import Link from 'next/link';

interface RepositoryBoxProps {
    name: string;
    description: string;
    url: string;
}

export const RepositoryBox = ({ name, description, url }: RepositoryBoxProps) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200 relative">
            <Link 
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
            </Link>
            <h3 className="text-lg font-semibold text-gray-900 font-dm-mono mb-2 pr-8">{name}</h3>
            <p className="text-gray-700 font-dm-mono">{description}</p>
        </div>
    );
}; 