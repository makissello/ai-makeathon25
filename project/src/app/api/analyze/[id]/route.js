// src/app/analyze/[id]/route.js

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('id'); // Get the job id from the URL query

    try {
        const response = await fetch(`http://localhost:5000/job/${jobId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            return new Response(
                JSON.stringify({ message: 'Error fetching job data' }),
                { status: 500 }
            );
        }

        const data = await response.json(); // Assuming Python API returns JSON
        return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(
            JSON.stringify({ message: 'Failed to fetch job data', error: error.message }),
            { status: 500 }
        );
    }
}
