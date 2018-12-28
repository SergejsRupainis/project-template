/**
 * Checks whether the script is running on client(browser) or on server(node.js)
 */
function isServer() {
  return !(typeof window !== 'undefined' && window.document);
}

export default isServer;
