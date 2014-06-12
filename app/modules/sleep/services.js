/* Define a resource that connects to REST API for sleep records */

module.exports.resource = function($resource) {

  return $resource('/sleep/:user',
    { // default params
      user: 'testuser'
    },
    { // custom methods
      getAll: {
        method: 'GET',
        url: '/sleep/:user/all',
        isArray: true,
        responseType: 'json'
      }
    }
  );
};

