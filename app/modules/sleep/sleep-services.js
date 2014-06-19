/* Define a resource that connects to REST API for sleep records */

module.exports.resource = function($resource) {

  return $resource('/api/sleep',
    {}, // param defaults
    { // custom methods
      getAll: {
        method: 'GET',
        url: '/api/sleep/all',
        isArray: true,
        responseType: 'json'
      }
    }
  );
};

