const axios = require('axios');

module.exports = async (req, res) => {
  // CORS Headers for All Browsers & Origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Preflight check
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { number } = req.query;
  const credits = {
    dev: "RANA FAISAL ALI (FTGM)",
    site: "https://ftgmtools.pages.dev",
    more: "Search ftgm tools on google"
  };

  if (!number) {
    return res.status(400).json({ error: "Number parameter is missing", credits });
  }

  try {
    const response = await axios.get(`https://sim-db-api.fakcloud.tech/?number=${number}`);
    res.status(200).json({
      ...response.data,
      credits
    });
  } catch (error) {
    res.status(500).json({ 
      error: "Target API Down or Request Failed",
      details: error.message,
      credits 
    });
  }
};
