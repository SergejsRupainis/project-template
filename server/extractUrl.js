/**
 * Extracts basename from full url
 * @param {string} homepage     base of url
 * @param {string} originalUrl  full url
 */
function extractUrl(homepage, originalUrl) {
    const basePathRegExp = new RegExp(`^${homepage.slice(0, -1)}`);
    const url = originalUrl.replace(basePathRegExp, "");

    return url === "" ? "/" : url;
}

export default extractUrl;
