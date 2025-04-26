import ReactMarkdown from 'react-markdown';

interface DisplayMarkdownProps {
    content: string;
}

export const DisplayMarkdown = ({ content }: DisplayMarkdownProps) => {
    return (
        <div className="prose max-w-none font-dm-mono">
            <ReactMarkdown
                components={{
                    h1: ({node, ...props}) => <h1 className="text-2xl font-bold text-gray-900 mb-4" {...props} />,
                    h2: ({node, ...props}) => <h2 className="text-xl font-bold text-gray-900 mb-3" {...props} />,
                    h3: ({node, ...props}) => <h3 className="text-lg font-bold text-gray-900 mb-2" {...props} />,
                    p: ({node, ...props}) => <p className="text-gray-600 mb-4" {...props} />,
                    ul: ({node, ...props}) => <ul className="list-disc list-inside mb-4 text-gray-600" {...props} />,
                    li: ({node, ...props}) => <li className="mb-1" {...props} />,
                    strong: ({node, ...props}) => <strong className="font-semibold text-gray-900" {...props} />,
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
};
