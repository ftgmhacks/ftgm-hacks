const axios = require('axios');

module.exports = async (req, res) => {
  // 1. CORS Headers (Strictly allowed for all)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json'); // Telling browser it's JSON

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { number } = req.query;

  // Your Credits
  const credits = {
    dev: "RANA FAISAL ALI (FTGM)",
    site: "https://ftgmtools.pages.dev",
    more: "Search ftgm tools on google"
  };

  if (!number) {
    const errorRes = JSON.stringify({ status: "error", message: "Number missing", credits }, null, 2);
    return res.status(400).send(errorRes);
  }

  try {
    const response = await axios.get(`https://sim-db-api.fakcloud.tech/?number=${number}`);
    
    // 2. Formatting the Response (The "Assembled" Way)
    const finalData = {
      success: response.data.success || true,
      number: response.data.number || number,
      name: response.data.name || "Not Found",
      cnic: response.data.cnic || "Not Found",
      address: response.data.address || "Not Found",
      credits: credits
    };

    // 3. JSON.stringify(data, null, 2) creates the indented "Pretty" look
    const prettyJson = JSON.stringify(finalData, null, 2);
    
    // Sending as 'send' instead of 'json' to maintain formatting
    res.status(200).send(prettyJson);

  } catch (error) {
    const errorRes = JSON.stringify({ error: "Fetch failed", credits }, null, 2);
    res.status(500).send(errorRes);
  }
};
