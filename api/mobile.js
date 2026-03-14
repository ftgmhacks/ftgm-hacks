export default async function handler(req, res) {
    // 1. Set CORS headers to allow ALL origins and methods
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    // Force browser to treat response as formatted JSON
    res.setHeader('Content-Type', 'application/json');

    // Handle Vercel's preflight OPTIONS request
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    const { q } = req.query;

    // Credits Object
    const credits = {
        dev: "RANA FAISAL ALI (FTGM)",
        whatsapp: "https://wa.me/923104882921",
        website: "https://ftgmtools.pages.dev",
        more: "Search ftgm tools on google"
    };

    if (!q) {
        const errorResponse = JSON.stringify({
            status: false,
            message: "Missing query parameter 'q'",
            credits: credits
        }, null, 2); // '2' adds the pretty-print spacing
        return res.status(400).send(errorResponse);
    }

    try {
        // 3. Fetch data from the source API
        const response = await fetch(`https://api.siputzx.my.id/api/s/gsmarena?query=${encodeURIComponent(q)}`);
        const data = await response.json();

        // 4. Structure the final data
        const finalOutput = {
            status: true,
            developer_credits: credits,
            results: data
        };

        // 5. Convert to Pretty JSON String
        // null, 2 ka matlab hai 2 spaces ki indentation dena
        const prettyData = JSON.stringify(finalOutput, null, 2);

        // Send as formatted string
        res.status(200).send(prettyData);

    } catch (error) {
        const fetchError = JSON.stringify({ 
            status: false,
            error: "Failed to fetch data", 
            message: error.message,
            credits: credits
        }, null, 2);
        res.status(500).send(fetchError);
    }
}
