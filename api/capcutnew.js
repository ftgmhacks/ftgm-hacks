const axios = require('axios');

module.exports = async (req, res) => {
    // 1. Full CORS Support (No Errors on any browser/domain)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Set Content-Type to JSON for better browser rendering
    res.setHeader('Content-Type', 'application/json');

    // Handle Preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Get CapCut URL from query
    const { url } = req.query;

    // Your Credits (Strictly Maintained)
    const credits = {
        dev: "RANA FAISAL ALI (FTGM)",
        site: "https://ftgmtools.pages.dev",
        whatsapp: "https://wa.me/923104882921",
        more: "Search ftgm tools on google"
    };

    if (!url) {
        const errorRes = JSON.stringify({
            status: false,
            message: "Please provide a CapCut video URL. Example: ?url=https://www.capcut.com/t/Zs8...",
            credits: credits
        }, null, 2);
        return res.status(400).send(errorRes);
    }

    try {
        // 3. Fetch Data from the Source API
        const response = await axios.get(`https://api.siputzx.my.id/api/d/capcut?url=${encodeURIComponent(url)}`);
        
        // 4. Structure the Response for Pretty View
        const finalOutput = {
            status: response.data.status || true,
            download_data: response.data.data || response.data,
            credits: credits
        };

        // 5. Convert to Pretty JSON (2 spaces indentation)
        const prettyJson = JSON.stringify(finalOutput, null, 2);

        // Send as formatted string
        res.status(200).send(prettyJson);

    } catch (error) {
        const fetchError = JSON.stringify({ 
            status: false,
            error: "Failed to fetch CapCut data", 
            message: error.message,
            credits: credits
        }, null, 2);
        res.status(500).send(fetchError);
    }
};
  
