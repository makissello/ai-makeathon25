import { DottedBackground } from './DottedBackground';

export const AnalyzeSkeleton = () => {
    return (
        <div className="min-h-screen">
            <DottedBackground />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="mb-8">
                    <div className="h-8 w-3/4 bg-gray-200 rounded-lg animate-pulse mb-2"></div>
                    <div className="h-4 w-1/2 bg-gray-200 rounded-lg animate-pulse"></div>
                </div>

                <section className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="flex items-center gap-2">
                            <div className="h-4 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                        </div>
                    </div>
                    
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-8 border border-gray-100 mx-4">
                        <div className="flex flex-col items-center gap-6">
                            <div className="w-32 h-32 rounded-full bg-gray-200 animate-pulse"></div>
                            <div className="text-center space-y-2">
                                <div className="h-6 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                            <div className="w-full space-y-4">
                                <div className="h-6 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
                                <div className="h-32 w-full bg-gray-200 rounded-lg animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}; 