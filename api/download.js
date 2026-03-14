export default async function handler(req, res) {
  // 1. Set CORS Headers for all origins
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // 2. Handle Preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // 3. Get the URL from query string (?url=...)
  const fbUrl = req.query.url;

  if (!fbUrl) {
    return res.status(400).json({ 
      status: "error", 
      message: "URL parameter is required",
      credit: "Rana Faisal Ali (FTGM)"
    });
  }

  try {
    const apiResponse = await fetch("https://fdown.isuru.eu.org/download", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36"
      },
      body: JSON.stringify({ url: fbUrl, quality: "best" })
    });

    const data = await apiResponse.json();
    
    // Add Credit
    data.dev_credit = "Rana Faisal Ali (FTGM)";

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ 
      status: "error", 
      message: error.message,
      credit: "Rana Faisal Ali (FTGM)"
    });
  }
}
