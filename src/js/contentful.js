const contentful = require('contentful');

let contentfulClient;

module.exports = {
  init(config) {
    if(!contentfulClient) {
      contentfulClient = contentful.createClient({
        accessToken: config.accessToken,
        space: config.space
      });
    }
  },

  client() {
    return contentfulClient;
  }
};
