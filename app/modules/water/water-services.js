/* Define a resource that connects to REST API for water records */

module.exports.resource = function($resource) {

  return $resource('/water/:user',
    { // default params
      user: 'testuser'
    },
    { // custom methods
      getAll: {
        method: 'GET',
        url: '/water/:user/all',
        isArray: true,
        responseType: 'json'
      }
    }
  );
};