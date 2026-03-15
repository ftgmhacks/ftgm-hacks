export default async function handler(req, res) {
    // 1. All Origins allowed (No CORS Errors)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    // Preflight request handle karne ke liye
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { query } = req.query;

    if (!query) {
        return res.status(400).json({ 
            error: "Missing query parameter", 
            usage: "/api/apple?query=song+name" 
        });
    }

    try {
        // Apple Music API endpoint
        const apiUrl = `https://api.siputzx.my.id/api/s/applemusic?query=${encodeURIComponent(query)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 2. Your Branding & Credits
        const finalResponse = {
            developer_info: {
                developed_by: "Rana Faisal Ali",
                main_site: "https://ftgmtools.pages.dev",
                telegram: "https://t.me/FTGMHACKS",
                youtube: "https://youtube.com/@ftgmtech"
            },
            success: true,
            results: data
        };

        // 3. Pretty Preview (Indentation set to 2)
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(JSON.stringify(finalResponse, null, 2));

    } catch (error) {
        return res.status(500).json({ 
            error: "Internal Server Error", 
            msg: error.message 
        });
    }
}
