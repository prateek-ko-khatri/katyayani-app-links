const url = require('url');
const querystring = require('querystring');

function extractFallbackUrl(originalUrl) {
  const parsedUrl = url.parse(originalUrl);
  const query = querystring.parse(parsedUrl.query);
  return query.fall_back_url || null;
}

module.exports = extractFallbackUrl;