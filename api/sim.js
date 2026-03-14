const axios = require('axios');

module.exports = async (req, res) => {
  // CORS Headers: Allow All Origins, Browsers, and Domains
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle Options request for Browsers
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { number } = req.query;

  // Credits Info
  const credits = {
    dev: "RANA FAISAL ALI (FTGM)",
    site: "https://ftgmtools.pages.dev",
    more: "Search ftgm tools on google"
  };

  if (!number) {
    return res.status(400).json({ 
      status: "error", 
      message: "Please provide a number.",
      credits 
    });
  }

  try {
    // Fetching data from the source
    const response = await axios.get(`https://sim-db-api.fakcloud.tech/?number=${number}`);
    
    // Sending combined data with your credits
    res.status(200).json({
      status: "success",
      data: response.data,
      credits: credits
    });
  } catch (error) {
    res.status(500).json({ 
      status: "error", 
      message: "Could not fetch data", 
      credits 
    });
  }
};
      
