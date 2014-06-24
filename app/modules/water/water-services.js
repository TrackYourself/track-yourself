/* Define a resource that connects to REST API for water records */

module.exports.resource = function($resource) {

  return $resource('/api/water',
    {}, // param defaults
    { // custom methods
      getAll: {
        method: 'GET',
        url: '/api/water/all',
        isArray: true,
        responseType: 'json'
      },
			getAllGraph: {
        method: 'GET',
        url: '/api/water/graph',
        isArray: true,
        responseType: 'json'
      }
    }
  );
};