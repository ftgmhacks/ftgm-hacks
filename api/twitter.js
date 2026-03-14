const axios = require('axios');

module.exports = async (req, res) => {
    // 1. Full CORS & Global Origin Access
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Set Header for Pretty JSON rendering
    res.setHeader('Content-Type', 'application/json');

    // Handle Preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Extract Twitter Username from query (?user=)
    const { user } = req.query;

    // Your Professional Credits
    const credits = {
        dev: "RANA FAISAL ALI (FTGM)",
        site: "https://ftgmtools.pages.dev",
        whatsapp: "https://wa.me/923104882921",
        more: "Search ftgm tools on google"
    };

    if (!user) {
        const errorRes = JSON.stringify({
            status: false,
            message: "Missing 'user' parameter. Example: ?user=elonmusk",
            credits: credits
        }, null, 2);
        return res.status(400).send(errorRes);
    }

    try {
        // 3. Fetch Data from Twitter Stalk API
        const response = await axios.get(`https://api.siputzx.my.id/api/stalk/twitter?user=${encodeURIComponent(user)}`);
        
        // 4. Structure the Response for Pretty View
        const finalOutput = {
            status: response.data.status || true,
            twitter_profile: response.data.data || response.data,
            credits: credits
        };

        // 5. Convert to Pretty JSON (2 spaces indentation)
        const prettyData = JSON.stringify(finalOutput, null, 2);

        // Send the formatted response
        res.status(200).send(prettyData);

    } catch (error) {
        const fetchError = JSON.stringify({ 
            status: false,
            error: "Failed to fetch Twitter data", 
            message: error.message,
            credits: credits
        }, null, 2);
        res.status(500).send(fetchError);
    }
};
