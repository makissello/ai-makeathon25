import { useState } from 'react';
import { Applicant } from '../types/applicant';

interface ApplicantCarouselProps {
    applicants?: Applicant[]; // Make applicants optional
}

// Test data
const TEST_APPLICANTS: Applicant[] = [
    {
        applicant_name: 'John Doe',
        score: 8.5,
        short_description: 'Experienced software engineer with 5+ years of experience in web development. Specialized in React and TypeScript.'
    },
    {
        applicant_name: 'Jane Smith',
        score: 7.8,
        short_description: 'Full-stack developer with expertise in modern web technologies. Strong background in UI/UX design and backend development.'
    },
    {
        applicant_name: 'Alex Johnson',
        score: 6.2,
        short_description: 'Recent graduate with a passion for machine learning and data science. Completed several projects in Python and TensorFlow.'
    }
];

const NavigationArrow = ({ direction, onClick }: { direction: 'left' | 'right', onClick: () => void }) => (
    <button
        onClick={onClick}
        className="absolute bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white transition-colors duration-200 z-20"
        style={{
            [direction === 'left' ? 'left' : 'right']: '-40px',
            top: '250px',
            transform: 'translateY(-50%)'
        }}
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={direction === 'left' ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} />
        </svg>
    </button>
);

export const ApplicantCarousel = ({ applicants = TEST_APPLICANTS }: ApplicantCarouselProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % applicants.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + applicants.length) % applicants.length);
    };

    const getSlideStyle = (index: number) => {
        const offset = index - currentIndex;
        const isActive = offset === 0;
        const isNext = offset === 1 || (currentIndex === applicants.length - 1 && index === 0);
        const isPrev = offset === -1 || (currentIndex === 0 && index === applicants.length - 1);

        if (isActive) {
            return 'translate-x-0 z-10 opacity-100';
        } else if (isNext) {
            return 'translate-x-[20%] z-0 opacity-0';
        } else if (isPrev) {
            return '-translate-x-[20%] z-0 opacity-0';
        } else {
            return 'translate-x-[100%] opacity-0';
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            <div className="relative h-[500px] overflow-visible">
                <div className="relative w-full h-full">
                    {applicants.map((applicant, index) => (
                        <div
                            key={applicant.applicant_name}
                            className={`absolute w-full transition-all duration-500 ${getSlideStyle(index)}`}
                        >
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 hover:shadow-md transition-all duration-300 border border-gray-100 mx-4">
                                <div className="flex flex-col items-center gap-6">
                                    <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
                                        <span className="text-4xl text-gray-400">{applicant.applicant_name.charAt(0)}</span>
                                    </div>
                                    <div className="text-center">
                                        <h3 className="text-2xl font-semibold text-gray-900 font-dm-mono">{applicant.applicant_name}</h3>
                                        <p className="text-gray-600 font-dm-mono">Score: {applicant.score}</p>
                                    </div>
                                    <div className="w-full">
                                        <h4 className="text-lg font-semibold text-gray-900 mb-4 font-dm-mono">Description</h4>
                                        <div className="bg-gray-50 rounded-lg p-4 font-dm-mono">
                                            <p className="text-gray-700 whitespace-pre-wrap">{applicant.short_description}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <NavigationArrow direction="left" onClick={prevSlide} />
                <NavigationArrow direction="right" onClick={nextSlide} />
            </div>
        </div>
    );
}; 