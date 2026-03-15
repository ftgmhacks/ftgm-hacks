export default async function handler(req, res) {
    // 1. Allow from all origins (CORS)
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
        return res.status(400).json({ error: "Please provide a query parameter." });
    }

    try {
        const apiUrl = `https://api.siputzx.my.id/api/s/pinterest?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 2. Credits and Data Structure
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

        // 3. Pretty Preview Logic
        // Setting Content-Type to application/json and using 2-space indentation
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(JSON.stringify(finalResponse, null, 2));

    } catch (error) {
        return res.status(500).json({ 
            error: "Failed to fetch data", 
            details: error.message 
        });
    }
}
  
