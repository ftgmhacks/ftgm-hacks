const axios = require('axios');

module.exports = async (req, res) => {
    // 1. CORS & Browser Global Access
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Force Pretty JSON Header
    res.setHeader('Content-Type', 'application/json');

    // Handle Preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Extract Instagram URL from query
    const { url } = req.query;

    // Your Professional Credits
    const credits = {
        dev: "RANA FAISAL ALI (FTGM)",
        site: "https://ftgmtools.pages.dev",
        whatsapp: "https://wa.me/923104882921",
        more: "Search ftgm tools on google"
    };

    if (!url) {
        const errorRes = JSON.stringify({
            status: false,
            message: "Please provide an Instagram Story/Post URL. Example: ?url=https://www.instagram.com/stories/...",
            credits: credits
        }, null, 2);
        return res.status(400).send(errorRes);
    }

    try {
        // 3. Fetch Data from SSSInstagram API
        const response = await axios.get(`https://api.siputzx.my.id/api/d/sssinstagram?url=${encodeURIComponent(url)}`);
        
        // 4. Structure the Response (Pretty Format)
        const finalOutput = {
            status: response.data.status || true,
            download_links: response.data.data || response.data,
            credits: credits
        };

        // 5. Convert to Pretty JSON (2 spaces indentation)
        const prettyJson = JSON.stringify(finalOutput, null, 2);

        // Send the assembled response
        res.status(200).send(prettyJson);

    } catch (error) {
        const fetchError = JSON.stringify({ 
            status: false,
            error: "Failed to fetch Instagram data", 
            message: error.message,
            credits: credits
        }, null, 2);
        res.status(500).send(fetchError);
    }
};
  
