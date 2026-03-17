export default async function handler(req, res) {
    // 1. Set CORS headers to allow all origins and methods
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Handle OPTIONS request for CORS preflight
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ 
            error: "Query parameter is required",
            example: "?query=search_term"
        });
    }

    try {
        const apiUrl = `https://api.siputzx.my.id/api/s/youtube?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 2. Prepare the response with Credits and Data
        const finalResponse = {
            credits: {
                developed_by: "Rana Faisal Ali",
                main_site: "https://ftgmtools.pages.dev",
                telegram: "https://t.me/FTGMHACKS",
                youtube: "https://youtube.com/@ftgmtech"
            },
            status: true,
            results: data
        };

        // 3. Output in "Pretty Preview" format (Indent with 4 spaces)
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(JSON.stringify(finalResponse, null, 4));

    } catch (error) {
        return res.status(500).json({ 
            error: "Internal Server Error", 
            message: error.message 
        });
    }
}
