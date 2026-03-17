export default async function handler(req, res) {
    // 1. CORS Headers (Allow all origins)
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

    const { url } = req.query;

    if (!url) {
        return res.status(400).json({ 
            error: "URL parameter is missing!", 
            usage: "/api/savefromftgm?url=VIDEO_URL_HERE" 
        });
    }

    try {
        // SaveFrom API Endpoint
        const apiUrl = `https://api.siputzx.my.id/api/d/savefrom?url=${encodeURIComponent(url)}`;
        const response = await fetch(apiUrl);
        const data = await response.json();

        // 2. Your Credits & Branding
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

        // 3. Pretty Preview Output
        res.setHeader('Content-Type', 'application/json');
        return res.status(200).send(JSON.stringify(finalResponse, null, 2));

    } catch (error) {
        return res.status(500).json({ 
            error: "Failed to process request", 
            message: error.message 
        });
    }
}
