export default async function handler(req, res) {
  // Enable CORS headers for cross-origin requests
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    // Extract query parameters with defaults if none are provided
    const { phone = '3114882921', count = '5' } = req.query;

    // Target API URL
    const targetUrl = `https://smsbombapi-ten.vercel.app/api/send?phone=${encodeURIComponent(phone)}&count=${encodeURIComponent(count)}`;

    // Fetch response from target API
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
      return res.status(response.status).json({
        status: false,
        message: `Upstream API error: ${response.statusText}`
      });
    }

    const data = await response.json();

    // Remove unwanted developer/group tags from upstream output
    delete data.dev;
    delete data.group;
    delete data.job_id;

    // Construct the customized response with new credits
    const formattedResponse = {
      credits: {
        dev: "Rana Faisal Ali",
        web: "ftgmtools.pages.dev",
        join_channel: "https://whatsapp.com/channel/0029VbDQFi9KmCPUDQEwVW2W"
      },
      ...data
    };

    // Return pretty-printed JSON preview (2-space indented)
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).send(JSON.stringify(formattedResponse, null, 2));

  } catch (error) {
    res.setHeader('Content-Type', 'application/json');
    return res.status(500).send(
      JSON.stringify(
        {
          status: false,
          error: "Internal Server Error",
          details: error.message
        },
        null,
        2
      )
    );
  }
}
