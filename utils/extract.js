const url = require('url');
const querystring = require('querystring');

function extractFallbackUrl(originalUrl) {
  const parsedUrl = url.parse(originalUrl);
  const query = querystring.parse(parsedUrl.query);

  const fallbackUrl = query.fall_back_url || "https://katyayanikrishidirect.com";
  const destination = query.destination || "Website";
  const packageName = query.package_name || "";
  
  console.log(`Extracted fallback URL: ${fallbackUrl}`);
  console.log(`Extracted destination: ${destination}`);
   console.log(`Extracted package name: ${packageName}`);

  return {
    fallbackUrl,
    destination,
    packageName
  };
}

module.exports = extractFallbackUrl;

