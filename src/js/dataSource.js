const contentful = require('./contentful').client();

module.exports = {
  loadEntriesPage() {
    return contentful.entries();
  },

  loadSingleEntry(id){
    return contentful.entries({
      'sys.id': id
    });
  }

};
