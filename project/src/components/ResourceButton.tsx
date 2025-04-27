import Link from 'next/link';

interface ResourceButtonProps {
    type: 'cv' | 'github';
    url: string;
}

export const ResourceButton = ({ type, url }: ResourceButtonProps) => {
    const isCV = type === 'cv';
    const buttonContent = (
        <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
            <div className="w-10 h-10 flex items-center justify-center">
                {isCV ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                )}
            </div>
            <div>
                <h3 className="text-lg font-semibold text-gray-900 font-dm-mono">
                    {isCV ? 'Download CV' : 'View GitHub Profile'}
                </h3>
                <p className="text-sm text-gray-500 font-dm-mono">
                    {isCV ? 'Download the applicant\'s CV' : 'Visit the applicant\'s GitHub profile'}
                </p>
            </div>
        </div>
    );

    if (isCV) {
        return (
            <a
                href={url}
                download
                className="block w-full"
            >
                {buttonContent}
            </a>
        );
    }

    return (
        <Link
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full"
        >
            {buttonContent}
        </Link>
    );
}; 