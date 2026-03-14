const axios = require('axios');

module.exports = async (req, res) => {
    // 1. Full CORS & Browser Access Headers
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Force JSON Pretty Format Header
    res.setHeader('Content-Type', 'application/json');

    // Handle Preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Extract Username from Query
    const { username } = req.query;

    // Your Professional Credits
    const credits = {
        dev: "RANA FAISAL ALI (FTGM)",
        site: "https://ftgmtools.pages.dev",
        whatsapp: "https://wa.me/923104882921",
        more: "Search ftgm tools on google"
    };

    if (!username) {
        const errorRes = JSON.stringify({
            status: false,
            message: "Missing 'username' parameter. Example: ?username=faisalgaming",
            credits: credits
        }, null, 2);
        return res.status(400).send(errorRes);
    }

    try {
        // 3. Fetch Data from YouTube Stalk API
        const response = await axios.get(`https://api.siputzx.my.id/api/stalk/youtube?username=${encodeURIComponent(username)}`);
        
        // 4. Structure the Response
        const finalOutput = {
            status: response.data.status || true,
            creator_info: response.data.data || response.data,
            credits: credits
        };

        // 5. Apply Pretty Format (2 spaces indentation)
        const prettyData = JSON.stringify(finalOutput, null, 2);

        // Send the formatted response
        res.status(200).send(prettyData);

    } catch (error) {
        const fetchError = JSON.stringify({ 
            status: false,
            error: "Failed to fetch YouTube data", 
            message: error.message,
            credits: credits
        }, null, 2);
        res.status(500).send(fetchError);
    }
};
