/* Define a resource that connects to REST API for exercise records */

module.exports.resource = function($resource) {
    return $resource('/api/exercise',
    {}, //paramdefaults
    { //custom methods
        getAll: {
            method: 'GET',
            url: '/api/exercise/all',
            isArray: true,
            responseType: 'json'
        },
        getGraph: {
            method: 'GET',
            url: '/api/exercise/graph',
            isArray: true,
            responseType: 'json'
        }
    });
};
