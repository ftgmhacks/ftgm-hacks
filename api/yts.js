export default async function handler(req, res) {
    // 1. Full CORS Support (No Restrictions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Preflight (OPTIONS) request handling
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ 
            error: "Search query is missing!", 
            usage: "/api/ytsearch?query=song+name" 
        });
    }

    try {
        // YouTube Search API Endpoint
        const apiUrl = `https://api.siputzx.my.id/api/s/youtube?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 2. Credits & Branding (FTGM Style)
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

        // 3. Pretty Preview (Browser readable)
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(JSON.stringify(finalResponse, null, 2));

    } catch (error) {
        return res.status(500).json({ 
            error: "Failed to fetch YouTube data", 
            message: error.message 
        });
    }
    }
