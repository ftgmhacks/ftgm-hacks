const axios = require('axios');

module.exports = async (req, res) => {
    // 1. Full CORS & Global Access (No Restrictions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Force Pretty JSON Rendering
    res.setHeader('Content-Type', 'application/json');

    // Handle Preflight OPTIONS request for browsers
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    // 2. Extract Website URL from query (?url=)
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
            message: "Please provide a URL to scrape. Example: ?url=https://example.com",
            credits: credits
        }, null, 2);
        return res.status(400).send(errorRes);
    }

    try {
        // 3. Fetch Data from Web Scraper API
        const response = await axios.get(`https://web-scraper.f-a-k.workers.dev?url=${encodeURIComponent(url)}`);
        
        // 4. Structure the Response (Pretty Format)
        const finalOutput = {
            status: true,
            scraped_data: response.data,
            credits: credits
        };

        // 5. Convert to Pretty JSON (2 spaces indentation)
        const prettyJson = JSON.stringify(finalOutput, null, 2);

        // Send the assembled response
        res.status(200).send(prettyJson);

    } catch (error) {
        const fetchError = JSON.stringify({ 
            status: false,
            error: "Failed to scrape the website", 
            message: error.message,
            credits: credits
        }, null, 2);
        res.status(500).send(fetchError);
    }
};
